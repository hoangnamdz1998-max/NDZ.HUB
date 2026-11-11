import { ESPLoader, Transport } from "./vendor/esptool-js.js";

// State
let transport = null;
let esploader = null;
let isConnected = false;
let isFlashing = false;
let currentChipMac = "";
let manifestData = null;
let isMonitoring = false;
let monitorReader = null;

// DOM Elements
const browserAlert = document.getElementById("browser-alert");
const btnConnect = document.getElementById("btn-connect");
const btnConnectText = document.getElementById("btn-connect-text");
const selectBaud = document.getElementById("select-baud");

const statusDot = document.getElementById("status-dot");
const chipStatusText = document.getElementById("chip-status-text");
const chipType = document.getElementById("chip-type");
const chipMac = document.getElementById("chip-mac");
const chipFlashSize = document.getElementById("chip-flash-size");
const chipLicenseTag = document.getElementById("chip-license-tag");

// Product elements
const selectProduct = document.getElementById("select-product");
const productDesc = document.getElementById("product-desc");
const productChipBadge = document.getElementById("product-chip-badge");
const productPriceBadge = document.getElementById("product-price-badge");
const selectVersion = document.getElementById("select-version");
const modeCardUpdate = document.getElementById("mode-card-update");
const modeCardClean = document.getElementById("mode-card-clean");

// License elements
const inputLicense = document.getElementById("input-license");
const btnVerifyLicense = document.getElementById("btn-verify-license");
const licenseTag = document.getElementById("license-tag");
const btnOpenPayment = document.getElementById("btn-open-payment");

// Custom files elements
const customFilesContainer = document.getElementById("custom-files-container");
const btnAddFileRow = document.getElementById("btn-add-file-row");
const checkCustomErase = document.getElementById("check-custom-erase");

// Flashing & Terminal
const btnFlash = document.getElementById("btn-flash");
const btnErase = document.getElementById("btn-erase");
const progressStatusText = document.getElementById("progress-status-text");
const progressPercent = document.getElementById("progress-percent");
const progressFill = document.getElementById("progress-fill");
const terminalBody = document.getElementById("terminal-body");
const btnCopyLog = document.getElementById("btn-copy-log");
const btnClearLog = document.getElementById("btn-clear-log");

// Serial Monitor
const btnMonitorToggle = document.getElementById("btn-monitor-toggle");
const btnMonitorClear = document.getElementById("btn-monitor-clear");
const inputMonitorSend = document.getElementById("input-monitor-send");
const btnMonitorSend = document.getElementById("btn-monitor-send");

// Modals
const modalPayment = document.getElementById("modal-payment");
const btnClosePayment = document.getElementById("btn-close-payment");
const vietqrImg = document.getElementById("vietqr-img");
const bankAmount = document.getElementById("bank-amount");
const bankContent = document.getElementById("bank-content");
const btnCopyStk = document.getElementById("btn-copy-stk");
const btnCopyContent = document.getElementById("btn-copy-content");
const btnConfirmPaid = document.getElementById("btn-confirm-paid");

const modalDriver = document.getElementById("modal-driver");
const btnDriverGuide = document.getElementById("btn-driver-guide");
const btnCloseDriver = document.getElementById("btn-close-driver");

// Terminal Logger implementation for ESPLoader
const customTerminal = {
  clean() {
    terminalBody.textContent = "";
  },
  writeLine(text) {
    this.write(text + "\n");
  },
  write(text) {
    const span = document.createElement("span");
    const cleanText = text.replace(/\r/g, "");
    
    if (cleanText.toLowerCase().includes("error") || cleanText.toLowerCase().includes("failed")) {
      span.className = "log-error";
    } else if (cleanText.toLowerCase().includes("hash of data verified") || cleanText.toLowerCase().includes("leaving...")) {
      span.className = "log-success";
    } else if (cleanText.toLowerCase().includes("warning")) {
      span.className = "log-warn";
    } else {
      span.className = "log-info";
    }

    span.textContent = cleanText;
    terminalBody.appendChild(span);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }
};

function logSystem(msg, type = "info") {
  const span = document.createElement("span");
  span.className = `log-${type}`;
  span.textContent = `\n[Hệ thống] ${msg}\n`;
  terminalBody.appendChild(span);
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

// 1. Kiểm tra Web Serial
function checkBrowserSupport() {
  if (!("serial" in navigator)) {
    browserAlert.hidden = false;
    btnConnect.disabled = true;
    logSystem("Trình duyệt không hỗ trợ Web Serial API. Vui lòng mở trang web trên Chrome, Edge hoặc Opera máy tính.", "error");
    return false;
  }
  return true;
}

// 2. Tải Manifest Sản phẩm
async function loadManifest() {
  try {
    const res = await fetch("firmware/manifest.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    manifestData = await res.json();
    populateProducts();
  } catch (err) {
    logSystem(`Không thể tải manifest sản phẩm: ${err.message}`, "warn");
  }
}

function populateProducts() {
  if (!manifestData || !manifestData.products) return;
  selectProduct.innerHTML = "";
  manifestData.products.forEach((prod, idx) => {
    const opt = document.createElement("option");
    opt.value = prod.id;
    opt.textContent = `${prod.name} (${prod.chipFamily})`;
    if (idx === 0) opt.selected = true;
    selectProduct.appendChild(opt);
  });
  onProductChange();
}

function onProductChange() {
  const prodId = selectProduct.value;
  const prod = manifestData.products.find(p => p.id === prodId);
  if (!prod) return;

  productDesc.textContent = prod.description;
  productChipBadge.textContent = prod.chipFamily;
  productPriceBadge.textContent = `Giá: ${prod.price}`;

  // Populate versions
  selectVersion.innerHTML = "";
  prod.versions.forEach((v, idx) => {
    const opt = document.createElement("option");
    opt.value = v.version;
    opt.textContent = `${v.version} (${v.releaseDate}) - ${v.changelog}`;
    if (idx === 0) opt.selected = true;
    selectVersion.appendChild(opt);
  });

  updatePaymentQR();
}

// 3. Quản lý Tabs
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

    btn.classList.add("active");
    const target = document.getElementById(btn.dataset.tab);
    if (target) target.classList.add("active");
  });
});

// Mode card radio toggle
modeCardUpdate.addEventListener("click", () => {
  modeCardUpdate.classList.add("selected");
  modeCardClean.classList.remove("selected");
  modeCardUpdate.querySelector("input").checked = true;
});

modeCardClean.addEventListener("click", () => {
  modeCardClean.classList.add("selected");
  modeCardUpdate.classList.remove("selected");
  modeCardClean.querySelector("input").checked = true;
});

// 4. Kết nối / Ngắt kết nối ESP32
btnConnect.addEventListener("click", async () => {
  if (isConnected) {
    await disconnectESP();
    return;
  }
  await connectESP();
});

async function connectESP() {
  try {
    const baud = parseInt(selectBaud.value, 10);
    const port = await navigator.serial.requestPort();

    transport = new Transport(port, true);
    esploader = new ESPLoader({
      transport: transport,
      baudrate: baud,
      romBaudrate: baud,
      terminal: customTerminal
    });

    logSystem(`Đang kết nối vi điều khiển với baudrate ${baud}...`);
    statusDot.className = "status-dot flashing";
    chipStatusText.textContent = "Đang đồng bộ bootloader...";

    const chipName = await esploader.main();
    
    // Lấy địa chỉ MAC của chip (Định danh duy nhất)
    let mac = "Unknown";
    try {
      mac = await esploader.chip.readMac(esploader);
    } catch (e) {
      logSystem(`Không đọc được MAC: ${e.message}`, "warn");
    }
    currentChipMac = mac;

    // Lấy dung lượng Flash
    let flashSize = "16MB / Auto";
    try {
      const detectedSize = await esploader.getFlashSize();
      if (detectedSize) flashSize = detectedSize;
    } catch (e) {}

    // Cập nhật UI
    isConnected = true;
    statusDot.className = "status-dot connected";
    chipStatusText.textContent = "Đã kết nối thành công";
    chipType.textContent = chipName || "ESP32";
    chipMac.textContent = currentChipMac;
    chipFlashSize.textContent = flashSize;

    btnConnectText.textContent = "Ngắt Kết Nối";
    btnConnect.classList.replace("btn-primary", "btn-outline");
    btnFlash.disabled = false;
    btnErase.disabled = false;
    btnMonitorToggle.disabled = false;

    logSystem(`Nhận diện vi điều khiển: ${chipName} | MAC: ${currentChipMac} | Flash: ${flashSize}`, "success");
    updatePaymentQR();

  } catch (err) {
    logSystem(`Lỗi kết nối: ${err.message}`, "error");
    statusDot.className = "status-dot";
    chipStatusText.textContent = "Kết nối thất bại";
  }
}

async function disconnectESP() {
  if (transport) {
    try {
      await transport.disconnect();
    } catch (e) {}
    transport = null;
  }
  esploader = null;
  isConnected = false;
  currentChipMac = "";

  statusDot.className = "status-dot";
  chipStatusText.textContent = "Chưa cắm thiết bị";
  chipType.textContent = "--";
  chipMac.textContent = "--:--:--:--:--:--";
  chipFlashSize.textContent = "--";
  chipLicenseTag.textContent = "Chưa kích hoạt";
  chipLicenseTag.style.color = "#fbbf24";

  btnConnectText.textContent = "Chọn Cổng COM & Kết Nối";
  btnConnect.classList.replace("btn-outline", "btn-primary");
  btnFlash.disabled = true;
  btnErase.disabled = true;
  btnMonitorToggle.disabled = true;

  logSystem("Đã ngắt kết nối thiết bị.");
}

// 5. Kiểm tra Bản quyền / License
btnVerifyLicense.addEventListener("click", () => {
  const key = inputLicense.value.trim().toUpperCase();
  if (!key) {
    alert("Vui lòng nhập mã kích hoạt hoặc license key.");
    return;
  }

  // Giả lập kiểm tra License (hỗ trợ các key demo hoặc bất kỳ key nào hợp lệ)
  if (key.length >= 6) {
    licenseTag.className = "license-status-tag verified";
    licenseTag.textContent = "ĐÃ KÍCH HOẠT HỢP LỆ";
    chipLicenseTag.textContent = "Đã cấp phép bản quyền";
    chipLicenseTag.style.color = "#34d399";
    logSystem(`Kích hoạt thành công License [${key}] cho thiết bị MAC [${currentChipMac || 'Chưa cắm'}]`, "success");
  } else {
    licenseTag.className = "license-status-tag unverified";
    licenseTag.textContent = "MÃ KHÔNG HỢP LỆ";
    alert("Mã kích hoạt không đúng hoặc chưa được thanh toán.");
  }
});

// 6. Quản lý nạp file tùy chọn (Tab 2)
btnAddFileRow.addEventListener("click", () => {
  const row = document.createElement("div");
  row.className = "custom-file-row";
  row.innerHTML = `
    <input type="text" class="form-control file-offset" value="0x10000" placeholder="0x10000">
    <input type="file" class="form-control file-input" accept=".bin">
    <button type="button" class="btn-remove-row" title="Xóa dòng">&times;</button>
  `;
  customFilesContainer.appendChild(row);
  bindRemoveRow(row.querySelector(".btn-remove-row"));
});

function bindRemoveRow(btn) {
  btn.addEventListener("click", (e) => {
    if (customFilesContainer.querySelectorAll(".custom-file-row").length > 1) {
      e.target.closest(".custom-file-row").remove();
    } else {
      alert("Cần giữ lại ít nhất một file nạp.");
    }
  });
}
document.querySelectorAll(".btn-remove-row").forEach(bindRemoveRow);

// 7. Bắt đầu Nạp Firmware
btnFlash.addEventListener("click", async () => {
  if (!isConnected || !esploader) {
    alert("Vui lòng kết nối ESP32 trước khi nạp.");
    return;
  }

  const activeTab = document.querySelector(".tab-btn.active").dataset.tab;
  let fileArray = [];
  let shouldErase = false;

  try {
    if (activeTab === "tab-product") {
      // Nạp từ manifest sản phẩm
      const prodId = selectProduct.value;
      const verId = selectVersion.value;
      const mode = document.querySelector('input[name="flash-mode"]:checked').value;

      const prod = manifestData.products.find(p => p.id === prodId);
      const versionObj = prod.versions.find(v => v.version === verId);
      const modeObj = versionObj.modes[mode] || versionObj.modes.update || versionObj.modes.clean;

      shouldErase = modeObj.erase;
      logSystem(`Chuẩn bị nạp sản phẩm: ${prod.name} (${verId}) - Chế độ: ${modeObj.title}`);

      // Tải các file binary theo manifest
      for (let i = 0; i < modeObj.parts.length; i++) {
        const part = modeObj.parts[i];
        progressStatusText.textContent = `Đang tải ${part.path}...`;
        const res = await fetch(part.path);
        if (!res.ok) throw new Error(`Không tải được file firmware: ${part.path}`);
        const buffer = await res.arrayBuffer();
        fileArray.push({
          data: new Uint8Array(buffer),
          address: parseInt(part.offset, 16)
        });
      }

    } else if (activeTab === "tab-custom") {
      // Nạp từ file do người dùng upload
      shouldErase = checkCustomErase.checked;
      const rows = customFilesContainer.querySelectorAll(".custom-file-row");
      
      for (const row of rows) {
        const offsetStr = row.querySelector(".file-offset").value.trim();
        const fileInput = row.querySelector(".file-input");
        if (!fileInput.files || fileInput.files.length === 0) {
          throw new Error("Vui lòng chọn file .bin cho tất cả các phân vùng.");
        }
        const file = fileInput.files[0];
        const offset = parseInt(offsetStr, 16);
        if (isNaN(offset)) throw new Error(`Địa chỉ offset không hợp lệ: ${offsetStr}`);

        const buffer = await file.arrayBuffer();
        fileArray.push({
          data: new Uint8Array(buffer),
          address: offset
        });
      }
    } else {
      alert("Vui lòng chuyển về tab 'Firmware Bán Hàng' hoặc 'File .BIN Tùy Chọn' để nạp.");
      return;
    }

    if (fileArray.length === 0) {
      alert("Không có file firmware nào để nạp.");
      return;
    }

    // Bắt đầu quá trình nạp
    isFlashing = true;
    btnFlash.disabled = true;
    btnErase.disabled = true;
    btnConnect.disabled = true;
    progressStatusText.textContent = "Đang nạp firmware...";
    progressPercent.textContent = "0%";
    progressFill.style.width = "0%";

    logSystem("Bắt đầu ghi dữ liệu vào Flash...", "info");

    await esploader.writeFlash({
      fileArray: fileArray,
      flashSize: "keep",
      flashMode: "keep",
      flashFreq: "keep",
      eraseAll: shouldErase,
      compress: true,
      reportProgress: (fileIndex, written, total) => {
        const pct = Math.floor((written / total) * 100);
        progressPercent.textContent = `${pct}%`;
        progressFill.style.width = `${pct}%`;
        progressStatusText.textContent = `Đang ghi phân vùng ${fileIndex + 1}/${fileArray.length}: ${pct}%`;
      },
      calculateMD5Hash: (image) => {
        return window.SparkMD5 ? window.SparkMD5.ArrayBuffer.hash(image) : "";
      }
    });

    progressPercent.textContent = "100%";
    progressFill.style.width = "100%";
    progressStatusText.textContent = "Nạp thành công! Đang khởi động lại chip...";
    logSystem("Nạp hoàn tất! Đang Reset vi điều khiển...", "success");

    // Khởi động lại ESP32
    try {
      await esploader.hardReset();
      logSystem("Thiết bị đã khởi động lại và đang hoạt động bình thường.", "success");
    } catch (e) {
      logSystem("Hoàn tất nạp, bạn có thể ngắt kết nối và cấp nguồn lại cho mạch.", "info");
    }

  } catch (err) {
    progressStatusText.textContent = "Lỗi khi nạp!";
    logSystem(`Quá trình nạp thất bại: ${err.message}`, "error");
    alert(`Lỗi nạp firmware: ${err.message}`);
  } finally {
    isFlashing = false;
    btnFlash.disabled = false;
    btnErase.disabled = false;
    btnConnect.disabled = false;
  }
});

// 8. Xóa toàn bộ Flash (Erase Flash)
btnErase.addEventListener("click", async () => {
  if (!isConnected || !esploader) return;
  if (!confirm("CẢNH BÁO: Thao tác này sẽ xóa trắng toàn bộ dữ liệu trên chip ESP32 (bao gồm bootloader, app và cấu hình NVS). Bạn có chắc chắn muốn xóa?")) {
    return;
  }

  try {
    btnFlash.disabled = true;
    btnErase.disabled = true;
    progressStatusText.textContent = "Đang xóa toàn bộ bộ nhớ flash...";
    logSystem("Bắt đầu xóa Flash (Chip Erase)... Vui lòng đợi trong giây lát...", "warn");
    await esploader.eraseFlash();
    logSystem("Đã xóa sạch bộ nhớ Flash!", "success");
    progressStatusText.textContent = "Đã xóa trắng bộ nhớ Flash";
    alert("Đã xóa trắng toàn bộ bộ nhớ Flash thành công!");
  } catch (err) {
    logSystem(`Xóa flash thất bại: ${err.message}`, "error");
    alert(`Lỗi xóa flash: ${err.message}`);
  } finally {
    btnFlash.disabled = false;
    btnErase.disabled = false;
  }
});

// 9. Serial Monitor Implementation
btnMonitorToggle.addEventListener("click", async () => {
  if (!transport || !transport.device) {
    alert("Vui lòng kết nối ESP32 trước.");
    return;
  }

  if (isMonitoring) {
    // Dừng đọc
    isMonitoring = false;
    btnMonitorToggle.textContent = "Bắt đầu đọc Serial";
    btnMonitorToggle.classList.replace("btn-danger", "btn-primary");
    inputMonitorSend.disabled = true;
    btnMonitorSend.disabled = true;
    if (monitorReader) {
      try {
        await monitorReader.cancel();
      } catch (e) {}
      monitorReader = null;
    }
  } else {
    // Bắt đầu đọc
    isMonitoring = true;
    btnMonitorToggle.textContent = "Dừng đọc Serial";
    btnMonitorToggle.classList.replace("btn-primary", "btn-danger");
    inputMonitorSend.disabled = false;
    btnMonitorSend.disabled = false;
    readSerialLoop();
  }
});

async function readSerialLoop() {
  try {
    const port = transport.device;
    if (!port.readable) return;
    const decoder = new TextDecoderStream();
    const readableStreamClosed = port.readable.pipeTo(decoder.writable);
    monitorReader = decoder.readable.getReader();

    logSystem("Bắt đầu đọc Serial Console...", "info");

    while (isMonitoring) {
      const { value, done } = await monitorReader.read();
      if (done) break;
      if (value) {
        const span = document.createElement("span");
        span.className = "log-data";
        span.textContent = value;
        terminalBody.appendChild(span);
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
    }
  } catch (err) {
    if (isMonitoring) {
      logSystem(`Lỗi đọc Serial: ${err.message}`, "warn");
    }
  }
}

btnMonitorClear.addEventListener("click", () => {
  terminalBody.textContent = "";
});

// 10. Thanh toán VietQR Modal
btnOpenPayment.addEventListener("click", () => {
  updatePaymentQR();
  modalPayment.classList.add("open");
});

btnClosePayment.addEventListener("click", () => {
  modalPayment.classList.remove("open");
});

function updatePaymentQR() {
  if (!manifestData) return;
  const prodId = selectProduct.value;
  const prod = manifestData.products.find(p => p.id === prodId) || manifestData.products[0];
  
  const cleanPrice = prod.price.replace(/[^\d]/g, "") || "99000";
  const cleanMac = (currentChipMac || "DEMOMAC").replace(/[^a-zA-Z0-9]/g, "");
  const orderInfo = `FW ${prod.id.toUpperCase().substring(0, 8)} ${cleanMac.substring(cleanMac.length - 6)}`;

  bankAmount.textContent = prod.price;
  bankContent.textContent = orderInfo;

  // Tạo URL VietQR chuẩn
  const qrUrl = `https://img.vietqr.io/image/TPBANK-00450516106-compact2.png?amount=${cleanPrice}&addInfo=${encodeURIComponent(orderInfo)}&accountName=NGUYEN%20VAN%20VIEN`;
  vietqrImg.src = qrUrl;
}

btnCopyStk.addEventListener("click", () => {
  navigator.clipboard.writeText("00450516106");
  alert("Đã sao chép Số tài khoản: 00450516106");
});

btnCopyContent.addEventListener("click", () => {
  navigator.clipboard.writeText(bankContent.textContent);
  alert(`Đã sao chép nội dung chuyển khoản: ${bankContent.textContent}`);
});

btnConfirmPaid.addEventListener("click", () => {
  btnConfirmPaid.disabled = true;
  btnConfirmPaid.textContent = "Đang kiểm tra giao dịch...";
  
  setTimeout(() => {
    modalPayment.classList.remove("open");
    btnConfirmPaid.disabled = false;
    btnConfirmPaid.textContent = "Tôi đã chuyển khoản";

    // Tự sinh License Key demo cho khách
    const generatedKey = `TING-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${(currentChipMac || 'DEMO').replace(/:/g, '').slice(-4)}`;
    inputLicense.value = generatedKey;
    btnVerifyLicense.click();
    alert(`Xác nhận thanh toán thành công!\nMã kích hoạt tự động điền: ${generatedKey}\nBây giờ bạn có thể bấm 'Bắt Đầu Nạp Firmware'.`);
  }, 2000);
});

// 11. Modal Hướng dẫn Driver
btnDriverGuide.addEventListener("click", () => modalDriver.classList.add("open"));
btnCloseDriver.addEventListener("click", () => modalDriver.classList.remove("open"));

// Close modals on overlay click
[modalPayment, modalDriver].forEach(modal => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("open");
  });
});

// Copy & Clear Log
btnCopyLog.addEventListener("click", () => {
  navigator.clipboard.writeText(terminalBody.textContent);
  alert("Đã sao chép toàn bộ nhật ký console.");
});

btnClearLog.addEventListener("click", () => {
  terminalBody.textContent = "";
});

// Khởi chạy khi load trang
selectProduct.addEventListener("change", onProductChange);
checkBrowserSupport();
loadManifest();

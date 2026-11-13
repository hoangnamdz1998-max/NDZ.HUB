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
const machineLicenseTag = document.getElementById("machine-license-tag");
const limitRuleBox = document.getElementById("limit-rule-box");
const limitRuleTitle = document.getElementById("limit-rule-title");
const limitRuleDesc = document.getElementById("limit-rule-desc");

// Product elements
const selectProduct = document.getElementById("select-product");
const productDesc = document.getElementById("product-desc");
const productChipBadge = document.getElementById("product-chip-badge");
const productPriceBadge = document.getElementById("product-price-badge");
const selectVersion = document.getElementById("select-version");
const modeCardUpdate = document.getElementById("mode-card-update");
const modeCardClean = document.getElementById("mode-card-clean");

// ============================================================================
// HỆ THỐNG QUẢN LÝ LƯỢT NẠP (MỖI MÁY TÍNH ĐƯỢC NẠP 2 LẦN MIỄN PHÍ)
// ============================================================================
const MAX_FLASH_COUNT = 2;
const MACHINE_FLASH_KEY = "ndz_machine_flashed_v3";
const CHIP_FLASH_KEY = "ndz_chip_flashed_v3";

// 1. Lấy thông tin lượt nạp từ lưu trữ đa tầng (localStorage + Cookie)
function getMachineFlashRecord() {
  try {
    const raw = localStorage.getItem(MACHINE_FLASH_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}

  try {
    const match = document.cookie.match(new RegExp('(?:^|; )' + MACHINE_FLASH_KEY + '=([^;]+)'));
    if (match) return JSON.parse(decodeURIComponent(match[1]));
  } catch (e) {}

  return null;
}

function getMachineFlashCount() {
  const rec = getMachineFlashRecord();
  if (!rec) return 0;
  if (Array.isArray(rec.flashes)) return rec.flashes.length;
  if (typeof rec.count === "number") return rec.count;
  return 0;
}

function isMachineFlashLimitReached() {
  return getMachineFlashCount() >= MAX_FLASH_COUNT;
}

// 2. IndexedDB Backup
function openSecurityDB() {
  return new Promise((resolve) => {
    if (!window.indexedDB) return resolve(null);
    try {
      const req = indexedDB.open("NDZ_Security_DB_v3", 1);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains("security")) {
          db.createObjectStore("security", { keyPath: "key" });
        }
      };
      req.onsuccess = (e) => resolve(e.target.result);
      req.onerror = () => resolve(null);
    } catch (e) {
      resolve(null);
    }
  });
}

async function syncIndexedDB() {
  try {
    const db = await openSecurityDB();
    if (!db) return;

    const tx = db.transaction("security", "readonly");
    const store = tx.objectStore("security");
    const req = store.get(MACHINE_FLASH_KEY);
    req.onsuccess = () => {
      if (req.result && req.result.val) {
        const idbRec = req.result.val;
        const localCount = getMachineFlashCount();
        const idbCount = Array.isArray(idbRec.flashes) ? idbRec.flashes.length : (idbRec.count || 0);
        if (idbCount > localCount) {
          const valStr = JSON.stringify(idbRec);
          try { localStorage.setItem(MACHINE_FLASH_KEY, valStr); } catch (e) {}
          setMachineCookie(valStr);
          updateFlashAllowanceUI();
        }
      }
    };
  } catch (e) {}
}

function setMachineCookie(valStr) {
  try {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 10);
    document.cookie = `${MACHINE_FLASH_KEY}=${encodeURIComponent(valStr)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
  } catch (e) {}
}

async function markMachineAsFlashed(mac, productName) {
  const now = new Date();
  const currentRec = getMachineFlashRecord() || { count: 0, flashes: [] };
  const flashes = Array.isArray(currentRec.flashes) ? currentRec.flashes : [];

  const newFlashEntry = {
    flashedAt: now.toLocaleString("vi-VN"),
    timestamp: now.getTime(),
    mac: mac || "UNKNOWN_MAC",
    product: productName || "ESP32 Firmware"
  };

  flashes.push(newFlashEntry);
  const newCount = flashes.length;

  const record = {
    count: newCount,
    flashes: flashes,
    lastFlashedAt: newFlashEntry.flashedAt,
    lastMac: newFlashEntry.mac
  };

  const str = JSON.stringify(record);

  // 1. localStorage
  try { localStorage.setItem(MACHINE_FLASH_KEY, str); } catch (e) {}

  // 2. Cookie (10 năm)
  setMachineCookie(str);

  // 3. IndexedDB
  try {
    const db = await openSecurityDB();
    if (db) {
      const tx = db.transaction("security", "readwrite");
      tx.objectStore("security").put({ key: MACHINE_FLASH_KEY, val: record });
    }
  } catch (e) {}

  // 4. Lưu lại MAC của chip đã nạp
  if (mac && mac !== "Unknown") {
    const cleanMac = mac.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    try {
      const chips = JSON.parse(localStorage.getItem(CHIP_FLASH_KEY) || "{}");
      chips[cleanMac] = newFlashEntry;
      localStorage.setItem(CHIP_FLASH_KEY, JSON.stringify(chips));
    } catch (e) {}
  }
}

function updateFlashAllowanceUI() {
  const count = getMachineFlashCount();
  const remaining = Math.max(0, MAX_FLASH_COUNT - count);
  const rec = getMachineFlashRecord();

  if (count >= MAX_FLASH_COUNT) {
    if (machineLicenseTag) {
      machineLicenseTag.textContent = `❌ Đã hết lượt (Đã nạp ${count}/${MAX_FLASH_COUNT} lần)`;
      machineLicenseTag.style.color = "#ef4444";
    }
    if (limitRuleBox) {
      limitRuleBox.classList.add("locked");
    }
    if (limitRuleTitle) {
      limitRuleTitle.textContent = "Máy Tính Này Đã Sử Dụng Hết 2 Lượt Nạp!";
    }
    if (limitRuleDesc) {
      const detailFlashes = (rec?.flashes || []).map((f, i) => `Lần ${i+1}: <b>${f.flashedAt}</b> (${f.mac})`).join(" | ");
      limitRuleDesc.innerHTML = `Máy tính này đã hoàn tất đủ <b>2/2 lượt nạp miễn phí</b> (${detailFlashes}).<br><span style="color:#f87171; font-weight:700;">Theo chính sách, bạn KHÔNG thể nạp thêm lần thứ 3 trên máy tính này!</span>`;
    }
    if (btnFlash) {
      btnFlash.disabled = true;
    }
  } else if (count === 1) {
    if (machineLicenseTag) {
      machineLicenseTag.textContent = `⚠️ Đã dùng 1/2 lượt (Còn 1 lượt)`;
      machineLicenseTag.style.color = "#f59e0b";
    }
    if (limitRuleBox) {
      limitRuleBox.classList.remove("locked");
    }
    if (limitRuleTitle) {
      limitRuleTitle.textContent = "Máy Tính Đã Dùng 1 Lượt Nạp (Còn 1 Lượt Cuối):";
    }
    if (limitRuleDesc) {
      limitRuleDesc.innerHTML = `Bạn đã nạp thành công 1 thiết bị lúc: <b>${rec?.lastFlashedAt || ''}</b>. Máy tính của bạn còn <b>1 lượt nạp miễn phí cuối cùng</b>.`;
    }
  } else {
    if (machineLicenseTag) {
      machineLicenseTag.textContent = `✅ Còn 2/2 lượt nạp`;
      machineLicenseTag.style.color = "#10b981";
    }
    if (limitRuleBox) {
      limitRuleBox.classList.remove("locked");
    }
    if (limitRuleTitle) {
      limitRuleTitle.textContent = "Chính Sách Nạp Miễn Phí (2 Lần / Mỗi Máy Tính):";
    }
    if (limitRuleDesc) {
      limitRuleDesc.innerHTML = `Hệ thống miễn phí 100%. Mỗi máy tính được cấp <b>2 lượt nạp miễn phí</b> (ví dụ nạp cho 2 thiết bị khác nhau). Sau khi đã nạp đủ 2 lần, máy tính này sẽ <b>bị khóa không thể nạp thêm</b>.`;
    }
  }
}

function updateDeviceFlashStatus(mac) {
  updateFlashAllowanceUI();

  const count = getMachineFlashCount();
  const rec = getMachineFlashRecord();

  // NẾU MÁY TÍNH NÀY ĐÃ ĐẠT ĐỦ 2 LẦN -> KHÓA NGAY LẬP TỨC
  if (count >= MAX_FLASH_COUNT) {
    if (chipLicenseTag) {
      chipLicenseTag.textContent = "⛔ TỪ CHỐI (Máy đã nạp đủ 2 lần)";
      chipLicenseTag.style.color = "#ef4444";
    }
    if (btnFlash) btnFlash.disabled = true;
    progressStatusText.textContent = `Máy tính này đã hoàn thành tối đa 2 lượt nạp. Hết lượt!`;
    logSystem(`[CẢNH BÁO TỪ CHỐI] Máy tính này đã hoàn thành đủ 2 lượt nạp firmware miễn phí.`, "error");
    logSystem(`[CHÍNH SÁCH 2 LẦN / MÁY] Bạn đang cắm chip [MAC: ${mac || 'Đang kết nối'}], nhưng máy tính này đã hết lượt. Không thể nạp lần thứ 3!`, "error");
    return;
  }

  // Nếu máy tính chưa hết lượt:
  if (!mac || mac === "Unknown") {
    if (chipLicenseTag) {
      chipLicenseTag.textContent = "Chờ cắm thiết bị";
      chipLicenseTag.style.color = "#94a3b8";
    }
    return;
  }

  const remaining = MAX_FLASH_COUNT - count;
  if (chipLicenseTag) {
    chipLicenseTag.textContent = `✅ Sẵn sàng nạp (Lượt ${count + 1}/${MAX_FLASH_COUNT})`;
    chipLicenseTag.style.color = "#10b981";
  }
  if (btnFlash) btnFlash.disabled = false;
  logSystem(`[Thông báo] Nhận diện chip MAC [${mac}] thành công. Máy tính này còn ${remaining}/${MAX_FLASH_COUNT} lượt nạp.`, "info");
}

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

// Pre-flash Checklist Elements
const checkBoardPlugged = document.getElementById("check-board-plugged");
const checkBoardType = document.getElementById("check-board-type");
const itemCheckPlugged = document.getElementById("item-check-plugged");
const itemCheckBoardType = document.getElementById("item-check-board-type");
const confirmBoardName = document.getElementById("confirm-board-name");

function canFlashNow() {
  const count = getMachineFlashCount();
  if (count >= MAX_FLASH_COUNT) return false;
  if (!isConnected || !esploader) return false;
  if (!checkBoardPlugged || !checkBoardPlugged.checked) return false;
  if (!checkBoardType || !checkBoardType.checked) return false;
  return true;
}

function refreshFlashButtonState() {
  if (isFlashing) return;
  const count = getMachineFlashCount();
  if (count >= MAX_FLASH_COUNT) {
    btnFlash.disabled = true;
    return;
  }
  if (!isConnected) {
    btnFlash.disabled = true;
    return;
  }
  btnFlash.disabled = !canFlashNow();
}

function updateConfirmedBoardName() {
  if (!confirmBoardName) return;
  const activeTab = (document.querySelector(".sub-tabs-nav .tab-btn.active") || document.querySelector(".tab-btn.active"))?.dataset?.tab || "tab-product";
  if (activeTab === "tab-custom") {
    confirmBoardName.textContent = "Bo mạch DIY (File .BIN tự chọn)";
  } else {
    const prod = manifestData?.products?.find(p => p.id === selectProduct?.value);
    confirmBoardName.textContent = prod?.name || "ROBOT BÁNH XÍCH N1";
  }
}

if (checkBoardPlugged) {
  checkBoardPlugged.addEventListener("change", () => {
    if (itemCheckPlugged) itemCheckPlugged.classList.toggle("checked", checkBoardPlugged.checked);
    refreshFlashButtonState();
    if (checkBoardPlugged.checked) {
      logSystem("[Xác nhận] Đã tích: Xác nhận đã cắm bo mạch ESP32 vào máy tính.", "info");
    }
  });
}

if (checkBoardType) {
  checkBoardType.addEventListener("change", () => {
    if (itemCheckBoardType) itemCheckBoardType.classList.toggle("checked", checkBoardType.checked);
    refreshFlashButtonState();
    if (checkBoardType.checked) {
      logSystem(`[Xác nhận] Đã tích: Xác nhận đúng loại bo mạch [${confirmBoardName?.textContent || ''}].`, "info");
    }
  });
}

// Modals
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

  productDesc.textContent = prod.description || "";
  productChipBadge.textContent = prod.chipFamily || "ESP32";
  productPriceBadge.textContent = prod.price ? `Giá: ${prod.price}` : "";
  productPriceBadge.style.display = prod.price ? "inline-block" : "none";

  // Populate versions
  selectVersion.innerHTML = "";
  prod.versions.forEach((v, idx) => {
    const opt = document.createElement("option");
    opt.value = v.version;
    const dateStr = v.releaseDate ? ` (${v.releaseDate})` : "";
    const logStr = v.changelog ? ` - ${v.changelog}` : "";
    opt.textContent = `${v.version}${dateStr}${logStr}`;
    if (idx === 0) opt.selected = true;
    selectVersion.appendChild(opt);
  });

  updateConfirmedBoardName();
  if (checkBoardType) {
    checkBoardType.checked = false;
    if (itemCheckBoardType) itemCheckBoardType.classList.remove("checked");
  }
  refreshFlashButtonState();
}

// 3. Quản lý Navigation Tabs (Top Navigation & Floating Bottom Dock)
const allNavBtns = document.querySelectorAll(".nav-tab-btn, .dock-btn");
const mainViewPanels = document.querySelectorAll(".main-view-panel");

function switchNavTab(targetNav, smoothScroll = true) {
  if (!targetNav) return;
  allNavBtns.forEach(b => {
    b.classList.toggle("active", b.dataset.nav === targetNav);
  });

  mainViewPanels.forEach(p => {
    p.classList.toggle("active", p.id === targetNav);
  });

  if (smoothScroll) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

allNavBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const targetNav = btn.dataset.nav;
    if (!targetNav) return;
    if (window.location.hash !== `#${targetNav}`) {
      window.history.pushState(null, "", `#${targetNav}`);
    }
    switchNavTab(targetNav, true);
  });
});

// Hỗ trợ mở trực tiếp tab qua URL hash (ví dụ: #view-products)
function handleUrlHash() {
  const hash = window.location.hash.replace("#", "");
  if (hash) {
    switchNavTab(hash, false);
  }
}
window.addEventListener("hashchange", handleUrlHash);
handleUrlHash();

// Quản lý Sub-Tabs bên trong Tab Nạp Firmware (Sản phẩm vs File .bin)
document.querySelectorAll(".sub-tabs-nav .tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".sub-tabs-nav .tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".col-flashing .tab-content").forEach(c => c.classList.remove("active"));

    btn.classList.add("active");
    const target = document.getElementById(btn.dataset.tab);
    if (target) target.classList.add("active");

    updateConfirmedBoardName();
    if (checkBoardType) {
      checkBoardType.checked = false;
      if (itemCheckBoardType) itemCheckBoardType.classList.remove("checked");
    }
    refreshFlashButtonState();
  });
});

// Tương tác trên thẻ Sản Phẩm (Catalog Tab)
document.querySelectorAll(".btn-select-product").forEach(btn => {
  btn.addEventListener("click", () => {
    const prodId = btn.dataset.productId;
    if (prodId && selectProduct) {
      selectProduct.value = prodId;
      onProductChange();
    }
    // Chuyển sang Tab Nạp Firmware
    const flasherTabBtn = document.querySelector('[data-nav="view-flasher"]');
    if (flasherTabBtn) flasherTabBtn.click();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Bộ lọc danh mục sản phẩm: Tất cả, Firmware (FW), Hoàn thiện, Vỏ nhựa in 3D
const catFilterBtns = document.querySelectorAll(".cat-filter-btn");
const productCards = document.querySelectorAll(".product-card[data-category]");
const catalogSections = document.querySelectorAll(".catalog-section[data-category-section]");

catFilterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    catFilterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    if (filter === "all") {
      catalogSections.forEach(s => s.style.display = "");
      productCards.forEach(c => c.style.display = "");
    } else {
      catalogSections.forEach(s => {
        if (s.dataset.categorySection === filter) {
          s.style.display = "";
        } else {
          s.style.display = "none";
        }
      });
      productCards.forEach(c => {
        if (c.dataset.category === filter) {
          c.style.display = "";
        } else {
          c.style.display = "none";
        }
      });
    }
  });
});

// Modal Tư vấn & Đặt hàng sản phẩm / Đặt in vỏ 3D
const modalOrder = document.getElementById("modal-order");
const btnCloseOrder = document.getElementById("btn-close-order");
const btnOrderCloseConfirm = document.getElementById("btn-order-close-confirm");
const orderProductTitle = document.getElementById("order-product-title");

document.querySelectorAll(".btn-order-action").forEach(btn => {
  btn.addEventListener("click", () => {
    const prodName = btn.dataset.productName;
    if (orderProductTitle) {
      orderProductTitle.textContent = prodName ? `Đặt Hàng: ${prodName}` : "Tư Vấn & Đặt Hàng NDZ HUB";
    }
    if (modalOrder) {
      modalOrder.classList.add("active");
    }
  });
});

if (btnCloseOrder && modalOrder) {
  btnCloseOrder.addEventListener("click", () => {
    modalOrder.classList.remove("active");
  });
}
if (btnOrderCloseConfirm && modalOrder) {
  btnOrderCloseConfirm.addEventListener("click", () => {
    modalOrder.classList.remove("active");
  });
}
if (modalOrder) {
  modalOrder.addEventListener("click", (e) => {
    if (e.target === modalOrder) {
      modalOrder.classList.remove("active");
    }
  });
}

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
    btnErase.disabled = false;
    btnMonitorToggle.disabled = false;

    // Tự động tích xác nhận 1 khi kết nối COM thành công
    if (checkBoardPlugged) {
      checkBoardPlugged.checked = true;
      if (itemCheckPlugged) itemCheckPlugged.classList.add("checked");
    }

    logSystem(`Nhận diện vi điều khiển: ${chipName} | MAC: ${currentChipMac} | Flash: ${flashSize}`, "success");
    updateDeviceFlashStatus(currentChipMac);
    refreshFlashButtonState();

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

  if (checkBoardPlugged) {
    checkBoardPlugged.checked = false;
    if (itemCheckPlugged) itemCheckPlugged.classList.remove("checked");
  }
  if (checkBoardType) {
    checkBoardType.checked = false;
    if (itemCheckBoardType) itemCheckBoardType.classList.remove("checked");
  }

  updateDeviceFlashStatus("");
  refreshFlashButtonState();

  btnConnectText.textContent = "Chọn Cổng COM & Kết Nối";
  btnConnect.classList.replace("btn-outline", "btn-primary");
  btnFlash.disabled = true;
  btnErase.disabled = true;
  btnMonitorToggle.disabled = true;

  logSystem("Đã ngắt kết nối thiết bị.");
}

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

  // KIỂM TRA CHÍNH SÁCH 2 LẦN / MỖI MÁY TÍNH
  if (isMachineFlashLimitReached()) {
    const count = getMachineFlashCount();
    alert(`MÁY TÍNH NÀY ĐÃ HẾT LƯỢT NẠP!\n\nBạn đã sử dụng hết ${count}/${MAX_FLASH_COUNT} lượt nạp miễn phí trên máy tính này.\n\nTheo quy định của NDZ HUB, mỗi máy tính chỉ được cấp tối đa 2 lượt nạp. Bạn không thể nạp thêm lần thứ 3 trên cùng một máy tính!`);
    refreshFlashButtonState();
    return;
  }

  // KIỂM TRA CÁC BƯỚC TÍCH XÁC NHẬN AN TOÀN
  if (!checkBoardPlugged || !checkBoardPlugged.checked || !checkBoardType || !checkBoardType.checked) {
    alert(`VUI LÒNG TÍCH ĐỦ CẢ 2 BƯỚC XÁC NHẬN TRƯỚC KHI NẠP:\n\n1. Tích xác nhận đã cắm bo mạch ESP32 vào máy tính.\n2. Tích xác nhận đúng loại bo mạch bạn đang cầm trên tay (${confirmBoardName?.textContent || 'đúng sản phẩm'}).\n\nThao tác này giúp tránh nạp nhầm firmware gây hỏng bo mạch!`);
    refreshFlashButtonState();
    return;
  }

  const activeTab = (document.querySelector(".sub-tabs-nav .tab-btn.active") || document.querySelector(".tab-btn.active"))?.dataset?.tab || "tab-product";
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

    // Ghi nhận lượt nạp thành công cho máy tính (Tối đa 2 lần)
    const currentProd = manifestData?.products?.find(p => p.id === selectProduct?.value);
    await markMachineAsFlashed(currentChipMac, currentProd?.name || "ESP32 Firmware");
    updateDeviceFlashStatus(currentChipMac);

    const afterCount = getMachineFlashCount();
    if (afterCount < MAX_FLASH_COUNT) {
      logSystem(`[Thông báo] Bạn vừa hoàn thành lượt nạp ${afterCount}/${MAX_FLASH_COUNT}. Máy tính này còn ${MAX_FLASH_COUNT - afterCount} lượt nạp nữa!`, "info");
    } else {
      logSystem(`[Thông báo] Bạn đã sử dụng đủ ${MAX_FLASH_COUNT}/${MAX_FLASH_COUNT} lượt nạp miễn phí của máy tính này!`, "warn");
    }

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
    refreshFlashButtonState();
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

        const monitorScreen = document.getElementById("monitor-screen");
        if (monitorScreen) {
          monitorScreen.textContent += value;
          monitorScreen.scrollTop = monitorScreen.scrollHeight;
        }
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
  const monitorScreen = document.getElementById("monitor-screen");
  if (monitorScreen) monitorScreen.textContent = "";
});

// 10. Modal Hướng dẫn Driver & Chuyển Tab
btnDriverGuide.addEventListener("click", () => {
  const guideTabBtn = document.querySelector('[data-nav="view-guide"]');
  if (guideTabBtn) {
    guideTabBtn.click();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (modalDriver) {
    modalDriver.classList.add("open");
  }
});
if (btnCloseDriver) {
  btnCloseDriver.addEventListener("click", () => modalDriver.classList.remove("open"));
}

// Close modals on overlay click
if (modalDriver) {
  modalDriver.addEventListener("click", (e) => {
    if (e.target === modalDriver) modalDriver.classList.remove("open");
  });
}

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
syncIndexedDB();
updateFlashAllowanceUI();
updateConfirmedBoardName();
refreshFlashButtonState();

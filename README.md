# ⚡ ESP Web Flasher Pro · Nạp Firmware Thương Mại Trực Tuyến

Trang web nạp firmware chuyên nghiệp dành cho các sản phẩm thương mại IoT (ESP32 / ESP32-S3 / ESP32-C3) tương tự như hệ thống nạp **Loa Ting** (`esp32.viennv.dev`).

---

## 🌟 Các tính năng chính

1. **Nạp trực tiếp qua Web Serial API**:
   - Không cần cài phần mềm nạp hay Arduino IDE. Cắm cáp USB vào máy tính, bấm chọn cổng COM là nạp được ngay.
   - Sử dụng thư viện `esptool-js` chính thức từ Espressif.
   - Hỗ trợ các tốc độ nạp cao: **921600**, 460800, 115200 baud.
2. **Quản lý Bản Quyền & Sản Phẩm Thương Mại**:
   - Đọc tự động **MAC Address (Chip ID)** của từng chip ESP32 khi kết nối.
   - Kiểm tra mã kích hoạt (License Key) gắn với định danh phần cứng.
   - Tích hợp cửa sổ thanh toán tự động **VietQR** (tự điền số tiền, số tài khoản và cú pháp chuyển khoản chứa mã MAC).
3. **Hai chế độ nạp thông minh**:
   - **Cập nhật ứng dụng**: Chỉ ghi đè phân vùng App (`0x10000`), giữ nguyên cấu hình Wi-Fi và Token NVS.
   - **Cài mới hoàn toàn**: Xóa trắng flash và nạp Bootloader (`0x0000`) + Partition Table (`0x8000`) + App (`0x10000`).
4. **Hỗ trợ nạp file `.bin` tùy chỉnh**:
   - Cho phép thêm nhiều phân vùng và địa chỉ offset tùy ý cho các dự án DIY.
5. **Serial Monitor tích hợp**:
   - Xem log dữ liệu gửi từ ESP32 sau khi nạp xong mà không cần mở PuTTY hay Serial Monitor ngoài.

---

## 🚀 Cách chạy thử nghiệm ngay

Dự án đã tích hợp sẵn mini web server bằng Node.js:

```bash
# Chạy web server nội bộ
node server.js
```

Sau đó mở trình duyệt (Google Chrome, Microsoft Edge, Opera hoặc Cốc Cốc) và truy cập:
👉 **`http://localhost:3000`**

*(Lưu ý: Web Serial API yêu cầu chạy trên `localhost` hoặc qua giao thức bảo mật `https://`)*.

---

## 📁 Cấu trúc thư mục

```
web-nap-fw/
├── index.html              # Giao diện chính người dùng
├── style.css               # Giao diện hiện đại (Dark tech theme, responsive)
├── app.js                  # Logic điều khiển Web Serial, nạp chip & License
├── server.js               # Mini web server Node.js & API kiểm tra bản quyền
├── firmware/
│   ├── manifest.json       # Cấu hình danh sách sản phẩm, phiên bản và offset nạp
│   ├── demo_bootloader.bin # File nạp mẫu
│   ├── demo_partitions.bin # File bảng phân vùng mẫu
│   └── demo_app.bin        # File firmware mẫu
└── vendor/
    ├── esptool-js.js       # Bộ nạp esptool cho Web Serial (Espressif)
    └── spark-md5.min.js    # Kiểm tra checksum MD5
```

---

## ⚙️ Cách đưa Firmware thật của bạn vào hệ thống

Mở file `firmware/manifest.json` và chỉnh sửa:
1. Copy file `.bin` thật của bạn (biên dịch từ ESP-IDF hoặc Arduino IDE) vào thư mục `firmware/`.
2. Khai báo các phân vùng trong `manifest.json`:
   - Với **ESP32**: Bootloader thường ở `0x1000`, Partitions ở `0x8000`, App ở `0x10000`.
   - Với **ESP32-S3 / ESP32-C3**: Bootloader thường ở `0x0000`, Partitions ở `0x8000`, App ở `0x10000`.

---

## 🔒 Hướng dẫn bảo vệ bản quyền Firmware khi bán hàng

1. **Khóa theo MAC Address trong Firmware**:
   - Khi khởi động vi điều khiển, đọc MAC chip: `esp_efuse_mac_get_default()`.
   - Nếu không khớp danh sách cho phép hoặc mã bản quyền trong flash NVS -> Dừng chương trình.
2. **Kích hoạt Flash Encryption**:
   - Sử dụng tính năng mã hóa flash tích hợp sẵn của ESP32 (`esp_flash_encrypt`). Người mua sẽ không thể dùng phần mềm dump file `.bin` ra để sao chép sang mạch khác.

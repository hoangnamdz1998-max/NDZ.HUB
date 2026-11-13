# ⚡ NDZ HUB · Nền Tảng Nạp Firmware ESP32 Trực Tuyến

Trang web nạp firmware chuyên nghiệp dành cho các sản phẩm IoT thương mại của **NDZ HUB** (ESP32 / ESP32-S3 / ESP32-C3) trực tiếp qua trình duyệt với giao diện nền trắng hiện đại.

---

## 🌟 Các sản phẩm chính
1. **ROBOT BÁNH XÍCH N1**
2. **ROBOT BÁNH XÍCH T1**
3. **HUB MÀN HÌNH CẢM ỨNG**

---

## 🚀 Các tính năng chính

1. **Nạp trực tiếp qua Web Serial API**:
   - Không cần cài phần mềm nạp hay Arduino IDE. Cắm cáp USB vào máy tính, bấm chọn cổng COM là nạp được ngay.
   - Sử dụng thư viện `esptool-js` chính thức từ Espressif.
   - Hỗ trợ các tốc độ nạp cao: **921600**, 460800, 115200 baud.
2. **Quản lý Bản Quyền Phần Cứng**:
   - Đọc tự động **MAC Address (Chip ID)** của từng chip ESP32 khi kết nối.
   - Kiểm tra mã kích hoạt (License Key) gắn với định danh phần cứng.
   - Tích hợp cửa sổ thanh toán tự động **VietQR** (Ngân hàng ACB - DO HOANG NAM).
3. **Hai chế độ nạp thông minh**:
   - **Cập nhật ứng dụng**: Chỉ ghi đè phân vùng App (`0x10000`), giữ nguyên cấu hình Wi-Fi và Token NVS.
   - **Cài mới hoàn toàn**: Xóa trắng flash và nạp Bootloader + Partition Table + App từ đầu.
4. **Hỗ trợ nạp file `.bin` tùy chỉnh (DIY)**:
   - Cho phép thêm nhiều phân vùng và địa chỉ offset tùy ý cho các dự án DIY.
5. **Serial Monitor tích hợp**:
   - Xem log dữ liệu gửi từ ESP32 sau khi nạp xong trực tiếp trên trình duyệt.

---

## 🚀 Cách chạy thử nghiệm ngay

```bash
# Chạy web server nội bộ
node scripts/local-server.js
```

Sau đó mở trình duyệt (Google Chrome, Microsoft Edge hoặc Cốc Cốc) và truy cập:
👉 **`http://localhost:3000`**

*(Lưu ý: Web Serial API yêu cầu chạy trên `localhost` hoặc qua giao thức bảo mật `https://`)*.

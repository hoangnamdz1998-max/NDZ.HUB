// i18n.js - Hệ thống đa ngôn ngữ Tiếng Việt & English cho NDZ HUB

export const translations = {
  vi: {
    // Document
    doc_title: "NDZ HUB · Nạp Firmware ESP32 Trực Tuyến",
    meta_desc: "Nạp firmware cho ESP32, ESP32-S3, ESP32-C3 trực tiếp trên trình duyệt Web qua cổng Serial. Quản lý bản quyền phần cứng NDZ HUB.",

    // Header
    brand_subtitle: "Nền tảng Nạp Firmware & Bản Quyền Phần Cứng IoT",
    btn_driver_guide: "Driver & Trợ giúp",
    btn_zalo_support: "Nhóm Zalo hỗ trợ",

    // Main Top Navigation
    nav_flasher: "Nạp Firmware",
    nav_products: "Sản Phẩm & Bản Quyền",
    nav_monitor: "Serial Monitor",
    nav_guide: "Hướng Dẫn & Cài Driver",

    // Bottom Dock
    dock_home: "Trang chủ",
    dock_products: "Sản phẩm",
    dock_monitor: "Monitor",
    dock_guide: "Hướng dẫn",

    // Browser Support
    browser_alert_text: "Trình duyệt hiện tại không hỗ trợ <b>Web Serial API</b>. Vui lòng mở trang web này bằng <b>Google Chrome</b>, <b>Microsoft Edge</b> hoặc <b>Opera / Cốc Cốc</b> trên máy tính để nạp firmware.",

    // View 1: Flasher Intro
    hero_title: "Nạp Firmware Trực Tiếp Qua Trình Duyệt",
    hero_desc: "Kết nối cáp USB với máy tính, chọn cổng COM và nạp firmware cho dòng chip ESP32/ESP32-S3/ESP32-C3 chỉ trong vài giây mà không cần cài đặt Arduino IDE.",
    hero_badge_webserial: "⚡ Web Serial API",
    hero_badge_esptool: "🛡️ esptool-js 5.6",
    hero_badge_speed: "🚀 Tốc độ 921600",

    // Step 1: Hardware Connection
    step1_title: "Kết nối Thiết bị",
    label_baud: "Tốc độ nạp (Baudrate):",
    baud_921600: "921600 (Siêu tốc - Khuyên dùng)",
    baud_460800: "460800 (Nhanh & Ổn định)",
    baud_115200: "115200 (Tiêu chuẩn - Chống nhiễu cáp)",
    btn_connect_idle: "Chọn Cổng COM & Kết Nối",
    btn_connect_connected: "Ngắt Kết Nối",
    chip_status_unplugged: "Chưa cắm thiết bị",
    chip_status_syncing: "Đang đồng bộ bootloader...",
    chip_status_connected: "Đã kết nối thành công",
    chip_status_failed: "Kết nối thất bại",
    label_chip_type: "Dòng vi điều khiển:",
    label_chip_mac: "Định danh MAC (Chip ID):",
    label_chip_flash: "Dung lượng Flash:",
    label_machine_limit: "Lượt nạp của máy này:",
    label_chip_status: "Trạng thái chip cắm vào:",
    machine_free_remaining: "Còn 1 lượt nạp miễn phí",
    machine_limit_reached: "❌ Đã hết lượt miễn phí (1/1)",
    chip_waiting: "Chờ cắm thiết bị",
    chip_ready_free: "✅ Sẵn sàng nạp (Miễn phí 1 lần)",
    chip_limit_reached: "⛔ HẾT LƯỢT MIỄN PHÍ (Nhắn Zalo để kích hoạt)",
    boot_tip: "💡 <b>Mẹo khi mạch không nhận:</b> Nhấn giữ nút <b>BOOT</b> trên bo mạch, nhấn nhả nút <b>EN (RST)</b> rồi nhả nút <b>BOOT</b> ra để vào chế độ nạp (Download Mode).",

    // Step 2: Configuration & Flash
    step2_title: "Cấu hình Firmware & Nạp",
    subtab_product: "Firmware Sản Phẩm NDZ",
    subtab_custom: "File .BIN Tự Chọn (DIY)",
    label_select_product: "Chọn phần cứng bo mạch cần nạp:",
    board_tag: "⚡ Nhận diện phần cứng tương thích",
    board_img_overlay: "🔍 Ảnh bo mạch & linh kiện",
    board_spec_title: "Bo Mạch Màn Hình 2.8\" Cảm Ứng ESP32-S3",
    board_spec_desc: "Trang bị chip <b>ESP32-S3 Dual-Core 240MHz</b> mạnh mẽ, tích hợp sẵn màn hình LCD cảm ứng 2.8 inch, micro thu âm đàm thoại và cổng cắm loa ngoài mini.",
    feat_screen_label: "Màn hình:",
    feat_screen_val: "LCD 2.8\" Cảm ứng màu",
    feat_mcu_label: "Vi xử lý:",
    feat_mcu_val: "ESP32-S3 (240MHz)",
    feat_audio_label: "Âm thanh:",
    feat_audio_val: "Mic trên bo + Jack Loa JST",
    feat_port_label: "Cổng nạp:",
    feat_port_val: "Type-C (Web Serial)",
    board_guide_callout: "💡 <b>Lưu ý khi cắm:</b> Cắm cáp Type-C vào cổng USB của bo mạch. Nhớ cắm giắc loa mini 2 dây (Đỏ/Đen) vào cổng JST trên bo để phát âm thanh trợ lý Xiaozhi.",
    label_select_version: "Phiên bản Firmware:",
    label_mode: "Chế độ cài đặt:",
    mode_clean_title: "⚡ Cài mới hoàn toàn (Clean Install)",
    mode_clean_desc: "Tự động xóa trắng bộ nhớ Flash, nạp Bootloader + Phân vùng + Ứng dụng sạch từ đầu.",
    limit_rule_title_active: "Chính Sách Nạp Miễn Phí (1 Lần / Mỗi Máy Tính):",
    limit_rule_title_locked: "Máy Tính Này Đã Sử Dụng Hết 1 Lượt Nạp Miễn Phí!",
    limit_rule_desc_active: "Hệ thống hỗ trợ <b>1 lượt nạp miễn phí</b> cho mỗi máy tính. Nếu bạn muốn kích hoạt nạp thêm thiết bị, vui lòng tham gia nhóm Zalo để được hỗ trợ: <a href=\"https://zalo.me/g/6vrtqpuympv29wyque4x\" target=\"_blank\" style=\"color: #38bdf8; font-weight: 700; text-decoration: underline;\">💬 Nhóm Zalo Kích Hoạt Nạp Thêm</a>.",
    limit_rule_desc_locked_prefix: "Máy tính này đã hoàn tất lượt nạp miễn phí",
    limit_rule_desc_locked_cta: "Nếu bạn muốn nạp thêm thiết bị, vui lòng tham gia nhóm Zalo để được kích hoạt thêm lượt:",
    zalo_join_btn: "💬 Tham Gia Nhóm Zalo Kích Hoạt Nạp Thêm",

    // Custom BIN Sub-tab
    custom_tab_desc: "Dành cho lập trình viên nạp file tự biên dịch từ Arduino IDE hoặc ESP-IDF. Nhập địa chỉ phân vùng (Offset) dạng Hex (ví dụ: 0x0000, 0x8000, 0x10000).",
    btn_add_partition: "+ Thêm file phân vùng",
    check_custom_erase: "Xóa trắng Flash trước khi nạp",

    // Checklist
    checklist_header: "Các Bước Tích Xác Nhận Bắt Buộc Trước Khi Nạp:",
    check1_title: "1. Xác nhận đã cắm mạch:",
    check1_desc: "Tôi xác nhận đã cắm bo mạch ESP32 vào cổng USB máy tính qua cáp truyền dữ liệu và đã bấm kết nối thành công.",
    check2_title: "2. Xác nhận đúng loại mạch:",
    check2_desc_before: "Tôi xác nhận bo mạch đang cầm trên tay đúng là: ",
    check2_desc_after: " (khớp với phần cứng cần nạp, tránh nạp nhầm gây hỏng mạch).",

    // Progress & Flashing Buttons
    progress_ready: "Sẵn sàng",
    progress_flashing: "Đang nạp firmware...",
    progress_success: "Nạp thành công! Đang khởi động lại chip...",
    progress_error: "Lỗi khi nạp!",
    progress_erasing: "Đang xóa toàn bộ bộ nhớ flash...",
    progress_erased: "Đã xóa trắng bộ nhớ Flash",
    btn_flash_text: "Bắt Đầu Nạp Firmware",
    btn_erase_text: "Xóa Flash",

    // Console Log
    console_title: "Nhật ký nạp (Console Log):",
    btn_copy_log: "Sao chép",
    btn_clear_log: "Xóa",
    log_ready_init: "[Hệ thống] Sẵn sàng. Vui lòng cắm cáp USB và bấm 'Chọn Cổng COM & Kết Nối'.",

    // View 2: Products & Catalog
    catalog_badge: "HỆ SINH THÁI IOT CHÍNH HÃNG NDZ",
    catalog_title: "Hệ Sinh Thái Sản Phẩm NDZ HUB",
    catalog_subtitle: "Khám phá trọn bộ <b>Thiết bị hoàn thiện</b> sẵn sàng chạy và <b>Vỏ nhựa in 3D</b> chất lượng cao.",
    filter_complete: "🤖 Sản Phẩm Hoàn Thiện (5)",
    filter_case: "🧱 Vỏ Nhựa In 3D (3)",

    // Group 1: Completed Devices
    sec_complete_title: "🤖 Sản Phẩm Hoàn Thiện (Cắm Nguồn Là Chạy)",
    sec_complete_badge: "Full Kit Lắp Sẵn",
    tag_complete: "🤖 Sản Phẩm Hoàn Thiện",

    // Robot N1 Complete
    n1_chip_badge: "ESP32 · Sẵn Hàng",
    n1_title: "ROBOT BÁNH XÍCH N1",
    n1_price: "Full Box 100%",
    n1_price_note: "/ Đầy đủ linh kiện & pin",
    n1_spec1: "Lắp sẵn 100%: Khung gầm, cụm xích tải cao su, 2 động cơ giảm tốc.",
    n1_spec2: "Mạch vi điều khiển nạp sẵn Firmware NDZ chính thức, kích hoạt sẵn.",
    n1_spec3: "Kèm khối pin sạc dung lượng cao + cáp Type-C, mở hộp là chạy.",
    btn_order_device: "💬 Tư Vấn & Mua Hàng (Zalo)",

    // Robot T1 Complete
    t1_chip_badge: "ESP32 · Bản Pro",
    t1_thumb_badge: "Ảnh thực tế Robot T1 🔍",
    t1_title: "ROBOT BÁNH XÍCH T1",
    t1_price: "Bản Pro Tải Nặng",
    t1_price_note: "/ Cảm biến & Camera",
    t1_spec1: "Khung xe bánh xích hạng nặng hợp kim gia cố chịu tải lớn.",
    t1_spec2: "Trang bị cụm quét chướng ngại vật & ngàm gắn camera FPV.",
    t1_spec3: "Mạch công suất tản nhiệt nhôm, nạp sẵn FW cân bằng lực kéo.",

    // Hub Touch Complete - COMBO CẢ BỘ
    hub_combo_chip: "ESP32-S3 · Combo Cả Bộ",
    hub_combo_thumb_badge: "Ảnh trọn bộ để bàn 🔍",
    hub_combo_title: "COMBO HUB MÀN HÌNH + ĐẾ PHÍM CƠ",
    hub_combo_price: "1.400.000 đ",
    hub_combo_price_note: "/ Trọn bộ cả 2 món (Tiết kiệm 100K)",
    hub_combo_spec1: "Trọn gói Màn hình 2.8\" cảm ứng + Đế dock phím cơ macro 3 switch + Núm xoay.",
    hub_combo_spec2: "Núm xoay vô cực kim loại chỉnh âm lượng mượt mà, LED RGB gầm phát sáng đổi màu.",
    hub_combo_spec3: "Nạp sẵn hệ điều hành NDZ Touch OS, cắm cáp Type-C là dùng ngay.",

    // Hub Touch Complete - MÀN HÌNH LẺ
    hub_screen_only_chip: "ESP32-S3 · Màn Hình Lẻ",
    hub_screen_only_thumb_badge: "Ảnh màn hình lẻ để bàn 🔍",
    hub_screen_only_title: "HUB MÀN HÌNH CẢM ỨNG (MÀN HÌNH LẺ)",
    hub_screen_only_price: "1.000.000 đ",
    hub_screen_only_price_note: "/ Chỉ Màn hình + Vỏ hoàn thiện",
    hub_screen_only_spec1: "Màn hình màu cảm ứng 2.8\" đa điểm sắc nét, kèm loa ngoài và mic thu âm.",
    hub_screen_only_spec2: "Vỏ bảo vệ in 3D công thái học viền cam đen, chân cao su chống trượt trên bàn.",
    hub_screen_only_spec3: "Cổng Type-C cấp nguồn độc lập, chạy đầy đủ 12 ứng dụng và trợ lý Xiaozhi AI.",

    // Hub Touch Complete - ĐẾ LẺ
    hub_dock_only_chip: "Phím Cơ · Núm Xoay RGB",
    hub_dock_only_thumb_badge: "Cận cảnh dock phím cơ 🔍",
    hub_dock_only_title: "ĐẾ DOCK PHÍM CƠ MACRO (ĐẾ LẺ)",
    hub_dock_only_price: "500.000 đ",
    hub_dock_only_price_note: "/ Đế dock phím cơ + LED RGB",
    hub_dock_only_spec1: "Đế dock 3 phím cơ switch cao cấp gõ nảy, kèm núm xoay kim loại đa năng.",
    hub_dock_only_spec2: "Dải đèn LED RGB phát sáng gầm bàn đổi màu theo hiệu ứng hiện đại.",
    hub_dock_only_spec3: "Rãnh ngàm thiết kế vừa khít để cắm nâng giữ màn hình Hub 2.8\" góc nghiêng chuẩn.",

    // Hub Touch Complete (Legacy / General)
    hub_chip_badge: "ESP32-S3 · Để Bàn",
    hub_thumb_badge: "Ảnh góc Setup bàn làm việc 🔍",
    hub_title: "HUB MÀN HÌNH CẢM ỨNG",
    hub_price: "Full Box Để Bàn",
    hub_price_note: "/ Cắm nguồn dùng ngay",
    hub_spec1: "Màn hình màu cảm ứng đa điểm sắc nét, độ phản hồi cực nhanh.",
    hub_spec2: "Vỏ hộp để bàn góc nghiêng thẩm mỹ, chân đế cao su chống trượt.",
    hub_spec3: "Nạp sẵn hệ điều hành NDZ Touch OS, kết nối WiFi / BLE tức thì.",

    // Group 2: 3D Printed Enclosures
    sec_case_title: "🧱 Vỏ Nhựa In 3D (Dành Cho Anh Em DIY & Sửa Chữa)",
    sec_case_badge: "In 3D / File STL",
    tag_case: "🧱 Vỏ Nhựa In 3D",
    btn_order_case: "📦 Đặt In Nhựa / Tải File STL",

    // Robot N1 Case
    n1_case_title: "VỎ NHỰA ROBOT N1",
    n1_case_price: "Đặt In / File STL",
    n1_case_price_note: "/ Nhiều tùy chọn màu",
    n1_case_spec1: "Trọn bộ chi tiết: Khung thân, ngàm motor, bánh gai xích & nắp chụp.",
    n1_case_spec2: "In công nghệ FDM độ phân giải cao 0.16mm, infill dày dặn chống gãy.",
    n1_case_spec3: "Chuẩn xác từng lỗ ốc M3, khớp khít hoàn hảo bo mạch ESP32.",

    // Robot T1 Case
    t1_case_title: "VỎ NHỰA ROBOT T1",
    t1_case_thumb_badge: "Ảnh khung vỏ Robot T1 🔍",
    t1_case_price: "Đặt In / File STL",
    t1_case_price_note: "/ Chống va đập",
    t1_case_spec1: "Khung xe chịu lực cấu trúc tổ ong, chống biến dạng khi leo trèo.",
    t1_case_spec2: "Có sẵn khe luồn dây cáp nguồn và ngàm kẹp cảm biến khoảng cách.",
    t1_case_spec3: "Cung cấp file 3D STL gốc hoặc nhận in thành phẩm giao tận nhà.",

    // Hub Case
    hub_case_title: "VỎ HUB CẢM ỨNG",
    hub_case_thumb_badge: "Case viền cam + Dock phím cơ 🔍",
    hub_case_price: "Đặt In / File STL",
    hub_case_price_note: "/ Để bàn công thái học",
    hub_case_spec1: "Góc nghiêng 60 độ công thái học cho góc nhìn màn hình rõ nét nhất.",
    hub_case_spec2: "Khoét chuẩn cổng sạc Type-C, khe thẻ nhớ và nút bấm cạnh hông.",
    hub_case_spec3: "Khớp ngàm bấm không cần keo dán, tháo lắp cực kỳ dễ dàng.",

    // Trust Banner
    trust1_title: "Bản Quyền Theo MAC",
    trust1_desc: "Mỗi key gắn chặt với chip phần cứng của bạn, an toàn tuyệt đối và vĩnh viễn.",
    trust2_title: "Cập Nhật Trực Tuyến",
    trust2_desc: "Dễ dàng nạp các bản cập nhật mới nhất từ NDZ HUB chỉ với 1 cú click chuột.",
    trust3_title: "Hỗ Trợ Kỹ Thuật Zalo",
    trust3_desc: "Hỗ trợ cấu hình từ xa qua Ultraview/AnyDesk khi gặp khó khăn phần cứng.",

    // View 3: Serial Monitor
    btn_monitor_start: "Bắt đầu đọc Serial",
    btn_monitor_stop: "Dừng đọc Serial",
    btn_monitor_clear: "Xóa màn hình",
    monitor_sub_desc: "Đọc dữ liệu debug thời gian thực từ chip ESP32",
    monitor_screen_init: "[Serial Monitor] Sẵn sàng. Vui lòng kết nối cổng COM ở tab 'Nạp Firmware' trước khi bắt đầu đọc log.",
    input_monitor_placeholder: "Nhập chuỗi lệnh AT hoặc ký tự gửi xuống ESP32...",
    btn_monitor_send: "Gửi (Send)",

    // View 4: Guide & Drivers
    guide1_title: "1. Cài đặt Driver USB Serial",
    guide1_desc: "Hầu hết bo mạch ESP32 giao tiếp với máy tính qua chip nạp UART **CH340** hoặc **CP2102**. Nếu bấm \"Chọn Cổng COM\" mà danh sách trống:",
    guide1_ch340_title: "Driver CH340 / CH341 (Phổ biến nhất)",
    guide1_ch340_sub: "Dành cho hầu hết các kit ESP32 giá rẻ, NodeMCU",
    guide1_cp210_title: "Driver Silicon Labs CP210x",
    guide1_cp210_sub: "Dành cho ESP32 DevKit chính hãng, Doit",
    btn_download_driver: "Tải Driver",

    guide2_title: "2. Mẹo Nhấn Nút BOOT & EN",
    guide2_desc: "Một số bo mạch không có mạch tự động kích hoạt Download Mode (DTR/RTS). Khi gặp thông báo lỗi kết nối hoặc Timeout:",
    guide2_step1: "Dùng ngón tay <b>nhấn và giữ nút BOOT</b> (hoặc IO0) trên bo mạch.",
    guide2_step2: "Nhấn nhanh rồi nhả nút <b>EN (hoặc RST)</b>.",
    guide2_step3: "Thả ngón tay khỏi nút <b>BOOT</b>.",
    guide2_step4: "Bấm lại nút <b>\"Chọn Cổng COM & Kết Nối\"</b> trên trang web.",

    guide3_title: "3. Lưu ý về Cáp USB",
    guide3_p1: "Rất nhiều loại cáp điện thoại giá rẻ chỉ có 2 dây truyền điện (chỉ dùng sạc pin), <b>hoàn toàn không có 2 dây truyền dữ liệu (D+ và D-)</b>.",
    guide3_p2: "Vui lòng đảm bảo bạn sử dụng cáp dữ liệu (Data Cable) chất lượng tốt, cắm trực tiếp vào cổng USB sau máy tính (tránh cắm qua Hub nối dài giá rẻ).",

    guide4_title: "4. Quy Trình Nạp & Các Bước Tích Xác Nhận",
    guide4_desc: "Quy trình các bước nạp an toàn của NDZ HUB:",
    guide4_step1: "<b>Cắm & Kết nối:</b> Cắm bo mạch ESP32 vào máy tính qua cáp dữ liệu và bấm <b>\"Chọn Cổng COM & Kết Nối\"</b>.",
    guide4_step2: "<b>Tích xác nhận 1:</b> Tích vào ô xác nhận đã cắm bo mạch chắc chắn vào máy tính.",
    guide4_step3: "<b>Tích xác nhận 2:</b> Chọn đúng sản phẩm (Robot N1, T1 hoặc Hub Cảm Ứng) và tích xác nhận đúng loại mạch bạn đang cầm trên tay.",
    guide4_step4: "<b>Bắt đầu nạp:</b> Khi hoàn tất đủ 2 tích xác nhận an toàn, nút <b>\"Bắt Đầu Nạp Firmware\"</b> sẽ sáng lên để bạn nạp miễn phí (1 lần cho mỗi máy tính, muốn nạp thêm liên hệ nhóm Zalo kích hoạt).",

    // Modals
    modal_driver_title: "Hướng Dẫn Cài Driver & Kết Nối",
    modal_driver_h1: "1. Máy tính không nhận cổng COM?",
    modal_driver_p1: "Hầu hết các mạch ESP32 sử dụng chip nạp UART USB CH340 hoặc CP2102. Nếu bấm kết nối mà không thấy cổng nào xuất hiện:",
    modal_driver_link_ch340: "Tải Driver CH340 / CH341 (Windows)",
    modal_driver_link_cp210: "Tải Driver CP210x (Windows / macOS)",
    modal_driver_h2: "2. Cáp USB sạc hay cáp dữ liệu?",
    modal_driver_p2: "Rất nhiều loại cáp điện thoại giá rẻ chỉ có 2 dây nguồn để sạc, không có 2 dây truyền dữ liệu (D+/D-). Vui lòng đổi sang cáp truyền dữ liệu tốt.",
    modal_driver_h3: "3. Lỗi Timeout / Không vào được Bootloader",
    modal_driver_p3: "Nếu gặp lỗi <i>\"Failed to connect to ESP32: Timed out waiting for packet header\"</i>:",

    modal_order_title: "Tư Vấn & Đặt Hàng NDZ HUB",
    modal_order_sub: "Sản Phẩm Hoàn Thiện · Vỏ Nhựa In 3D · Hỗ Trợ Kỹ Thuật",
    modal_order_contact_title: "📞 Liên Hệ Đặt Hàng Trực Tiếp:",
    modal_order_contact_desc: "Để đặt mua sản phẩm hoàn thiện, nhận file STL hoặc đặt in 3D theo màu yêu cầu, vui lòng liên hệ ngay đội ngũ NDZ:",
    modal_order_li1: "💬 <b>Nhóm Zalo hỗ trợ:</b> Giải đáp kỹ thuật & báo giá nhanh nhất.",
    modal_order_li2: "🚀 <b>Giao hàng toàn quốc:</b> Nhận hàng kiểm tra chạy thử mới thanh toán.",
    modal_order_li3: "🛡️ <b>Bảo hành phần cứng:</b> Hỗ trợ kỹ thuật 1 - 1 qua Zalo/Ultraview.",
    btn_order_zalo: "Nhắn Tin Tư Vấn Qua Nhóm Zalo",
    btn_order_close: "Đóng cửa sổ",

    modal_lightbox_caption: "Ảnh Sản Phẩm Thực Tế",

    // Hub 2.8" Modal
    btn_view_hub_details: "🔍 Xem Bảng Mô Tả & Hình Ảnh",
    hub_modal_title: "HUB MÀN HÌNH CẢM ỨNG 2.8 INCH (XIAOZHI AI)",
    hub_modal_chip: "ESP32-S3 · MÀN HÌNH MÀU CẢM ỨNG 2.8\" · GIAO DIỆN ĐỒ HỌA LVGL V8",
    hub_modal_hw_title: "Bảng Thông Số Phần Cứng Chi Tiết",
    hub_modal_features_title: "Tất Cả Ứng Dụng & Tính Năng Tích Hợp Sẵn",
    hub_modal_btn_flash: "⚡ Chuyển Sang Nạp Firmware Trực Tiếp",
    hub_modal_btn_zalo: "💬 Nhắn Tin Tư Vấn & Mua Hàng (Zalo)",
    hub_thumb_1: "Ảnh Setup Bàn",
    hub_thumb_standalone: "Màn Hình Lẻ",
    hub_thumb_2: "Cận Cảnh Thiết Bị",
    hub_thumb_3: "Bo Mạch & Phụ Kiện",
    hub_caption_1: "Góc Setup Bàn Làm Việc (Vỏ Cam Đen)",
    hub_caption_standalone: "Cận Cảnh Màn Hình Lẻ Đặt Trên Bàn Làm Việc (Vỏ Cam Đen)",
    hub_caption_2: "Cận Cảnh Màn Hình & Phím Cơ Bàn Phím",
    hub_caption_3: "Mạch ESP32-S3 2.8 Inch Cảm Ứng, Loa, Mic & Cáp",

    // Packages & Pricing
    hub_modal_pricing_title: "Bảng Báo Giá & Tùy Chọn Mua Hàng",
    hub_pkg_screen_title: "Màn Hình Lẻ (Không Kèm Đế)",
    hub_pkg_screen_price: "1.000.000 đ",
    hub_pkg_screen_desc: "Màn hình 2.8\" cảm ứng + Vỏ hoàn thiện + Loa & Mic (cắm nguồn Type-C là chạy ngay, không kèm đế).",
    hub_pkg_screen_btn: "💬 Đặt Mua Màn Hình Lẻ (1.000.000 đ)",
    hub_pkg_dock_title: "Đế Phím Cơ Macro (Đế Lẻ)",
    hub_pkg_dock_price: "500.000 đ",
    hub_pkg_dock_desc: "Đế dock 3 phím switch cơ + Núm xoay kim loại đa năng + Dải đèn LED RGB gầm hiện đại.",
    hub_pkg_dock_btn: "💬 Đặt Mua Đế Phím Cơ Lẻ (500.000 đ)",
    hub_pkg_combo_title: "⭐ Combo Cả Bộ (Màn Hình + Đế)",
    hub_pkg_combo_badge: "BÁN CHẠY NHẤT · TIẾT KIỆM 100K",
    hub_pkg_combo_price: "1.400.000 đ",
    hub_pkg_combo_desc: "Trọn bộ Cả Màn Hình 2.8\" Cảm Ứng + Đế Dock Phím Cơ Macro (Tiết kiệm 100.000 đ so với mua lẻ).",
    hub_pkg_combo_btn: "💬 Đặt Mua Combo Cả Bộ (1.400.000 đ)",

    hub_spec_mcu_name: "Vi điều khiển (MCU)",
    hub_spec_mcu_val: "<strong>ESP32-S3 Dual-Core Xtensa LX7</strong> xung nhịp cao đến 240MHz",
    hub_spec_mem_name: "Bộ nhớ (Memory)",
    hub_spec_mem_val: "<strong>16MB Flash ROM</strong> + <strong>8MB Octal PSRAM</strong> (xử lý đa nhiệm mượt mà, lưu trữ nhiều hình nền)",
    hub_spec_screen_name: "Màn hình hiển thị",
    hub_spec_screen_val: "Màn hình màu TFT LCD <strong>2.8 inch</strong>, độ phân giải <strong>240x320 pixels</strong>, màu sắc rực rỡ",
    hub_spec_touch_name: "Cảm ứng (Touch)",
    hub_spec_touch_val: "Cảm ứng độ nhạy cao, thao tác chạm vuốt mượt mà, hỗ trợ cử chỉ",
    hub_spec_audio_name: "Âm thanh & Voice AI",
    hub_spec_audio_val: "Tích hợp sẵn <strong>Microphone</strong> thu âm nhạy + Cổng kết nối kèm <strong>Loa ngoài công suất lớn</strong>",
    hub_spec_conn_name: "Kết nối không dây",
    hub_spec_conn_val: "Wi-Fi 802.11 b/g/n (2.4GHz) + Bluetooth 5.0 (BLE)",
    hub_spec_port_name: "Cổng kết nối & Nguồn",
    hub_spec_port_val: "Cổng Type-C cấp nguồn 5V DC, hỗ trợ nạp Firmware trực tuyến qua trình duyệt Web Serial",
    hub_spec_ui_name: "Giao diện đồ họa",
    hub_spec_ui_val: "Nền tảng <strong>LVGL v8</strong> tối ưu hóa phần cứng, hiệu ứng mượt mà và chuyển cảnh nhanh",

    hub_feat_standby_title: "4 Giao Diện Đồng Hồ Standby",
    hub_feat_standby_desc: "Nhiều kiểu mặt đồng hồ kỹ thuật số và hiện đại, tự đồng bộ giờ qua NTP Internet chính xác từng giây.",
    hub_feat_quick_title: "Quick Settings Menu",
    hub_feat_quick_desc: "Bảng cài đặt nhanh: chỉnh độ sáng màn hình, âm lượng loa, quét và kết nối WiFi tức thì.",
    hub_feat_mp3_title: "Zing MP3 Online Player",
    hub_feat_mp3_desc: "Phát nhạc trực tuyến qua Zing MP3, duyệt BXH Top ca khúc, tìm kiếm và phát trực tiếp qua loa tích hợp.",
    hub_feat_ai_title: "Trợ Lý Giọng Nói Xiaozhi AI",
    hub_feat_ai_desc: "Biểu cảm khuôn mặt chuyển động linh hoạt sống động, trò chuyện hỏi đáp trực tiếp bằng giọng nói Tiếng Việt thông minh.",
    hub_feat_lunar_title: "Lịch Vạn Niên & Âm Lịch",
    hub_feat_lunar_desc: "Xem ngày dương, ngày âm lịch Việt Nam, giờ hoàng đạo và lịch can chi tiện dụng ngay trên bàn làm việc.",
    hub_feat_weather_title: "Dự Báo Thời Tiết Thời Gian Thực",
    hub_feat_weather_desc: "Cập nhật nhiệt độ, độ ẩm, biểu tượng thời tiết theo vị trí TP.HCM, Hà Nội hoặc tùy chỉnh theo tỉnh thành.",
    hub_feat_rates_title: "Tỷ Giá Vàng SJC & Ngoại Tệ",
    hub_feat_rates_desc: "Theo dõi biến động giá vàng SJC trong nước và các tỷ giá ngoại tệ (USD, EUR,...) trực tiếp từ máy chủ tài chính.",
    hub_feat_clock_title: "Báo Thức, Bấm Giờ & Đếm Ngược",
    hub_feat_clock_desc: "Bộ công cụ quản lý thời gian trọn vẹn: chuông báo thức, bấm giờ nhiều vòng (lap), hẹn giờ Pomodoro làm việc hiệu quả.",
    hub_feat_radio_title: "Đài FM Radio Trực Tuyến",
    hub_feat_radio_desc: "Nghe các kênh phát thanh trực tuyến chất lượng cao như VOV1, VOV2, VOV Giao Thông, VOH mượt mà qua WiFi.",
    hub_feat_calc_title: "Máy Tính Bỏ Túi Cảm Ứng",
    hub_feat_calc_desc: "Giao diện máy tính điện tử tiện dụng với đầy đủ các phép tính cơ bản phục vụ tính toán nhanh trên bàn làm việc.",
    hub_feat_wallpapers_title: "Bộ Sưu Tập Hình Nền Đa Dạng",
    hub_feat_wallpapers_desc: "Tùy chọn chuyển đổi nhiều ảnh nền phong cách thể thao, siêu xe, cyberpunk hoặc tải ảnh nền yêu thích lên.",
    hub_feat_web_title: "Web Server Nội Bộ & Cập Nhật OTA",
    hub_feat_web_desc: "Truy cập giao diện Web trên máy tính hoặc điện thoại cùng mạng WiFi để cài đặt, tải hình nền và cập nhật phần mềm.",

    // Admin & Pro Licensing
    btn_admin_portal: "Admin",
    btn_open_activate_pro: "🔑 Nhập Mã Kích Hoạt PRO / Thêm Lượt",
    label_your_machine_id: "Mã máy của bạn:",
    btn_copy_machine_id: "Sao chép",
    machine_copied_toast: "Đã sao chép mã máy tính!",
    code_copied_toast: "Đã sao chép mã kích hoạt!",
    limit_rule_pro_active: "BẢN QUYỀN PRO ĐÃ KÍCH HOẠT: Bạn có quyền nạp Firmware không giới hạn số lần trên máy tính này!",
    machine_pro_unlimited: "⭐ BẢN QUYỀN PRO: NẠP VÔ HẠN",
    machine_bonus_remaining: "Còn {N} lượt nạp khả dụng",

    modal_activate_title: "KÍCH HOẠT BẢN QUYỀN PRO NDZ HUB",
    modal_activate_subtitle: "Mở khóa nạp Firmware không giới hạn hoặc nạp thêm thiết bị",
    modal_activate_machine_note: "Mã máy tính của bạn (Gửi mã này cho Admin nếu cần kích hoạt):",
    label_license_input: "Nhập Mã Kích Hoạt (License Code):",
    placeholder_license_input: "Ví dụ: NDZ-PRO-... hoặc NDZ-PLUS5-...",
    btn_confirm_activate: "Xác Nhận Kích Hoạt Ngay",
    modal_activate_zalo_note: "Chưa có mã? Tham gia ngay nhóm Zalo hỗ trợ để được Admin kích hoạt:",

    modal_admin_title: "BẢNG ĐIỀU KHIỂN QUẢN TRỊ VIÊN (ADMIN PORTAL)",
    modal_admin_subtitle: "Khu vực Quản trị & Kích hoạt bản quyền PRO cho khách hàng",
    admin_login_title: "Xác Thực Quản Trị Viên",
    admin_login_desc: "Vui lòng nhập mật khẩu Quản Trị Viên để tiếp tục:",
    placeholder_admin_pass: "Nhập mật khẩu Admin...",
    btn_admin_login: "Đăng Nhập Quản Trị",
    admin_wrong_pass: "Mật khẩu không chính xác! Vui lòng thử lại.",
    admin_status_logged_in: "🟢 ĐÃ ĐĂNG NHẬP ADMIN (TOÀN QUYỀN HỆ THỐNG)",
    admin_sec_flash_title: "1. Quyền Nạp Trực Tiếp Của Admin Trên Máy Này",
    admin_mode_unlimited_label: "Chế độ Admin: Nạp Vô Hạn Lượt (Bypass mọi giới hạn)",
    btn_reset_machine_label: "🔄 Đặt Lại (Reset) Lượt Nạp Máy Này Về 0",
    admin_sec_license_title: "2. Cấp Quyền & Kích Hoạt Cho Các Bạn Khác",
    admin_gen_desc: "Tạo mã kích hoạt bản quyền để gửi cho khách hàng qua nhóm Zalo:",
    btn_gen_pro: "✨ Tạo Mã PRO Vĩnh Viễn",
    btn_gen_plus5: "➕ Tạo Mã Thêm 5 Lượt",
    btn_gen_plus10: "➕ Tạo Mã Thêm 10 Lượt",
    admin_custom_code_label: "Hoặc tự đặt mã kích hoạt tùy ý:",
    placeholder_custom_code: "Nhập mã tùy chỉnh (VD: KHACHVIP88)...",
    btn_add_custom_code: "Tạo Mã Này",
    admin_codes_list_title: "Danh Sách Mã Kích Hoạt Đã Tạo:",
    th_code: "Mã Kích Hoạt",
    th_type: "Loại Quyền",
    th_created: "Thời Gian",
    th_action: "Thao Tác",
    btn_copy_code: "Sao chép",
    btn_delete_code: "Xóa",
    admin_sec_unlock_direct: "3. Mở Khóa Trực Tiếp Theo Mã Máy Của Khách (Machine ID)",
    placeholder_unlock_machine: "Dán Mã Máy của khách (VD: NDZ-MC-XXXX-XXXX)...",
    btn_unlock_machine_pro: "🔓 Kích Hoạt PRO Cho Mã Máy Này",
    btn_admin_logout: "Đăng Xuất Admin",

    // Footer
    footer_text: "© 2026 NDZ HUB · Nền Tảng Nạp Firmware ESP32 Trực Tuyến & Hệ Sinh Thái Phần Cứng Thông Minh."
  },

  en: {
    // Document
    doc_title: "NDZ HUB · Online ESP32 Firmware Flasher",
    meta_desc: "Flash firmware for ESP32, ESP32-S3, ESP32-C3 directly in your web browser via Web Serial. Official NDZ HUB hardware ecosystem.",

    // Header
    brand_subtitle: "Online ESP32 Firmware Flashing & Smart IoT Platform",
    btn_driver_guide: "Driver & Help",
    btn_zalo_support: "Zalo Support Group",

    // Main Top Navigation
    nav_flasher: "Flash Firmware",
    nav_products: "Products & Hardware",
    nav_monitor: "Serial Monitor",
    nav_guide: "Guide & Drivers",

    // Bottom Dock
    dock_home: "Home",
    dock_products: "Products",
    dock_monitor: "Monitor",
    dock_guide: "Guide",

    // Browser Support
    browser_alert_text: "Your current browser does not support the <b>Web Serial API</b>. Please open this page in <b>Google Chrome</b>, <b>Microsoft Edge</b>, or <b>Opera</b> on a desktop computer to flash firmware.",

    // View 1: Flasher Intro
    hero_title: "Flash Firmware Directly in Your Browser",
    hero_desc: "Connect your ESP32/ESP32-S3/ESP32-C3 via USB cable, select COM port, and flash firmware in seconds with zero software installation.",
    hero_badge_webserial: "⚡ Web Serial API",
    hero_badge_esptool: "🛡️ esptool-js 5.6",
    hero_badge_speed: "🚀 Baud 921600",

    // Step 1: Hardware Connection
    step1_title: "Connect Device",
    label_baud: "Flashing Baud Rate:",
    baud_921600: "921600 (Ultra High-Speed - Recommended)",
    baud_460800: "460800 (Fast & Reliable)",
    baud_115200: "115200 (Standard - Noise Resistant)",
    btn_connect_idle: "Select COM Port & Connect",
    btn_connect_connected: "Disconnect",
    chip_status_unplugged: "No device connected",
    chip_status_syncing: "Syncing bootloader...",
    chip_status_connected: "Connected successfully",
    chip_status_failed: "Connection failed",
    label_chip_type: "Microcontroller Chip:",
    label_chip_mac: "MAC Address (Chip ID):",
    label_chip_flash: "Flash Memory Size:",
    label_machine_limit: "Allowance for this PC:",
    label_chip_status: "Target chip status:",
    machine_free_remaining: "1 free flash remaining",
    machine_limit_reached: "❌ Free flash limit reached (1/1)",
    chip_waiting: "Waiting for device connection",
    chip_ready_free: "✅ Ready to flash (1-time free)",
    chip_limit_reached: "⛔ FREE LIMIT REACHED (Contact Zalo to unlock)",
    boot_tip: "💡 <b>Tip if device not detected:</b> Press & hold the <b>BOOT</b> button, press & release <b>EN (RST)</b>, then release <b>BOOT</b> to enter Download Mode.",

    // Step 2: Configuration & Flash
    step2_title: "Firmware Configuration & Flashing",
    subtab_product: "NDZ Official Firmware",
    subtab_custom: "Custom .BIN File (DIY)",
    label_select_product: "Select target hardware board:",
    board_tag: "⚡ Target Hardware Identification",
    board_img_overlay: "🔍 Board & Components Photo",
    board_spec_title: "ESP32-S3 2.8\" Touch Screen Board",
    board_spec_desc: "Equipped with powerful <b>ESP32-S3 Dual-Core 240MHz</b>, onboard 2.8-inch color touch LCD, conversation mic, and external mini speaker port.",
    feat_screen_label: "Display:",
    feat_screen_val: "2.8\" Color Touch LCD",
    feat_mcu_label: "Processor:",
    feat_mcu_val: "ESP32-S3 (240MHz)",
    feat_audio_label: "Audio:",
    feat_audio_val: "Onboard Mic + JST Speaker Jack",
    feat_port_label: "Flash Port:",
    feat_port_val: "Type-C (Web Serial)",
    board_guide_callout: "💡 <b>Connection note:</b> Connect Type-C cable to board USB port. Plug the 2-wire mini speaker (Red/Black) into onboard JST port for Xiaozhi AI audio output.",
    label_select_version: "Firmware Version:",
    label_mode: "Installation Mode:",
    mode_clean_title: "⚡ Clean Install (Erase & Write)",
    mode_clean_desc: "Automatically erases Flash memory, writes clean Bootloader + Partition table + Application.",
    limit_rule_title_active: "Free Flashing Policy (1 Time / Per Computer):",
    limit_rule_title_locked: "This Computer Has Used Its 1 Free Flash!",
    limit_rule_desc_active: "The system provides <b>1 free flash</b> per computer. If you want to activate additional devices, please join our Zalo support group: <a href=\"https://zalo.me/g/6vrtqpuympv29wyque4x\" target=\"_blank\" style=\"color: #38bdf8; font-weight: 700; text-decoration: underline;\">💬 Zalo Group for Extra Activations</a>.",
    limit_rule_desc_locked_prefix: "This computer has completed its free flash",
    limit_rule_desc_locked_cta: "If you want to flash more devices, please join our Zalo group for activation:",
    zalo_join_btn: "💬 Join Zalo Group for Extra Activations",

    // Custom BIN Sub-tab
    custom_tab_desc: "For developers flashing custom binaries compiled from Arduino IDE or ESP-IDF. Enter partition offset in Hex (e.g. 0x0000, 0x8000, 0x10000).",
    btn_add_partition: "+ Add partition file",
    check_custom_erase: "Erase entire flash before flashing",

    // Checklist
    checklist_header: "Mandatory Safety Checklist Before Flashing:",
    check1_title: "1. Confirm board is connected:",
    check1_desc: "I confirm the ESP32 board is plugged into the PC via a data cable and connected successfully.",
    check2_title: "2. Confirm correct board type:",
    check2_desc_before: "I confirm the board in my hand is indeed: ",
    check2_desc_after: " (matching target firmware to avoid bricking).",

    // Progress & Flashing Buttons
    progress_ready: "Ready",
    progress_flashing: "Flashing firmware...",
    progress_success: "Flashed successfully! Rebooting chip...",
    progress_error: "Error while flashing!",
    progress_erasing: "Erasing entire flash memory...",
    progress_erased: "Flash memory erased successfully",
    btn_flash_text: "Start Flashing Firmware",
    btn_erase_text: "Erase Flash",

    // Console Log
    console_title: "Console Log:",
    btn_copy_log: "Copy",
    btn_clear_log: "Clear",
    log_ready_init: "[System] Ready. Please plug in USB cable and click 'Select COM Port & Connect'.",

    // View 2: Products & Catalog
    catalog_badge: "OFFICIAL NDZ IOT ECOSYSTEM",
    catalog_title: "NDZ HUB Product Ecosystem",
    catalog_subtitle: "Discover full-featured <b>Completed Devices</b> ready to run and premium <b>3D Printed Enclosures</b>.",
    filter_complete: "🤖 Completed Devices (5)",
    filter_case: "🧱 3D Printed Enclosures (3)",

    // Group 1: Completed Devices
    sec_complete_title: "🤖 Completed Devices (Plug & Play)",
    sec_complete_badge: "Fully Assembled Kit",
    tag_complete: "🤖 Completed Device",

    // Robot N1 Complete
    n1_chip_badge: "ESP32 · In Stock",
    n1_title: "TRACKED ROBOT N1",
    n1_price: "100% Full Box",
    n1_price_note: "/ Full parts & battery",
    n1_spec1: "100% pre-assembled: Chassis, rubber track system, 2 geared motors.",
    n1_spec2: "Pre-flashed official NDZ Firmware, pre-activated.",
    n1_spec3: "Includes high-capacity rechargeable battery + Type-C cable, ready out of the box.",
    btn_order_device: "💬 Order & Inquiries (Zalo)",

    // Robot T1 Complete
    t1_chip_badge: "ESP32 · Pro Version",
    t1_thumb_badge: "Real Photo Robot T1 🔍",
    t1_title: "TRACKED ROBOT T1",
    t1_price: "Pro Heavy-Duty",
    t1_price_note: "/ Sensors & Camera",
    t1_spec1: "Reinforced heavy-duty tracked chassis for high payload capacity.",
    t1_spec2: "Obstacle avoidance sensor mount & FPV camera mount included.",
    t1_spec3: "Aluminum heatsink power board, pre-flashed traction balancing FW.",

    // Hub Touch Complete - COMBO
    hub_combo_chip: "ESP32-S3 · Full Combo",
    hub_combo_thumb_badge: "Full setup desk photo 🔍",
    hub_combo_title: "COMBO TOUCH SCREEN + MACRO DOCK",
    hub_combo_price: "1,400,000 VND",
    hub_combo_price_note: "/ Full bundle both items (Save 100K)",
    hub_combo_spec1: "Complete bundle: 2.8\" touch screen + 3-switch macro keypad dock + rotary knob.",
    hub_combo_spec2: "Metal infinite volume knob, underglow RGB changing light strip.",
    hub_combo_spec3: "Pre-flashed NDZ Touch OS, plug in Type-C and enjoy immediately.",

    // Hub Touch Complete - SCREEN ONLY
    hub_screen_only_chip: "ESP32-S3 · Screen Only",
    hub_screen_only_thumb_badge: "Standalone screen desk photo 🔍",
    hub_screen_only_title: "2.8\" SMART TOUCH HUB (SCREEN ONLY)",
    hub_screen_only_price: "1,000,000 VND",
    hub_screen_only_price_note: "/ Screen + Enclosure only",
    hub_screen_only_spec1: "2.8\" TFT LCD vibrant touch screen, built-in speaker and voice AI mic.",
    hub_screen_only_spec2: "Stylish orange & black enclosure with anti-slip rubber pads on desk.",
    hub_screen_only_spec3: "Independent Type-C power input, runs all 12 smart applications.",

    // Hub Touch Complete - DOCK ONLY
    hub_dock_only_chip: "Keypad · RGB Knob",
    hub_dock_only_thumb_badge: "Macro dock close-up 🔍",
    hub_dock_only_title: "MECHANICAL MACRO DOCK (BASE ONLY)",
    hub_dock_only_price: "500,000 VND",
    hub_dock_only_price_note: "/ Keypad dock base only",
    hub_dock_only_spec1: "3-key mechanical macro dock with smooth switches and metallic rotary knob.",
    hub_dock_only_spec2: "Ambient underglow RGB LED effects glowing under your setup.",
    hub_dock_only_spec3: "Precision slot specifically designed to dock and hold the 2.8\" Hub Screen.",

    // Hub Touch Complete (Legacy / General)
    hub_chip_badge: "ESP32-S3 · Desktop",
    hub_thumb_badge: "Desktop Setup Photo 🔍",
    hub_title: "TOUCH SCREEN SMART HUB",
    hub_price: "Desktop Full Box",
    hub_price_note: "/ Plug & Play",
    hub_spec1: "Vibrant multi-touch color display, ultra-fast responsiveness.",
    hub_spec2: "Aesthetic desktop angled enclosure, anti-slip rubber pads.",
    hub_spec3: "Pre-installed NDZ Touch OS, instant WiFi / BLE connectivity.",

    // Group 2: 3D Printed Enclosures
    sec_case_title: "🧱 3D Printed Enclosures (For DIY & Makers)",
    sec_case_badge: "3D Print / STL Files",
    tag_case: "🧱 3D Printed Enclosure",
    btn_order_case: "📦 Order 3D Print / Download STL",

    // Robot N1 Case
    n1_case_title: "ROBOT N1 ENCLOSURE",
    n1_case_price: "Print On Demand / STL",
    n1_case_price_note: "/ Multiple color options",
    n1_case_spec1: "Complete parts: Main body frame, motor brackets, sprockets & top cover.",
    n1_case_spec2: "High-resolution 0.16mm FDM printing, dense infill against breakage.",
    n1_case_spec3: "Precise M3 screw holes, perfectly fits ESP32 boards.",

    // Robot T1 Case
    t1_case_title: "ROBOT T1 ENCLOSURE",
    t1_case_thumb_badge: "Robot T1 Frame Photo 🔍",
    t1_case_price: "Print On Demand / STL",
    t1_case_price_note: "/ Impact resistant",
    t1_case_spec1: "Honeycomb reinforced structure, prevents deformation under heavy load.",
    t1_case_spec2: "Pre-routed cable channels and distance sensor clip mount.",
    t1_case_spec3: "Original 3D STL download or custom print shipped to your door.",

    // Hub Case
    hub_case_title: "TOUCH HUB ENCLOSURE",
    hub_case_thumb_badge: "Orange Bezel Case + Macropad Dock 🔍",
    hub_case_price: "Print On Demand / STL",
    hub_case_price_note: "/ Ergonomic desktop",
    hub_case_spec1: "Ergonomic 60-degree viewing angle for optimal screen readability.",
    hub_case_spec2: "Precise cutouts for Type-C port, TF card slot, and side buttons.",
    hub_case_spec3: "Snap-fit joints without glue, effortless assembly and maintenance.",

    // Trust Banner
    trust1_title: "MAC-Locked License",
    trust1_desc: "Each key is permanently tied to your hardware chip, secure and lasting.",
    trust2_title: "Web Firmware Updates",
    trust2_desc: "Easily flash the newest releases from NDZ HUB with a single click.",
    trust3_title: "Direct Technical Support",
    trust3_desc: "Remote setup assistance via Ultraview/AnyDesk for hardware issues.",

    // View 3: Serial Monitor
    btn_monitor_start: "Start Reading Serial",
    btn_monitor_stop: "Stop Reading Serial",
    btn_monitor_clear: "Clear Screen",
    monitor_sub_desc: "Real-time debug output from ESP32 chip",
    monitor_screen_init: "[Serial Monitor] Ready. Please connect COM port in 'Flash Firmware' tab before reading logs.",
    input_monitor_placeholder: "Enter AT command or characters to send to ESP32...",
    btn_monitor_send: "Send",

    // View 4: Guide & Drivers
    guide1_title: "1. Install USB Serial Driver",
    guide1_desc: "Most ESP32 boards communicate with PC via UART chip **CH340** or **CP2102**. If clicking \"Select COM Port\" shows an empty list:",
    guide1_ch340_title: "Driver CH340 / CH341 (Most Common)",
    guide1_ch340_sub: "For most affordable ESP32 kits and NodeMCU",
    guide1_cp210_title: "Driver Silicon Labs CP210x",
    guide1_cp210_sub: "For official ESP32 DevKit, Doit boards",
    btn_download_driver: "Download Driver",

    guide2_title: "2. BOOT & EN Button Tip",
    guide2_desc: "Some boards lack auto-reset circuitry (DTR/RTS). If you experience connection timeout or errors:",
    guide2_step1: "Press and <b>hold the BOOT button</b> (or IO0) on the board.",
    guide2_step2: "Quickly press and release the <b>EN (or RST)</b> button.",
    guide2_step3: "Release the <b>BOOT</b> button.",
    guide2_step4: "Click <b>\"Select COM Port & Connect\"</b> again.",

    guide3_title: "3. USB Cable Notes",
    guide3_p1: "Many cheap phone cables only have 2 power wires (charging only), with <b>no data transfer wires (D+ and D-)</b>.",
    guide3_p2: "Please ensure you use a quality Data Cable plugged directly into your computer USB port (avoid cheap unpowered USB hubs).",

    guide4_title: "4. Flashing Steps & Safety Checklist",
    guide4_desc: "NDZ HUB safe flashing workflow:",
    guide4_step1: "<b>Plug & Connect:</b> Plug ESP32 into computer via data cable and click <b>\"Select COM Port & Connect\"</b>.",
    guide4_step2: "<b>Checklist Step 1:</b> Check the box confirming board is plugged in.",
    guide4_step3: "<b>Checklist Step 2:</b> Select correct product and check the box confirming your physical hardware matches.",
    guide4_step4: "<b>Start Flashing:</b> Once both safety checks are confirmed, click <b>\"Start Flashing Firmware\"</b> for free (1 free flash per PC; contact Zalo group for extra activations).",

    // Modals
    modal_driver_title: "Driver Installation & Troubleshooting",
    modal_driver_h1: "1. Computer does not detect COM port?",
    modal_driver_p1: "Most ESP32 boards use CH340 or CP2102 USB-to-UART bridge. If no port appears when connecting:",
    modal_driver_link_ch340: "Download Driver CH340 / CH341 (Windows)",
    modal_driver_link_cp210: "Download Driver CP210x (Windows / macOS)",
    modal_driver_h2: "2. Charge-only vs Data Cable?",
    modal_driver_p2: "Many cheap charging cables lack data lines (D+/D-). Please switch to a proper data cable.",
    modal_driver_h3: "3. Timeout / Bootloader Error",
    modal_driver_p3: "If you see <i>\"Failed to connect to ESP32: Timed out waiting for packet header\"</i>:",

    modal_order_title: "Inquiries & Orders NDZ HUB",
    modal_order_sub: "Completed Devices · 3D Printed Parts · Technical Support",
    modal_order_contact_title: "📞 Direct Contact & Orders:",
    modal_order_contact_desc: "To order complete devices, obtain STL files, or request custom 3D printing, please contact our NDZ team:",
    modal_order_li1: "💬 <b>Zalo Support Group:</b> Technical guidance & instant pricing.",
    modal_order_li2: "🚀 <b>Nationwide Delivery:</b> Inspect and test before payment.",
    modal_order_li3: "🛡️ <b>Hardware Warranty:</b> 1-on-1 support via Zalo/Ultraview.",
    btn_order_zalo: "Message Our Zalo Support Group",
    btn_order_close: "Close Window",

    modal_lightbox_caption: "Actual Product Photo",

    // Hub 2.8" Modal
    btn_view_hub_details: "🔍 View Specs & Image Gallery",
    hub_modal_title: "2.8\" SMART TOUCH SCREEN HUB (XIAOZHI AI)",
    hub_modal_chip: "ESP32-S3 · 2.8\" COLOR TOUCH SCREEN · LVGL V8 GUI",
    hub_modal_hw_title: "Detailed Hardware Specifications Table",
    hub_modal_features_title: "All Pre-Installed Apps & Built-in Features",
    hub_modal_btn_flash: "⚡ Go to Online Firmware Flasher",
    hub_modal_btn_zalo: "💬 Order & Inquiries via Zalo",
    hub_thumb_1: "Desk Setup Photo",
    hub_thumb_standalone: "Screen Only",
    hub_thumb_2: "Close-up Device",
    hub_thumb_3: "Board & Accessories",
    hub_caption_1: "Desktop Workspace Setup (Orange & Black Case)",
    hub_caption_standalone: "Close-up Standalone Screen on Desk (Orange & Black Case)",
    hub_caption_2: "Close-up Screen & Mechanical Macro Keypad",
    hub_caption_3: "ESP32-S3 2.8\" Touch Screen Board, Speaker, Mic & Cable",

    // Packages & Pricing
    hub_modal_pricing_title: "Pricing Packages & Purchase Options",
    hub_pkg_screen_title: "Screen Only (No Dock)",
    hub_pkg_screen_price: "1,000,000 VND",
    hub_pkg_screen_desc: "2.8\" touch screen + finished enclosure + built-in speaker & mic (plug & play via Type-C, base dock not included).",
    hub_pkg_screen_btn: "💬 Order Screen Only (1,000,000 VND)",
    hub_pkg_dock_title: "Mechanical Macro Dock (Base Only)",
    hub_pkg_dock_price: "500,000 VND",
    hub_pkg_dock_desc: "3-switch mechanical macro dock + metal rotary knob + modern underglow RGB LED effects.",
    hub_pkg_dock_btn: "💬 Order Macro Dock (500,000 VND)",
    hub_pkg_combo_title: "⭐ Full Combo (Screen + Dock)",
    hub_pkg_combo_badge: "BEST SELLER · SAVE 100K",
    hub_pkg_combo_price: "1,400,000 VND",
    hub_pkg_combo_desc: "Complete bundle: 2.8\" Touch Screen Hub + Mechanical Macro Keypad Dock (Save 100,000 VND).",
    hub_pkg_combo_btn: "💬 Order Full Combo (1,400,000 VND)",

    hub_spec_mcu_name: "Microcontroller (MCU)",
    hub_spec_mcu_val: "<strong>ESP32-S3 Dual-Core Xtensa LX7</strong> clocked up to 240MHz",
    hub_spec_mem_name: "Memory",
    hub_spec_mem_val: "<strong>16MB Flash ROM</strong> + <strong>8MB Octal PSRAM</strong> (smooth multitasking, stores custom wallpapers)",
    hub_spec_screen_name: "Display",
    hub_spec_screen_val: "<strong>2.8 inch</strong> TFT LCD Color Screen, <strong>240x320 pixels</strong> resolution, vibrant colors",
    hub_spec_touch_name: "Touchscreen",
    hub_spec_touch_val: "High-sensitivity touch panel with fluid touch, swipe and gesture recognition",
    hub_spec_audio_name: "Audio & Voice AI",
    hub_spec_audio_val: "Built-in sensitive <strong>Microphone</strong> + dedicated audio jack with <strong>high-output external speaker</strong>",
    hub_spec_conn_name: "Connectivity",
    hub_spec_conn_val: "Wi-Fi 802.11 b/g/n (2.4GHz) + Bluetooth 5.0 (BLE)",
    hub_spec_port_name: "Port & Power",
    hub_spec_port_val: "USB Type-C 5V DC power, supports direct in-browser Web Serial firmware flashing",
    hub_spec_ui_name: "GUI Framework",
    hub_spec_ui_val: "Hardware-accelerated <strong>LVGL v8</strong> for fluid animations and rapid screen transitions",

    hub_feat_standby_title: "4 Standby Clock Faces",
    hub_feat_standby_desc: "Multiple digital and modern clock faces, auto-synchronized via NTP Internet with second-level precision.",
    hub_feat_quick_title: "Quick Settings Menu",
    hub_feat_quick_desc: "Swipe down to adjust brightness, speaker volume, scan and connect to local WiFi networks instantly.",
    hub_feat_mp3_title: "Zing MP3 Online Player",
    hub_feat_mp3_desc: "Stream online songs via Zing MP3, browse Top charts, search tracks, and play directly through built-in speaker.",
    hub_feat_ai_title: "Xiaozhi AI Voice Assistant",
    hub_feat_ai_desc: "Dynamic animated facial expressions with smart real-time Vietnamese AI voice chat and Q&A.",
    hub_feat_lunar_title: "Vietnamese Lunar Calendar",
    hub_feat_lunar_desc: "Solar & lunar calendar, auspicious hours, and zodiac details conveniently displayed right on your desk.",
    hub_feat_weather_title: "Real-Time Weather Forecast",
    hub_feat_weather_desc: "Live updates of temperature, humidity, and condition icons for HCM City, Hanoi, or custom locations.",
    hub_feat_rates_title: "SJC Gold & Foreign Exchange",
    hub_feat_rates_desc: "Track real-time domestic SJC gold prices and foreign exchange currency rates (USD, EUR,...) from live feeds.",
    hub_feat_clock_title: "Alarm, Stopwatch & Timer",
    hub_feat_clock_desc: "Complete time toolkit: recurring alarms, multi-lap stopwatch, and productive Pomodoro focus timer.",
    hub_feat_radio_title: "Online FM Radio",
    hub_feat_radio_desc: "Crystal-clear online streaming of VOV1, VOV2, VOV Traffic, and VOH radio stations over WiFi.",
    hub_feat_calc_title: "Touchscreen Calculator",
    hub_feat_calc_desc: "Handy desktop touch calculator with essential math operations for quick workspace calculations.",
    hub_feat_wallpapers_title: "Custom Wallpaper Gallery",
    hub_feat_wallpapers_desc: "Easily switch between sports car, cyberpunk wallpapers, or upload personal photos via the web portal.",
    hub_feat_web_title: "Local Web Server & OTA",
    hub_feat_web_desc: "Access local web dashboard from your PC or phone browser to tweak settings, upload wallpapers, and OTA flash.",

    // Admin & Pro Licensing
    btn_admin_portal: "Admin",
    btn_open_activate_pro: "🔑 Activate PRO / Redeem Extra Flashes",
    label_your_machine_id: "Your Machine ID:",
    btn_copy_machine_id: "Copy",
    machine_copied_toast: "Machine ID copied to clipboard!",
    code_copied_toast: "License code copied to clipboard!",
    limit_rule_pro_active: "PRO LICENSE ACTIVATED: You have unlimited firmware flashing privileges on this computer!",
    machine_pro_unlimited: "⭐ PRO LICENSE: UNLIMITED",
    machine_bonus_remaining: "{N} flashes remaining",

    modal_activate_title: "ACTIVATE NDZ HUB PRO LICENSE",
    modal_activate_subtitle: "Unlock unlimited firmware flashing or add extra device flashes",
    modal_activate_machine_note: "Your Computer Machine ID (Send this to Admin if requesting direct activation):",
    label_license_input: "Enter License / Activation Code:",
    placeholder_license_input: "E.g.: NDZ-PRO-... or NDZ-PLUS5-...",
    btn_confirm_activate: "Activate Now",
    modal_activate_zalo_note: "Need a license code? Join our official Zalo group for instant activation:",

    modal_admin_title: "ADMINISTRATOR CONTROL PANEL (ADMIN PORTAL)",
    modal_admin_subtitle: "System Management & Customer PRO Licensing Dashboard",
    admin_login_title: "Administrator Authentication",
    admin_login_desc: "Please enter the Administrator password to continue:",
    placeholder_admin_pass: "Enter Admin password...",
    btn_admin_login: "Sign In as Admin",
    admin_wrong_pass: "Incorrect password! Please try again.",
    admin_status_logged_in: "🟢 LOGGED IN AS ADMIN (FULL PRIVILEGES)",
    admin_sec_flash_title: "1. Admin Direct Flashing Mode on This PC",
    admin_mode_unlimited_label: "Admin Mode: Unlimited Flashes (Bypass All Quotas)",
    btn_reset_machine_label: "🔄 Reset This PC's Flash Count to 0",
    admin_sec_license_title: "2. Generate & Grant Licenses to Users",
    admin_gen_desc: "Generate VIP activation codes to send to customers via Zalo group:",
    btn_gen_pro: "✨ Generate Lifetime PRO Code",
    btn_gen_plus5: "➕ Generate +5 Flashes Code",
    btn_gen_plus10: "➕ Generate +10 Flashes Code",
    admin_custom_code_label: "Or create a custom personalized license code:",
    placeholder_custom_code: "Enter custom code (e.g.: VIPMEMBER88)...",
    btn_add_custom_code: "Create Code",
    admin_codes_list_title: "Generated License Codes List:",
    th_code: "License Code",
    th_type: "Permission Type",
    th_created: "Created At",
    th_action: "Actions",
    btn_copy_code: "Copy",
    btn_delete_code: "Delete",
    admin_sec_unlock_direct: "3. Direct Unlock by Customer Machine ID",
    placeholder_unlock_machine: "Paste customer Machine ID (e.g.: NDZ-MC-XXXX-XXXX)...",
    btn_unlock_machine_pro: "🔓 Unlock PRO for this Machine ID",
    btn_admin_logout: "Log Out Admin",

    // Footer
    footer_text: "© 2026 NDZ HUB · Online ESP32 Firmware Flasher & Smart IoT Hardware Platform."
  }
};

const LANG_KEY = "ndz_lang_pref";
let currentLang = "vi";

export function getCurrentLang() {
  return currentLang;
}

export function t(key, fallback = "") {
  const dict = translations[currentLang] || translations.vi;
  return dict[key] !== undefined ? dict[key] : (fallback || key);
}

const listeners = [];
export function onLanguageChange(fn) {
  if (typeof fn === "function") {
    listeners.push(fn);
  }
}

export function setLanguage(lang) {
  if (lang !== "vi" && lang !== "en") lang = "vi";
  currentLang = lang;
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch (e) {}

  document.documentElement.lang = lang;
  document.title = t("doc_title");

  // Update all elements with data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (key && translations[lang][key] !== undefined) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Update attributes: placeholder, title
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (key && translations[lang][key] !== undefined) {
      el.placeholder = translations[lang][key];
    }
  });

  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    const key = el.dataset.i18nTitle;
    if (key && translations[lang][key] !== undefined) {
      el.title = translations[lang][key];
    }
  });

  // Update language switch buttons active state
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  // Notify listeners
  listeners.forEach(fn => {
    try { fn(lang); } catch (e) { console.error("i18n listener error", e); }
  });
}

export function initI18n() {
  let savedLang = "vi";
  try {
    savedLang = localStorage.getItem(LANG_KEY) || (navigator.language?.startsWith("vi") ? "vi" : "vi");
  } catch (e) {}

  // Bind clicks on language toggle buttons
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetLang = btn.dataset.lang;
      if (targetLang && targetLang !== currentLang) {
        setLanguage(targetLang);
      }
    });
  });

  setLanguage(savedLang);
}

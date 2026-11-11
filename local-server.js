/**
 * Mini Local Web Server cho ESP Web Flasher Pro
 * Chạy không cần cài đặt thêm thư viện: node server.js
 * Hỗ trợ Web Serial (chạy trên localhost) & phục vụ static files và firmware blobs.
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".bin": "application/octet-stream",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2"
};

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Demo API: Kiểm tra License Key theo MAC address
  if (req.url === "/api/license/verify" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      try {
        const data = JSON.parse(body || "{}");
        const { key, mac, productId } = data;
        
        // Logic kiểm tra bản quyền
        const isValid = key && key.length >= 6;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
          success: isValid,
          message: isValid ? "License hợp lệ" : "License không tồn tại hoặc đã hết hạn",
          mac: mac || null,
          productId: productId || null
        }));
      } catch (e) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  // Phục vụ Static Files
  let reqPath = decodeURI(req.url.split("?")[0]);
  if (reqPath === "/") reqPath = "/index.html";

  const filePath = path.join(ROOT_DIR, reqPath);

  // Bảo vệ path traversal
  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(`404 Not Found: ${reqPath}`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": stats.size,
      "Cache-Control": "no-cache"
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`⚡ ESP Web Flasher Pro Server đang chạy tại:`);
  console.log(`👉 http://localhost:${PORT}`);
  console.log(`(Lưu ý: Mở bằng Google Chrome, Edge hoặc Opera để dùng Web Serial)`);
  console.log(`====================================================`);
});

module.exports = (req, res) => {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method === "POST") {
    try {
      const { key, mac, productId } = req.body || {};
      const isValid = key && key.length >= 6;

      return res.status(200).json({
        success: isValid,
        message: isValid ? "License hợp lệ" : "License không tồn tại hoặc đã hết hạn",
        mac: mac || null,
        productId: productId || null
      });
    } catch (e) {
      return res.status(400).json({ success: false, error: e.message });
    }
  }

  return res.status(200).json({ status: "API ESP Web Flasher License Service" });
};

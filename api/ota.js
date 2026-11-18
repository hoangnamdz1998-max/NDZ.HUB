module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Device-Id, Client-Id, Activation-Version, Serial-Number");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  const now = Date.now();
  return res.status(200).json({
    server_time: {
      timestamp: now,
      timezone_offset: 0
    },
    firmware: {
      version: "2.5.8",
      url: "https://ndztech.vercel.app/firmware/xiaozhi.bin",
      force: 0
    }
  });
};

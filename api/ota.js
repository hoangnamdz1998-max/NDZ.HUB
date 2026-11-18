module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Device-Id, Client-Id, Activation-Version, Serial-Number");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  return res.status(200).json({
    firmware: {
      version: "2.5.6",
      url: "https://ndztech.vercel.app/firmware/xiaozhi.bin",
      force: 1
    }
  });
};

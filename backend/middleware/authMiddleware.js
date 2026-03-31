



const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json("Token required ❌");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json("Invalid token format ❌");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("JWT ERROR:", err);
      return res.status(401).json("Invalid token ❌");
    }

    console.log("DECODED:", decoded); // ✅ debug

    req.user = decoded;
    next(); // ✅ FIXED
  });
};
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json("Admin access required");
  next();
};
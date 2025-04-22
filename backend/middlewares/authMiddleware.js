const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "secretkey";

exports.authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ message: "Akses ditolak, token tidak tersedia" });

  try {
    const verified = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Token tidak valid" });
  }
};

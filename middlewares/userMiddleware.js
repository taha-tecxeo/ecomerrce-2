const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not logged in" });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalid or expired" });
  }
};

const isadmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied, admin only" });
  }
  next();
}
const isuser = (req, res, next) => {
  if (req.user.role !== 'user') {
    return res.status(403).json({ message: "Access denied, user only" });
  }
  next();
}
const isvendor = (req, res, next) => {
  console.log("req.user.role", req.user);

  if (req.user.role !== 'Vendor') {
    return res.status(403).json({ message: "Access denied, vendor only" });
  }
  next();
}


module.exports = { verifyToken, isadmin, isvendor,isuser };




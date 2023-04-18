import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // terdapat spasi antara Bearer dan token, diambil token pada index ke 1, jika tidak ada maka akan bernilai undefined
  if (token == null) {
    // jika token tidak ada
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.email = decoded.email; // decoded.email adalah email yang ada di dalam payload
    next(); // untuk melanjutkan ke route yang akan diakses
  });
};

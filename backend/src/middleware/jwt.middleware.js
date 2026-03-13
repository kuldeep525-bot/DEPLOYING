import jwt from "jsonwebtoken";
export const authenticate = (req, res, next) => {
  try {
    //token get it from cookies
    const token = req.cookies.jwt;

    //token is valid or not
    if (!token) {
      return res.status(401).json({ message: "Acess denied. Login required" });
    }
    //token verify
    const decode = jwt.verify(token, process.env.SecretKey);
    //attack userid from request
    req.user = decode;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

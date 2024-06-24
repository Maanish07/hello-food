import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

const secretKey = process.env.SECRET_KEY;

export const genrateToken = (user) => {
  const payLoad = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payLoad, secretKey, { expiresIn: "1h" });
};

export const genrateRefreshToken = (user) => {
  const payLoad = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payLoad, secretKey, { expiresIn: "7h" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};
import jwt from "jsonwebtoken";
import { Status } from "../utils/statusCodes.js";

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.auth_token;
    if (!token) {
      return res.status(Status.UNAUTHORIZED).json({
        success: false,
        message: "No token provided",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();

  } catch (error) {
    console.log("error in checkAuth", error.message);
    return res.status(Status.UNAUTHORIZED).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

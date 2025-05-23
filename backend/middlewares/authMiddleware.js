import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password"); // this adds a user field to req
    if (!req.user) {
      res.status(401);
      throw new Error("User not found.");
    }
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed.");
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user?.isAdmin) {
    return next();
  }

  res.status(403);
  throw new Error("Not authorized as admin.");
};

export { authenticate, authorizeAdmin };
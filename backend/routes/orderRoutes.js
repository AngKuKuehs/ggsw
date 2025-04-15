import express from "express";
const router = express.Router();

import {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
} from "../controllers/orderController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

// Public or analytics routes
router.get("/total-orders", countTotalOrders);
router.get("/total-sales", calculateTotalSales);
router.get("/total-sales-by-date", calculateTotalSalesByDate);

// Routes for authenticated users
router.post("/createOrder", authenticate, createOrder);
router.get("/mine", authenticate, getUserOrders);
router.get("/:id", authenticate, findOrderById);
router.put("/:id/pay", authenticate, markOrderAsPaid);

// Admin-only routes
router.get("/", authenticate, authorizeAdmin, getAllOrders);
router.put("/:id/deliver", authenticate, authorizeAdmin, markOrderAsDelivered);

export default router;

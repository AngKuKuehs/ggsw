import express from "express";
import formidable from "express-formidable";
const router = express.Router();

import {authenticate, authorizeAdmin} from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

import { addProduct, updateProduct, removeProduct, getProducts, getProductById, addProductReview, getTopProducts } from "../controllers/productController.js";

router.route("/").post(authenticate, authorizeAdmin, formidable(), addProduct);
router.route("/").get(getProducts);
router.route("/top").get(getTopProducts);
router.route("/:id").put(authenticate, authorizeAdmin, formidable(), updateProduct);
router.route("/:id").delete(authenticate, authorizeAdmin, removeProduct);
router.route("/:id").get(getProductById);
router.route("/:id/reviews").post(authenticate, authorizeAdmin, checkId, addProductReview);

export default router;
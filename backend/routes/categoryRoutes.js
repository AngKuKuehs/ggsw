import express from "express";
const router = express.Router();
import { createCategory, updateCategory, removeCategory, allCategory, readCategory } from "../controllers/categoryController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMIddleware.js";

router.route('/').post(authenticate, authorizeAdmin, createCategory);
router.route('/:categoryId').put(authenticate, authorizeAdmin, updateCategory);
router.route('/:categoryId').delete(authenticate, authorizeAdmin, removeCategory);
router.route('/categories').get(authenticate, authorizeAdmin, allCategory)
router.route('/:id').get(readCategory)
export default router; 
import express from "express";
import { createProduct, getProduct, getProducts } from "../controller/productController.js";
import { protect, roleCheck } from "../middleware/authmiddle.js";
const router = express.Router();


 
router.route('/').post(protect,roleCheck,createProduct).get(getProducts);
router.route('/:id').get(getProduct);

export default router;

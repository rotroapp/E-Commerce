import express from "express";
import { createProduct, createProductReview, deleteProduct, getProduct, getProducts, getTopProducts, updateProduct } from "../controller/productController.js";
import { protect, roleCheck } from "../middleware/authmiddle.js";
const router = express.Router();


 
router.route('/').post(protect,roleCheck,createProduct).get(getProducts);
router.route('/top').get(getTopProducts);
router.route('/:id')
.get(getProduct)
.put(protect,roleCheck,updateProduct)
.delete(protect,roleCheck,deleteProduct);
router.route('/:id/reviews').post(protect,createProductReview);

export default router;

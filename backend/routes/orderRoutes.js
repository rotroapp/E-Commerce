import express from "express"
const router = express.Router();

import { protect, roleCheck } from "../middleware/authmiddle.js";
import { addOrderItems, getMyOrders, getOrderById, getorders, updateorderToDelivered, updateorderToPaid } from "../controller/orderController.js";


router.route('/').post(protect,addOrderItems).get(protect,roleCheck,getorders);
router.route('/mine').get(protect,getMyOrders);
router.route('/:id').get(protect,getOrderById);

router.route('/:id/pay').put(protect,updateorderToPaid);
router.route('/:id/deliver').put(protect,roleCheck,updateorderToDelivered);



export default router;
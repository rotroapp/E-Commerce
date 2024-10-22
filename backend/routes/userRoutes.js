import express from "express"
const router = express.Router();
import {
  loginUser,logoutUser, registerUser,getUserProfile,updateUser,
  getUsers,
  getUserId,
  updateUserProfile,
  deleteUser
} from "../controller/userController.js"
import { protect, roleCheck } from "../middleware/authmiddle.js";


router.route('/').post(registerUser).get(protect,roleCheck,getUsers);
router.route('/login').post(loginUser);
router.route('/logout').post(protect,logoutUser);
router.route('/profile').put(protect,updateUserProfile).get(protect,getUserProfile);
router.route('/:id').get(protect,roleCheck,getUserId).put(protect,roleCheck,updateUser).delete(protect,roleCheck,deleteUser)



export default router;
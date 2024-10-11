import express from "express";
import {
  palceOrder,
  allOrders,
  userOrders,
  updateStatus,
  palceOrderStripe,
  palceOrderRazorpay,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

// payment features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// payment features
orderRouter.post("/place", authUser, palceOrder);
orderRouter.post("/webx", authUser, palceOrderStripe);
orderRouter.post("/razorpay", authUser, palceOrderRazorpay);

//User Orders
orderRouter.post("/userorders", authUser, userOrders);

export default orderRouter;

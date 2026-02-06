import express from "express";
import { getOrders, markDelivered } from "../controllers/orderController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/orders", adminAuth, getOrders);
router.put("/orders/:id/deliver", adminAuth, markDelivered);

export default router;

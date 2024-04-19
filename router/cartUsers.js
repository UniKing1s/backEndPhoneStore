import express from "express";
import { createCart } from "../controllers/cartUsers.js";

const router = express.Router();

// router.get("/", getAccount);
//create Bill
// các giá trị khác ngoại trừ mã hóa đơn

router.post("/", createCart);
router.get("/:username", get);
export default router;

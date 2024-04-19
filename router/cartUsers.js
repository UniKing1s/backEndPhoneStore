import express from "express";
import {
  createCart,
  deleteCart,
  getCart,
  updateCart,
} from "../controllers/cartUsers.js";

const router = express.Router();

// router.get("/", getAccount);
//create Bill
// các giá trị khác ngoại trừ mã hóa đơn

router.post("/", createCart);
router.get("/:username", getCart);
router.post("/updateCart/", updateCart);
router.delete("/", deleteCart);
export default router;

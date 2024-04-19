import express from "express";
import {
  createCart,
  deleteCart,
  getCart,
  updateCartdb,
} from "../controllers/cartUsers.js";

const router = express.Router();

// router.get("/", getAccount);
//create Bill
// các giá trị khác ngoại trừ mã hóa đơn

router.post("/", createCart);
router.get("/:username", getCart);
router.post("/updateCart/", updateCartdb);
router.delete("/", deleteCart);
export default router;

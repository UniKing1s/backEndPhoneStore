import { cartUserModel } from "../models/cartUserModel.js";
export const createCart = async (req, res) => {
  try {
    const newCart = req.body;
    console.log(newCart);
    for (let i of newCart) {
      const checkCart = await cartUserModel.findOne({
        username: i.username,
        masp: i.masp,
      });
      if (checkCart) {
        updateCart(i, checkCart);
      } else {
        const cart = new cartUserModel(i);
        await cart.save();
      }
    }
    const carts = await cartUserModel.find({ username: newCart[0].username });
    res.json(carts);
  } catch (err) {
    res.status(500).json({ error: "Tạo giỏ hàng thất bại" });
  }
};
export const getCart = async (req, res) => {
  try {
    const username = req.params.username;
    console.log(username);
    const checkCart = await cartUserModel.find({
      username: username,
    });
    if (checkCart) {
      res.json(checkCart);
    } else {
      res.status(404).json({ mess: "No cart found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Lấy giỏ hàng thất bại" });
    // console.log("err");
    // console.log(res.status);
  }
};
const updateCart = async (cart) => {
  await cartUserModel.updateOne(
    {
      username: cart.username,
      masp: cart.masp,
    },
    {
      $inc: {
        quantity: cart.quantity,
        totalPrice: cart.totalPrice,
      },
    }
  );
};

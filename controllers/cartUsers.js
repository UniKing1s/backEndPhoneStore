import { cartUserModel } from "../models/cartUserModel.js";
export const createCart = async (req, res) => {
  try {
    const newCart = req.body;
    console.log(newCart);
    const checkCart = await cartUserModel.findOne({
      username: newCart.username,
    });
    if (checkCart) {
      const carts = updateCart(newCart);
      res.json(carts);
    } else {
      const cart = new cartUserModel(newCart);
      await cart.save();
      res.json(cart);
      console.log("cart", cart);
    }
  } catch (err) {
    res.status(500).json({ error: "Tạo giỏ hàng thất bại" });
    // console.log("err");
    // console.log(res.status);
  }
};
export const getCart = async (req, res) => {
  try {
    const username = req.params.username;
    console.log(username);
    const checkCart = await cartUserModel.findOne({
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
updateCart = async (newCart) => {
  await cartUserModel.updateOne(
    {
      username: newCart.username,
    },
    {
      cart: {
        $inc: { quantity: newCart.quantity, totalPrice: newCart.totalPrice },
      },
    }
  );
  const cartUser = cartUserModel.findOne({
    username: newCart.username,
  });
  return cartUser;
};

import { cartUserModel } from "../models/cartUserModel.js";
export const createCart = async (req, res) => {
  try {
    const newCart = req.body;
    console.log(newCart);
    const checkCart = await cartUserModel.findOne({
      username: newCart.username,
    });
    if (checkCart) {
      const carts = updateCart(newCart, checkCart);
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
const updateCart = async (newCart, checkCart) => {
  let posx = 0;
  let posy = 0;
  for (let i of checkCart.cart) {
    for (let k of newCart.cart) {
      if (i.name === k.name) {
        checkCart.cart[posx].quantity += newCart.cart[posy].quantity;
      }
      posy += 1;
    }
    posx += 1;
  }
  await cartUserModel.updateOne(
    {
      username: newCart.username,
    },
    {
      $set: {
        cart: checkCart.cart,
      },
    }
  );
  const cartUser = cartUserModel.findOne({
    username: newCart.username,
  });
  return cartUser;
};

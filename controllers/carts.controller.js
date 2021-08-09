const Cart = require("../models/Cart.model");
const Medicine = require("../models/Medicine.model");
const User = require("../models/User.model");

module.exports.cartsController = {
  addCart: async (req, res) => {
    try {
      await Cart.create({
        user: req.body.user,
        medications: req.body.medications,
        total: 0,
      });
      res.json("Корзина создана");
    } catch (err) {
      res.json(err);
    }
  },
  addMedicine: async (req, res) => {
    try {
      const cart = await Cart.findById(req.params.id);
      const data = await Medicine.findById(req.params.medId);
      if (data.haveRecipe === false) {
        await Cart.findByIdAndUpdate(req.params.id, {
          $push: { medications: req.params.medId },
        });

        await Cart.findByIdAndUpdate(req.params.id, {
          total: cart.total + data.price,
        });
        res.redirect(`http://localhost:3000/medications/${data._id}`);
      } else {
        res.json("Лекарство без рецепта не продается");
      }
    } catch (err) {
      res.json(err);
    }
  },
  deleteMedicine: async (req, res) => {
    try {
      const cart = await Cart.find({ user: req.params.id });
      await Cart.findByIdAndUpdate(cart._id, {
        $pull: { medications: req.params.medId },
      });
      res.redirect(`http://localhost:3000/carts/${cart._id}`);
    } catch (err) {
      res.json(err);
    }
  },
  clearCart: async (req, res) => {
    try {
      await Cart.findByIdAndUpdate(req.params.id, { medications: [] });
      res.json("Корзина очищена");
    } catch (err) {
      res.json(err);
    }
  },
  getAllMedications: async (req, res) => {
    try {
      const data = await Cart.find({ user: req.params.id })
        .lean()
        .populate("medications");
      res.render("certainCart", {
        data,
      });
    } catch (err) {
      res.json(err);
    }
  },
  buyFromCart: async (req, res) => {
    try {
      const cart = await Cart.findById(req.params.id);
      const user = await User.findById(cart.user);
      await User.findByIdAndUpdate(user, {
        money: user.money - cart.total,
      });
      await Cart.findByIdAndUpdate(req.params.id, {
        total: 0,
        medications: [],
      });
      res.json("Покупка совершена");
    } catch (err) {
      res.json(err);
    }
  },
};

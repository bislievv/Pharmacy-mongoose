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
      const data = await Medicine.findById(req.body.medications);
      if (data.haveRecipe == false) {
        await Cart.findByIdAndUpdate(req.params.id, {
          $push: { medications: req.body.medications },
        });

        await Cart.findByIdAndUpdate(cart, {
          total: cart.total + data.price,
        });
        res.json("Лекарство добавлено");
      } else {
        res.json("Лекарство без рецепта не продается");
      }
    } catch (err) {
      res.json(err);
    }
  },
  deleteMedicine: async (req, res) => {
    try {
      await Cart.findByIdAndUpdate(req.params.id, {
        $pull: { medications: req.body.medications },
      });
      res.json("Лекарство удалено");
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
      const data = await Cart.findById(req.params.id).populate("medications");
      res.json(data);
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

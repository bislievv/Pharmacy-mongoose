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
      const cart = await Cart.findOne({ user: req.params.id });
      const data = await Medicine.findById(req.params.medId);
      await Cart.findOneAndUpdate(
        { user: req.params.id },
        {
          $pull: { medications: req.params.medId },
        }
      );

      await Cart.findOneAndUpdate(
        { user: req.params.id },
        {
          total: cart.total - data.price,
        }
      );
      res.redirect(`http://localhost:3000/carts/${req.params.id}/`);
    } catch (err) {
      res.json(err);
    }
  },
  clearCart: async (req, res) => {
    try {
      await Cart.findOneAndUpdate(
        { user: req.params.id },
        { medications: [], total: 0 }
      );
      res.redirect(`http://localhost:3000/carts/${req.params.id}/`);
    } catch (err) {
      res.json(err);
    }
  },
  getAllMedications: async (req, res) => {
    try {
      const data = await Cart.find({ user: req.params.id })
        .lean()
        .populate("medications user");
      res.render("cart", {
        data,
      });
    } catch (err) {
      res.json(err);
    }
  },
  buyFromCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.params.id });
      const user = await User.findById(req.params.id);
      if (user.money < cart.total) {
        res.json("Недостаточно средств на счете. Пожалуйтса, пополните счет.");
      } else {
        await User.findByIdAndUpdate(req.params.id, {
          money: user.money - cart.total,
        });
        await Cart.findOneAndUpdate(
          { user: req.params.id },
          {
            total: 0,
            medications: [],
          }
        );
      }
      res.redirect(`http://localhost:3000/carts/${req.params.id}/`);
    } catch (err) {
      res.json(err);
    }
  },
};

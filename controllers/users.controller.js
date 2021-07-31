const User = require("../models/User.model");

module.exports.usersController = {
  createAccount: async (req, res) => {
    try {
      await User.create({
        name: req.body.name,
        money: req.body.money,
      });
      res.json("Аккаунт создан");
    } catch (err) {
      res.json(err);
    }
  },

  addMoney: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      await User.findByIdAndUpdate(req.params.id, {
        money: user.money + req.body.money,
      });
      res.json("Счет пополнен");
    } catch (err) {
      res.json(err);
    }
  },
};

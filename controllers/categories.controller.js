const Category = require("../models/Category.model");

module.exports.categoriesController = {
  addgenre: async (req, res) => {
    try {
      await Category.create({
        name: req.body.name,
      });
      res.json("Жанр добавлен");
    } catch (err) {
      res.json(err);
    }
  },
  getGenres: async (req, res) => {
    try {
      const data = await Category.find({});
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  },
  deleteGenres: async (req, res) => {
    try {
      await Category.findByIdAndRemove(req.params.id);
      res.json("Категория удалена");
    } catch (err) {
      res.json(err);
    }
  },
  editGenres: async (req, res) => {
    try {
      await Category.findByIdAndUpdate(req.params.id);
      res.json("Изменения внесены");
    } catch (err) {
      res.json(err);
    }
  },
};

const Medicine = require("../models/Medicine.model");

module.exports.medicationsController = {
  getMedications: async (req, res) => {
    try {
      const data = await Medicine.find({}).lean();
      res.render("home", {
        data,
      });
    } catch (err) {
      res.json(err);
    }
  },
  getMedicineByCategory: async (req, res) => {
    try {
      const data = await Medicine.find({ category: req.params.id }).lean();
      res.render("severalMed", {
        data,
      });
    } catch (err) {
      res.json(err);
    }
  },
  getMedicine: async (req, res) => {
    try {
      const data = await Medicine.findById(req.params.id);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  },
  addMedicine: async (req, res) => {
    try {
      await Medicine.create({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        haveRecipe: req.body.haveRecipe,
      });
      res.json("Лекарство добавлено");
    } catch (err) {
      res.json(err);
    }
  },
  adminGetMedications: async (req, res) => {
    try {
      const data = await Medicine.find({});
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  },
  deleteMedicine: async (req, res) => {
    try {
      await Medicine.findByIdAndRemove(req.params.id);
      res.json("Лекарство удалено");
    } catch (err) {
      res.json(err);
    }
  },
  editMedicine: async (req, res) => {
    try {
      await Medicine.findByIdAndUpdate(req.params.id, req.body);
      res.json("Изменения внесены");
    } catch (err) {
      res.json(err);
    }
  },
};

const mongoose = require("mongoose");

const medicineSchema = mongoose.Schema({
  name: String,
  price: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  haveRecipe: Boolean,
});

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;

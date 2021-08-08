const mongoose = require("mongoose");

const medicineSchema = mongoose.Schema({
  name: String,
  price: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  haveRecipe: Boolean,
  image: String,
});

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;

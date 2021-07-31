const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  medications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
    },
  ],
  total: Number,
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;

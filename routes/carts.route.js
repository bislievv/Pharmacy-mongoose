const { Router } = require("express");
const { cartsController } = require("../controllers/carts.controller");

const router = Router();

router.post("/carts", cartsController.addCart);
router.patch("/carts/add/:id", cartsController.addMedicine);
router.patch("/carts/del/:id", cartsController.deleteMedicine);
router.patch("/carts/clear/:id", cartsController.clearCart);
router.get("/carts/:id", cartsController.getAllMedications);
router.patch("/carts/buy/:id", cartsController.buyFromCart);

module.exports = router;

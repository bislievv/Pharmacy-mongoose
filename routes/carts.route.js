const { Router } = require("express");
const { cartsController } = require("../controllers/carts.controller");

const router = Router();

router.post("/carts", cartsController.addCart); // Создание корзины
router.get("/carts/:medId/:id", cartsController.addMedicine); // Добавление лекарства в корзину
router.get("/carts/:id/:medId/del", cartsController.deleteMedicine); // Удаление лекартсва из корзины
router.patch("/carts/clear/:id", cartsController.clearCart);
router.get("/carts/:id/", cartsController.getAllMedications);
router.patch("/carts/buy/:id", cartsController.buyFromCart);

module.exports = router;

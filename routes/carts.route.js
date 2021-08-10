const { Router } = require("express");
const { cartsController } = require("../controllers/carts.controller");

const router = Router();

router.post("/carts", cartsController.addCart); // Создание корзины
router.get("/carts/:medId/:id", cartsController.addMedicine); // Добавление лекарства в корзину
router.get("/carts/:id/:medId/del", cartsController.deleteMedicine); // Удаление лекартсва из корзины
router.get("/carts/:id/clear/cart", cartsController.clearCart); // Очистить корзину
router.get("/carts/:id/", cartsController.getAllMedications); // Показать все лекарства из корзины
router.get("/carts/:id/buy/cart", cartsController.buyFromCart); // Произвести оплату лекарств

module.exports = router;

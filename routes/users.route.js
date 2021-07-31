const { Router } = require("express");
const { usersController } = require("../controllers/users.controller");

const router = Router();

router.post("/users", usersController.createAccount);
router.patch("/users/:id", usersController.addMoney);

module.exports = router;

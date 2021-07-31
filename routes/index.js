const { Router } = require("express");

const router = Router();

router.use(require("./carts.route"));
router.use(require("./categories.route"));
router.use(require("./medications.route"));
router.use(require("./users.route"));

module.exports = router;

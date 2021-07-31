const { Router } = require("express");
const {
  categoriesController,
} = require("../controllers/categories.controller");

const router = Router();

router.post("/admin/categories", categoriesController.addgenre);
router.get("/admin/categories", categoriesController.getGenres);
router.delete("/admin/categories/:id", categoriesController.deleteGenres);
router.patch("/admin/categories/:id", categoriesController.editGenres);

module.exports = router;

const { Router } = require("express");
const {
  medicationsController,
} = require("../controllers/medications.controller");

const router = Router();

router.get("/medications", medicationsController.getMedications);
router.get(
  "/medications/categories/:id",
  medicationsController.getMedicineByCategory
);
router.get("/medications/:id", medicationsController.getMedicine);
router.post("/admin/medications", medicationsController.addMedicine);
router.get("/admin/medications", medicationsController.adminGetMedications);
router.delete("/admin/medications/:id", medicationsController.deleteMedicine);
router.patch("/admin/medications/:id", medicationsController.editMedicine);

module.exports = router;

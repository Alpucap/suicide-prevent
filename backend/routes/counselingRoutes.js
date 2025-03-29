const express = require("express");
const router = express.Router();
const CounselingController = require("../controllers/counselingController");
const { authenticateUser } = require("../middlewares/authMiddleware");

// Pastikan setiap fungsi dari CounselingController sudah didefinisikan
if (
  !CounselingController.getAllCounselings ||
  !CounselingController.getCounselingById ||
  !CounselingController.createCounseling ||
  !CounselingController.updateCounseling ||
  !CounselingController.deleteCounseling
) {
  console.error("⚠ Error: Salah satu fungsi di counselingController tidak ditemukan!");
  process.exit(1);
}

router.get("/", authenticateUser, CounselingController.getAllCounselings);
router.get("/:id", authenticateUser, CounselingController.getCounselingById);
router.post("/", authenticateUser, CounselingController.createCounseling);
router.put("/:id", authenticateUser, CounselingController.updateCounseling);
router.delete("/:id", authenticateUser, CounselingController.deleteCounseling);

module.exports = router;

const express = require("express");
const router = express.Router();
const infoAdminController = require("../controllers/infoAdminController");

router.get("/", infoAdminController.getAllInfoAdmin);
router.get("/:id", infoAdminController.getInfoAdminById);
router.post("/", infoAdminController.createInfoAdmin);
router.put("/:id", infoAdminController.updateInfoAdmin);
router.delete("/:id", infoAdminController.deleteInfoAdmin);

module.exports = router;

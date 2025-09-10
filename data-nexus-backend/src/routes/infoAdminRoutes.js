const express = require("express");
const router = express.Router();
const infoAdminController = require("../controllers/infoAdminController");
const { checkDBConnection } = require("../middleware/dbConnection");

router.get("/", infoAdminController.getAllInfoAdmin);
router.get("/:id", infoAdminController.getInfoAdminById);
router.post("/", infoAdminController.createInfoAdmin);
router.put("/:id", infoAdminController.updateInfoAdmin);
router.delete("/:id", infoAdminController.deleteInfoAdmin);
// Route pour valider un admin (copie de info_admin vers admin_membre)
router.post("/valider/:id", checkDBConnection, infoAdminController.validerAdmin);

module.exports = router;

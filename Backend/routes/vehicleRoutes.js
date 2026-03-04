const express = require("express");
const router = express.Router();
const { addVehicle, getVehicles, deleteVehicle } =
  require("../controllers/vehicleController");


const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addVehicle);
router.get("/", authMiddleware, getVehicles);
router.delete("/:id", authMiddleware, deleteVehicle);
module.exports = router;

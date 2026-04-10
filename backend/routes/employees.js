const express = require("express");
const {
  getAllEmployees,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} = require("../controllers/employeeController");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

router.get("/", getAllEmployees);
router.post("/", createEmployee); // skipping auth layer for testing or maybe add authMiddleware
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;

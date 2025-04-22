const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController.js");
const { authenticateUser } = require("../middlewares/authMiddleware.js");

router.get("/", authenticateUser, UserController.getAllUsers);
router.get("/:id", authenticateUser, UserController.getUserById);
router.put("/:id", authenticateUser, UserController.updateUser);
router.delete("/:id", authenticateUser, UserController.deleteUser);

module.exports = router;

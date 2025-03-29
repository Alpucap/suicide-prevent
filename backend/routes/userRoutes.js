const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController.js");
const { authenticateUser } = require("../middlewares/authMiddleware.js");

router.get("/users", authenticateUser, UserController.getAllUsers);
router.get("/users/:id", authenticateUser, UserController.getUserById);
router.put("/users/:id", authenticateUser, UserController.updateUser);
router.delete("/users/:id", authenticateUser, UserController.deleteUser);

module.exports = router;

const express = require("express");
const router = express.Router();
const PostController = require("../controllers/postController.js");
const { authenticateUser } = require("../middlewares/authMiddleware.js");

router.get("/", authenticateUser, PostController.getAllPosts);
router.get("/:id", authenticateUser, PostController.getPostById);
router.post("/", authenticateUser, PostController.createPost);
router.put("/:id", authenticateUser, PostController.updatePost);
router.delete("/:id", authenticateUser, PostController.deletePost);

module.exports = router;

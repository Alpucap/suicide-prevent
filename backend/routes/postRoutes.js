const express = require("express");
const router = express.Router();
const PostController = require("../controllers/postController.js");
const { authenticateUser } = require("../middlewares/authMiddleware.js");

router.get("/posts", authenticateUser, PostController.getAllPosts);
router.get("/posts/:id", authenticateUser, PostController.getPostById);
router.post("/posts", authenticateUser, PostController.createPost);
router.put("/posts/:id", authenticateUser, PostController.updatePost);
router.delete("/posts/:id", authenticateUser, PostController.deletePost);

module.exports = router;

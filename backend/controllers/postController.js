const { Post } = require("../models");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: "Post tidak ditemukan" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { content, userId } = req.body;
    const post = await Post.create({ content, userId });
    res.status(201).json({ message: "Post dibuat", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: "Post tidak ditemukan" });

    await post.update({ content: req.body.content });
    res.json({ message: "Post diperbarui", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: "Post tidak ditemukan" });

    await post.destroy();
    res.json({ message: "Post dihapus" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

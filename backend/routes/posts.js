const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  addComment,
} = require("../controllers/postController");

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", authMiddleware, createPost);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);
router.post("/:id/like", authMiddleware, likePost);
router.post("/:id/comment", authMiddleware, addComment);

module.exports = router;

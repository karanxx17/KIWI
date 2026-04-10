const Post = require("../models/Post");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name handle avatar verified")
      .populate("comments.user", "name avatar")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { caption, image, location, badge, tags, music } = req.body;

    const post = new Post({
      user: req.userId,
      caption,
      image,
      location,
      badge,
      tags: tags || [],
      music,
    });

    await post.save();
    await post.populate("user", "name handle avatar verified");

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { caption, location, badge, tags, music } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    post.caption = caption || post.caption;
    post.location = location || post.location;
    post.badge = badge || post.badge;
    post.tags = tags || post.tags;
    post.music = music || post.music;

    await post.save();
    res.json({ message: "Post updated successfully", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const isLiked = post.likedBy.includes(req.userId);
    if (isLiked) {
      post.likedBy = post.likedBy.filter((u) => u.toString() !== req.userId);
      post.likes--;
    } else {
      post.likedBy.push(req.userId);
      post.likes++;
    }

    await post.save();
    res.json({ message: "Like updated", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({
      user: req.userId,
      text,
    });

    await post.save();
    res.json({ message: "Comment added", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

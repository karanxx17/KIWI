import React, { useState } from "react";
import { postsAPI } from "../services/api";

const PostForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    caption: "",
    image: "",
    location: "",
    badge: "",
    tags: "",
    music: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        ...formData,
        tags: formData.tags.split(",").map((t) => t.trim()),
      };
      await postsAPI.create(data);
      setFormData({
        caption: "",
        image: "",
        location: "",
        badge: "",
        tags: "",
        music: "",
      });
      setMessage("Post created successfully!");
      setTimeout(() => setMessage(""), 3000);
      onSuccess();
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <h3>Create New Post</h3>
      <textarea
        name="caption"
        placeholder="Post caption"
        value={formData.caption}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
      />
      <input
        type="text"
        name="badge"
        placeholder="Badge (e.g., Brand Story)"
        value={formData.badge}
        onChange={handleChange}
      />
      <input
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
        value={formData.tags}
        onChange={handleChange}
      />
      <input
        type="text"
        name="music"
        placeholder="Music"
        value={formData.music}
        onChange={handleChange}
      />
      {message && <p className="message">{message}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
};

export default PostForm;

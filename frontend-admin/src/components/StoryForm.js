import React, { useState } from "react";
import { storiesAPI } from "../services/api";

const StoryForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({ image: "", caption: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await storiesAPI.create(formData);
      setFormData({ image: "", caption: "" });
      setMessage("Story created successfully!");
      setTimeout(() => setMessage(""), 3000);
      onSuccess();
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating story");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <h3>Create New Story</h3>
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
        required
      />
      <textarea
        name="caption"
        placeholder="Story caption"
        value={formData.caption}
        onChange={handleChange}
      />
      {message && <p className="message">{message}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Story"}
      </button>
    </form>
  );
};

export default StoryForm;

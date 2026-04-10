const Story = require("../models/Story");

exports.getAllStories = async (req, res) => {
  try {
    const stories = await Story.find()
      .populate("user", "name handle avatar verified")
      .sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createStory = async (req, res) => {
  try {
    const { image, caption } = req.body;

    const story = new Story({
      user: req.userId,
      image,
      caption,
    });

    await story.save();
    await story.populate("user", "name handle avatar verified");

    res.status(201).json({ message: "Story created successfully", story });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStory = async (req, res) => {
  try {
    const { id } = req.params;
    const { caption } = req.body;

    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    if (story.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    story.caption = caption || story.caption;
    await story.save();

    res.json({ message: "Story updated successfully", story });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteStory = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findById(id);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    if (story.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await story.deleteOne();
    res.json({ message: "Story deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.markSeen = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findById(id);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    if (!story.seenBy.includes(req.userId)) {
      story.seenBy.push(req.userId);
      await story.save();
    }

    res.json({ message: "Story marked as seen" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

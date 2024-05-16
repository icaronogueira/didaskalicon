const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true // Optional: Remove leading/trailing whitespace
  },
  subtitle: {
    type: String,
    required: true,
    trim: true
  },
  cover_image_url: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  date_posted: {
    type: Date,
    default: Date.now,
    required: true,
  },
  content: {
    type: mongoose.Schema.Types.Mixed, // Handle dynamic content structure
    required: true
  },
  likes: {
    type: Number,
    required: true,
    default: 0
  },
  dislikes: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = mongoose.model('Post', postSchema);

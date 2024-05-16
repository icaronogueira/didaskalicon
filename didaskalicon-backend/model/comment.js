const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    trim: true // Optional: Remove leading/trailing whitespace
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  date_posted: {
    type: Date,
    default: Date.now,
    required: true
  },
  post_id: {
    type: ObjectId,
    required: true,
  }
});

module.exports = mongoose.model('Comment', commentSchema);

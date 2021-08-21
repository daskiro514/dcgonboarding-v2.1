const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  videoID: {
    type: String,
    required: true
  },
  thumbImage: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('course', CourseSchema);

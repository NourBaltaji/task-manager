const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  content: { type: String },
  completed: { type: Boolean, default: false },
  date: { type: String },
});

module.exports = mongoose.model("Task", taskSchema);

// date: string;
// content: string;
// completed: boolean;

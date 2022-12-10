const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema(
  {
    todo: {
      title: String,
     
    },
    task: {
      title: [String],
     
    },
  },
  { 
    timestamps: true 
  }
);

module.exports = mongoose.model("Todo", todoSchema);

const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema(
  {
    
      email:{
        type:String,
      },
      todo: {
        title: [String],
       
      },
      task: [        
        {
          tasktodo: String,
           title: [String],
      }
    ],  
  
  },
  { 
    timestamps: true 
  }
);

module.exports = mongoose.model("Todo", todoSchema);

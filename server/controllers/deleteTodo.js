const todo = require("../models/todoSchema")

exports.deleteTodo = async (req,res)=>{
        try {

          const id = req.params.id;
          // console.log("heeeeelo".req.body);
          const user = await todo.findByIdAndDelete(req.params.id);
          res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
          });
        } catch (error) {
          console.log(error);
          res.status(401).json({
            success: false,
            message: error.message,
          });
        }
      };
      

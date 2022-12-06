const todo = require("../models/todoSchema")

exports.editTodo = async (req,res)=>{
        try {
          const {title} = req.body

          // console.log(req.params.id,{"todo.title":title});
          const todos = await todo.findByIdAndUpdate(req.params.id, {"todo.title":title});
          res.status(200).json({
            success: true,
            message: "User updated Successfully",
          });
        } catch (error) {
          console.log(error);
          res.status(401).json({
            success: false,
            message: error.message,
          });
        }
      };

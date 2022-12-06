const todo = require("../models/todoSchema")

exports.deleteTask = async (req,res)=>{
        try {
          const {toDelete} = req.body;

          const user = await todo.findById(req.params.id)

           for(let i = 0;i<user.task.title.length;i++){
            if(toDelete === user.task.title[i]){
              user.task.title.splice(i,1);
              user.save();
              res.status(200).json({
                success: true,
                message: "User Deleted Successfully",
                user
              });
            }
          }
        } catch (error) {
          console.log(error);
          res.status(401).json({
            success: false,
            message: error.message,
          });
        }
      };
      

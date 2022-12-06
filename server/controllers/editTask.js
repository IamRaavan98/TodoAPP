const todo = require("../models/todoSchema")

exports.editTask = async (req,res)=>{
        try {
          const {toEdit,original} = req.body
          const user = await todo.findById(req.params.id)

          
          for(let i = 0;i<user.task.title.length;i++){
           if(original === user.task.title[i]){
              user.task.title[i]=toEdit
             user.save();
             res.status(200).json({
               success: true,
               message: "User Edited Successfully",
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

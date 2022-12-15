const todo = require("../models/todoSchema")

exports.deleteTodo = async (req,res)=>{
        try {
          const {title} = req.body;
  
          const user = await todo.findOne({title});
        
            for (let index = 0; index < user.todo.title.length; index++) {
                  if(user.todo.title[index] === title){
                    user.todo.title.splice(index,1);
                  }
              
            }
           await user.save()
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
      

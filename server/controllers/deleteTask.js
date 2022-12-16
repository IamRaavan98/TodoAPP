const todo = require("../models/todoSchema")

exports.deleteTask = async (req,res)=>{
        try {
          const {email,name,tasktodo} = req.body;
          
          const user = await todo.findOne({email})
           
           for(let i = 0;i<user.task.length;i++){
            if(tasktodo === user.task[i].tasktodo){
                for(let j=0;j<user.task[i].title.length;j++)
                    {
                      if(user.task[i].title[j] === name){
                        user.task[i].title.splice(j,1);
                      await user.save();
                        res.status(200).json({
                          success: true,
                          message: "User Deleted Successfully",
                          user
                         });
                      
                      }
                    }
                    // res.status(400).send(error)
            }
          }
          // res.status(400).json({
          //   success: false,
          //   message: "not deleted"
          // });
        } catch (error) {
          console.log(error);
          res.status(401).json({
            success: false,
            message: error.message,
          });
        }
      };
      

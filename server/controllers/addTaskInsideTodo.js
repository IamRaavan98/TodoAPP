const Todo = require("../models/todoSchema")

exports.addTaskInsideTodo = async (req, res)=>{
  
try {
    const id = req.params.id
    // console.log(req.body);
    const {name,email,tasktodo} = req.body
    const todo = await Todo.findOne({email})
    
    if(!todo)throw new error('No todo exists')
    else{
        //here i have used name instead of title and at front end also name variable is used
         for (let index = 0; index < todo.task.length; index++) {
            if(tasktodo === todo.task[index].tasktodo){
                todo.task[index].title.push(name)
                await todo.save()
                todo.createdAt; 
                todo.updatedAt;
                res.status(200).json({
                    todo,
                    message:"task Added",
                    success:true,
                })
              
               }

            
         }
        //  res.status(400).send(error)   
        }  
} catch (error) {
    console.log(error.message)
    res.status(400).json(error.message)
}

}
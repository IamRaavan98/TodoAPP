const Todo = require("../models/todoSchema")

exports.addTaskInsideTodo = async (req, res)=>{
  
try {
    const id = req.params.id;
    const todo = await Todo.findById(id)
    if(!todo)throw new error('No todo exists')
    else{
        //here i have used name instead of title and at front end also name variable is used
        const {name,date} = req.body
        if(name!=null){
            for (let i = 0; i<todo.task.title.length ; i++) {
                if(name === todo.task.title[i]){ res.status(400).send("todo exists")
                throw new error('todo exists')}
            }
            todo.task.title.push(name)
           
           
            await todo.save()
            todo.createdAt; 
            todo.updatedAt;
        }
    }
        res.status(200).json(todo)
      
} catch (error) {
    console.log(error.message)
    // res.status(400).json(error.message)
}

}
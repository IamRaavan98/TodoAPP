

const todo = require("../models/todoSchema")

exports.searchTodo = async (req,res) =>{
try {
    const id = req.params.id
    console.log(id);
const count = await todo.findById(id)
if(!count)throw new error("Todo not found")
else{
    res.status(200).json(count)//we are sending whole todo incase user need to see whats inside the todo that user was searching for
} 

} catch (error) {
    console.log(error.message)
    res.status(400).send(error.message)
}
}

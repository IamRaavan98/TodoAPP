const todo = require("../models/todoSchema")

exports.addtodo = async (req,res)=>{
  

  console.log(req.body,"heeloo");
  try {
     const{ title,date }= req.body
     
    const todoExists = await todo.findOne({"todo.title":title})
    if((todoExists)){throw new Error("todo already exists");}
   // creating new todo
   const newtodo = new todo({ 
     todo:{
      title:title,
      date:date,
     }
   })
   await newtodo.save()
     res.status(200).json(newtodo)


   }
   catch(error) {
      res.send(error.message)
    // console.log(error.message)
   }

}





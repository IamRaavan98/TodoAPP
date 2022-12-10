const todo = require("../models/todoSchema")

exports.addtodo = async (req,res)=>{
  

  // console.log(req.body,"heeloo");
  try {
     const{ title}= req.body
     //to make first letter of title in upper case we use Title variable

    const todoExists = await todo.findOne({"todo.title":title})
    if((todoExists)){throw new Error("todo already exists");}
   // creating new todo
   const newtodo = new todo({ 
     todo:{
      title:title,
   
     }
   })
   await newtodo.save()
   newtodo.createdAt; 
   newtodo.updatedAt;
     res.status(200).json(newtodo)


   }
   catch(error) {
      res.send(error.message)
    // console.log(error.message)
   }

}





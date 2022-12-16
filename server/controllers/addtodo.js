const todo = require("../models/todoSchema")
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
exports.addtodo = async (req,res)=>{
  try {
    const token =
    req.cookies.token ||
    req.body.token 
    // req.header("Authorization").replace("Bearer ", "");
    
    if (!token) {
      console.log("token is missing");
      return res.status(403).send("token is missing");
    }
    else{
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      
      req.user = decode;
      
      const email = decode.email
      const{name}= req.body
      //insted of title variable we have used name as variable same goes in frontend
      
      
      const emailExists = await todo.findOne({email})
      if(!emailExists){
        await todo.create({
          email:email
        });
      }  
      
      
      for (let i = 0; i< emailExists.todo.title.length ; i++) {
        if(name === emailExists.todo.title[i]){ res.status(400).send("todo exists")
        throw new error('todo exists')}
      }
      emailExists.todo.title.push(name);
     
//for pushing data inside tasktodo     
      const temp = {
        tasktodo:name,
      }
      emailExists.task.push(temp)
      
      await emailExists.save()
      
      emailExists.createdAt; 
      emailExists.updatedAt;
   
      res.status(200).json(emailExists)
      
      
    }
   }
   catch(error) {
      res.send(error.message)
    console.log(error.message)
   }

}





const todo = require("../models/todoSchema")
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
exports.getAllTitels = async (req,res)=>{
  
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
      if(!decode){
        throw new Error("token not decoded")
      }
    req.user = decode;
     const email  = decode.email;

    const emailExists = await todo.findOne({email})
    // console.log(titels);

    res.status(200).json(emailExists)}
    // console.log(titels);
  } catch (error) {
    res.send(error.message)
    // console.log(res.message);
  }
}
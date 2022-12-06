const user = "../models/userSchema"

exports.checkUser = (req,res)=>{
   try {
    const {email} = req.body
    const User = user.find({email})
    if(!(User)){res.send("user already exists")}
   } catch (error) {
     res.send(error.message)    
   }
}
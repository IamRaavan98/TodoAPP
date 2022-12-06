const user = require("../models/userSchema")

exports.login = async (req,res)=>{
    try {
        if((req.cookies)){
            const {email} = req.cookies
            const existEmail = await user.findOne(email)
            if(existEmail){res.status(400).send(existEmail)} //it means checked give him login
            else{
                throw new error("email not found")
            }
        }
        else{
            const {email,password} = req.body
           //empty fields check at front end
            const User = await user.findOne(email)
            
            if(!(User)){throw new error("You are not registered")}
            else{
                res.status(400).send(User)  //it means checked give him login
            }
        }

    } catch (error) {
        
    }

  
} 


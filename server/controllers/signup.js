require("dotenv").config;
const user = require("../models/userSchema");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
exports.signup = async (req, res) => {

  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    // we are not covering if fields are empty we cover it in frontend itself

// console.log(req.body);
    const User = await user.findOne({email});

    if (User) {
      res.send("user already exists")
    } 
    else {

        const User = user.create({
            email:email,
            name:name,
            password:await bcrypt.hash(password,10),
        })
        //as soon as we create a user in mongo it return us an _id
     
       //token
       const token = jwt.sign(
        {
            id: User._id, email, 
       },
       process.env.SECRET_KEY,
       {
        expiresIn: "2day",
       }
       )
       
       const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.status(200).cookie("token",token,options).json({
        success:true,
        User,
        token,
      })
      
      
    }
    // res.status(400).send("")
  } catch (error) {
    res.send(error.message)
    console.log(error.message);
  }
};

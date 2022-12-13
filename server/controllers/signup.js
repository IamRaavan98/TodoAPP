require("dotenv").config;
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
exports.signup = async (req, res) => {

  try {
    const { name, email, password } = req.body;
     
    // we are not covering if fields are empty we cover it in frontend itself

    const UserExists = await User.findOne({email});

    if (UserExists) {
      throw new Error("Email already exists");
    } 
    else {
      const myEncPassword = await bcrypt.hash(password, 10);
          //  console.log(myEncPassword,password);

        const user = await User.create({
          email:email,
          password: myEncPassword,
            name:name,
        });
        // as soon as we create a user in mongo it return us an _id
         console.log(myEncPassword,user);
      //  token
       const token = jwt.sign(
        {
          user_id: user._id,email, myEncPassword, 
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
        user,
        token,
      })
      
    
    }
    
  }catch (error) {
    res.send(error.message)


  }
};

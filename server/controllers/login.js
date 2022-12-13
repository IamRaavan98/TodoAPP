const User = require("../models/userSchema");

exports.login  = async(req,res)=>{
 
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
  
     if(user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.SECRET_KEY,
          {
            expiresIn: "2h",
          }
        );
        user.token = token;
        user.password = undefined;
        // res.status(200).json(user);
  
        // if you want to use cookies
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
  
        res.status(200).cookie("token", token, options).json({
          success: true,
          token,
          user,
        });
      }
  
      res.sendStatus(400).send("email or password is incorrect");
    } catch (error) {
      console.log(error);
    }


}
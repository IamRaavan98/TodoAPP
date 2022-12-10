const todo = require("../models/todoSchema")

exports.getAllTitels = async (req,res)=>{
  try {
    const titels = await todo.find({})

    res.status(200).json(titels)
    // console.log(titels);
  } catch (error) {
    res.send(error.message)
    console.log(res.message);
  }
}
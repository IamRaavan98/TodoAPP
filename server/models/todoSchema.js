const mongoose = require("mongoose")
const todoSchema = new mongoose.Schema({
    todo:{
        title:[String],
        date:String,
    },
    task:{
        title:[String],
        date:String,
    },
})



module.exports = mongoose.model("Todo",todoSchema);
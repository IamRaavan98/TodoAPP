require("dotenv").config();
const express = require("express")
const app = express();
const DBconnection = require("./config/DBs")
const routes  = require("./routes/routes")
const cookieParser = require('cookie-parser')
const cors = require("cors");
// connecting to database

DBconnection();

//middleware
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.get('/addtodo', (req, res) => {
//     res.send('Hello !')

//   })
app.use("/",routes)


module.exports = app;



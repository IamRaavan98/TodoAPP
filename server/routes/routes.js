const express = require("express")
const {home} = require("../controllers/home")
const {addtodo} = require("../controllers/addtodo")
const {addTaskInsideTodo} = require("../controllers/addTaskInsideTodo")
const {getAllTitels} = require("../controllers/getAllTitels")
const {editTodo} = require("../controllers/editTodo")
const {editTask} = require("../controllers/editTask")
const {deleteTodo} = require("../controllers/deleteTodo")
const {deleteTask} = require("../controllers/deleteTask")
const {searchTodo} = require("../controllers/searchTodo")
const {searchTask} = require("../controllers/searchTask")
const {signup} = require("../controllers/signup")
const {login} =  require("../controllers/login")
const {checkUser} = require("../controllers/checkUser")
const router = express.Router();


router.get("/", home);
router.post("/addtodo",addtodo)
router.get("/getAllTitels",getAllTitels)
router.put("/addTaskInsideTodo/:id",addTaskInsideTodo)
router.put("/editTodo/:id",editTodo)
router.put("/editTask/:id",editTask)
router.post("/deleteTodo",deleteTodo)
router.post("/deleteTask",deleteTask)//here we use get as we cannot pass data in using .delete from frontend so we will never knew what to delete as tasks dont have an id only todo has
router.get("/searchTodo/:id",searchTodo)
router.get("/searchTask/:id",searchTask)
router.post("/signup",signup)
router.post("/login",login)
router.get("/checkUser",checkUser)
module.exports = router;
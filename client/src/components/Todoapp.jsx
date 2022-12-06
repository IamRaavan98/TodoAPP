import React from "react";
import axios from "axios";
import Addtask from "./Addtask";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Todoapp = () => {
  const [addTodo, setAddTodo] = useState("");
  const [allTodo, setAllTodo] = useState(0);
  const [task, setTask] = useState("false");
  const [count, setCount] = useState(0);
  const [todotoedit, setTodoTOEdit] = useState("");

  //To fetch all the data from database

  const fetchData = async () => {
    const resp = await axios.get("/getAllTitels");
    setAllTodo(resp.data);
    // console.log(resp.data);
  };

  useEffect(() => {
    fetchData();
  }, [allTodo]);

//To submit new Todo into database
const submitdata = async () => {
   
    if(addTodo.trim() != 0){
     const date = handleDate()
    const data = {
      title: addTodo,
      date:date,
    };
   const res =  await axios.post("/addtodo", data);
    console.log(res);
  }
  else{
    alert("plzz enter todo")
  }
  };
//Submit
  const handleSubmit = () => {
   
    fetchData();
    // console.log("helooooo");
    submitdata();
    setAddTodo("");


 
  };
//DATE
const handleDate =()=>{
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`
  return(currentDate)
}

  //EDIT
  const handleEdit = async (model) => {
    const newtitle = prompt("please enter title to edit");

    if (!newtitle) alert("Enter Title to Edit");
    else {
      const resp = await axios.put(`/editTodo/${model._id}`, {
        title: newtitle,
      });
      // console.log(resp);
    }
  };

  //DELETE
  const handleDelete = async (model) => {
    
    const resp = await axios.delete(`/deleteTodo/${model._id}`);
    // console.log(resp);
  };

  const handletask = (model) => {
  
    if(model.todo.title != task){
    setCount(model);
    setTask(model.todo.title)
    }
    else{
      setCount(0);
    }

    return(
      <>
      <Addtask temp1={model.task} id = {model._id}/>
      </>
    )
  };
  
      

  return (
   
    <>
       <div className="flex flex-col">
       <NavLink to={"/signup"}>SignUP</NavLink>
        <NavLink to={"/login"}>LogIn</NavLink>
       </div>
    <div className="flex flex-col justify-center items-center">
      <form  method="get" onSubmit={handleSubmit}>
      <div className="flex flex-col justify-center items-center mt-[100px]">
        <input
          type="text"
          id="AddTODO"
          AddTODO="AddTODO"
          className="border-4 border-green-800"
          value={addTodo}
          onChange={(event) => {
            setAddTodo(event.target.value);
          }}
        />
        <label className="cursor-pointer" onClick={()=>(handleSubmit())} for="AddTODO">
          Add todos
        </label>
      </div>
      </form>
      <div className="flex flex-row-reverse justify-around space-y-2 cursor-pointer border-4 border-red-800 w-[800px] mr-[10px] ">
        {/*this div for rendering todo  */}
        <div className="space-y-5">
          {/* {(!(allTodo))?(console.log(allTodo,"empty")):(console.log(allTodo,"Notempty"))} */}
          {allTodo &&
            allTodo.map((model) => (
              <tr className="flex flex-row justify-between ">
          {/* {(!(allTodo))?(console.log(allTodo,"empty")):(console.log(model.todo.title,"Notempty"))} */}
               
                <td className=" w-[150px]">{model.todo.title}</td>
                <div className="flex flex-row justify-between ">
                  <p className="ml-[10px]">{model.todo.date}</p>
                  <div>
                    <button
                      onClick={() => handletask(model)}
                      className="ml-[50px]"
                    >
                      Tasks
                      
                    </button>
                  </div>
                
                  <button
                    onClick={() => handleEdit(model)}
                    className="ml-[50px]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(model)}
                    className="ml-[50px]"
                  >
                    Delete
                  </button>
                </div>
              </tr>
            ))}
        </div>


{/* 
        <div>
          <tr>
            <td className=" px-[20px] ">
            {(count === 0)?(" "):  
            (<Addtask temp1={count.task} id = {count._id}/>)}
            </td>
          </tr>
        </div> */}
       




       
         {/* <div> <p> {date}</p></div> */}
        {/* this div for edit and delete buttons */}
      </div>
    </div>

    </>
  );
};

export default Todoapp;
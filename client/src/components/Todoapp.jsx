import React from "react";
import axios from "axios";
import Addtask from "./Addtask";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Todoapp = () => {
  const [addTodo, setAddTodo] = useState(""); 
  const [allTodo, setAllTodo] = useState(0);
  const [count, setCount] = useState(0);
  const [task, setTask] = useState(0);
  const [inputTask, setInputTask]  = useState(0);

  //To fetch all the data from database
  const Base_URL = "https://todoapp-production-4cf3.up.railway.app";
    //  const Base_URL = "http://localhost:3000"
  const fetchData = async () => {
    const resp = await axios.get(`${Base_URL}/getAllTitels`);
        setAllTodo(resp.data.todo.title)   
        //  console.log(resp.data);
        setCount(resp.data)
        
      };

  useEffect(() => {
    fetchData();
  }, [allTodo]);

  //To submit new Todo into database
  const submitdata = async () => {
    if (addTodo.trim() != 0) {
      const data = {
        name: addTodo,
      };
      const res = await axios.post(`${Base_URL}/addtodo`, data);
      console.log(res);
    } else {
      alert("plzz enter todo");
    }
  };
  //Submit
  const handleSubmit = () => {
    fetchData();
    // console.log("helooooo");
    submitdata();
    setAddTodo("");
  };

  //EDIT
  const handleEdit = async (model) => {
    const newtitle = prompt("please enter title to edit");

    if (!newtitle) alert("Enter Title to Edit");
    else {
      const resp = await axios.put(`${Base_URL}/editTodo/${model._id}`, {
        title: newtitle,
      });
      // console.log(resp);
    }
  };

  //DELETE
  const handleDelete = async (model) => {
    const datas = {
      title:model
    };
    console.log(datas);
    const res = await axios.post(`${Base_URL}/deleteTodo`, datas);
  };

  
  function handletask(model){
    setTask(1);
    setInputTask(model)
  }

  return (
    <>
      <div className="bg-[#FF3C83] mt-[150px] pb-[150px]">
        <div className=" flex flex-row  pt-[50px] ">
          <NavLink to={"/signup"}>
            <button className="bg-[#FF9F4A] px-4 py-1 text-lg text-[#ffffff] font-semibold rounded-xl">
              SignUP
            </button>
          </NavLink>
          <NavLink to={"/login"}>
            <button className="ml-[10px] bg-[#FF9F4A] px-4 py-1 text-lg text-[#ffffff] font-semibold rounded-xl">
              LogIN
            </button>
          </NavLink>
        </div>

        <div className="flex flex-col justify-center items-center z-0 ">
          <form method="get" onSubmit={handleSubmit}>
            <div className="flex flex-row justify-center  w-[500px] h-max items-center  ">
              <input
                type="text"
                autocomplete="off"
                id="AddTODO"
                AddTODO="AddTODO"
                className="rounded-xl w-full text-xl text-center"
                placeholder="Add TODO"
                value={addTodo}
                onChange={(event) => {
                  setAddTodo(event.target.value);
                }}
              />
              <label
                className="text-[#EFF54D] hover:bg-[#FF9F4A]  rounded-md text-xl w-[150px] ml-[10px] p-2 "
                onClick={() => handleSubmit()}
                for="AddTODO"
              >
                Add todos
              </label>
            </div>
          </form>

<div className="flex flex-row-reverse  w-full justify-around space-y-2 mr-[10px] mt-[50px]">
  {/*this div for rendering todo  */}
  <div className="space-y-5  ">

    {allTodo&&
      allTodo.map((model) => (
        <tr className="flex flex-row justify-between ">
          {/* {(!(allTodo))?(console.log(allTodo,"empty")):(console.log(allTodo,"Notempty"))} */}

          <div className=" flex flex-row justify-around w-max space-x-4">
            
            <td className=" cursor-pointer  w-[150px] px- text-[#fff] text-lg font-semibold">
              {model.toUpperCase()}

            </td>
                      
      <div>
      <p>CreatedAt</p>
      <p className=" text-[#EFF54D]">
        {count.createdAt.substring(0, 10)}
      </p>
    </div>

    <div className=" ml-[30px]">
      <p>UpdatedAt</p>

        <p className="text-[#EFF54D]">
          {count.updatedAt.substring(0, 10) ===
          count.createdAt.substring(0, 10)
            ? "Not yet Updated"
            : model.updatedAt.substring(0, 10)}
        </p>
      </div>

      <div>
        <button
        >
          Tasks
        <div className="flex   flex-row justify-center">
          <button className="   hover:bg-[#FF9F4A]   rounded-lg " onClick={()=>handletask(model)}>show/</button>
          <button className="   hover:bg-[#FF9F4A]   rounded-lg "onClick={()=>setTask(0)}>hide</button>
        </div>
        </button>
      </div>

      <div>
        <button
          onClick={() => handleEdit(model)}
          className="ml-[50px] hover:bg-[#FF9F4A] px-4  rounded-lg "
        >
          Edit
        </button>
      </div>

      <div>
        <button
          onClick={() => handleDelete(model)}
          className="ml-[50px] bg-[#FF9F4A] font-extrabold rounded-xl px-4 py-2 text-[#fff] hover:text-[#FF0000] "
        >
          Delete
        </button>
      </div>

    </div>
  
  <div>
    <tr>
      <td>
        {(task === 1)?(<Addtask title={inputTask} BigObj= {count}/>):("")}
      </td>
    </tr>
  </div>

  </tr>
))}
</div>

            {/* <div>
              <tr>
                <td className=" ">
                  {count === 0 ? (
                    ""
                  ) : (
                    <Addtask className="border-4 px-[20px]" temp1={count.task} id={count._id} />
                    )}
                    </td>
              </tr>
            </div> */}

            {/* <div> <p> {date}</p></div> */}
            {/* this div for edit and delete buttons */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todoapp;

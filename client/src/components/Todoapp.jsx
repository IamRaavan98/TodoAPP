import React from "react";
import axios from "axios";
import Addtask from "./Addtask";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Todoapp = () => {
  const [addTodo, setAddTodo] = useState("");
  const [allTodo, setAllTodo] = useState(null);
  const [task, setTask] = useState("false");
  const [count, setCount] = useState(0);
  const [openclose, setOpenClose] = useState(0);

  //To fetch all the data from database
  const Base_URL = "https://todoapp-production-4cf3.up.railway.app";
  const fetchData = async () => {
    const resp = await axios.get(`${Base_URL}/getAllTitels`);
    setAllTodo(resp.data);
    //  console.log(typeof resp.data[0].updatedAt);
    //  console.log(resp.data[0].updatedAt);
  };

  useEffect(() => {
    fetchData();
  }, [allTodo]);

  //To submit new Todo into database
  const submitdata = async () => {
    if (addTodo.trim() != 0) {
      const data = {
        title: addTodo,
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
    const resp = await axios.delete(`${Base_URL}/deleteTodo/${model._id}`);
    // console.log(resp);
  };

  const handletask = (model) => {
    if (openclose === 0) {
      setCount(model);
      setTask(model.todo.title);
      setOpenClose(1);
    } else {
      setCount(0);
      setOpenClose(0);
    }
  };

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
            <div className="flex flex-col justify-center  w-[500px] h-max items-center  ">
              <input
                type="text"
                autocomplete="off"
                id="AddTODO"
                AddTODO="AddTODO"
                className="rounded-xl w-full text-xl"
                placeholder="   Add TODO"
                value={addTodo}
                onChange={(event) => {
                  setAddTodo(event.target.value);
                }}
              />
              <label
                className="text-[#EFF54D] hover:bg-[#FF9F4A] px-3 py-2 rounded-md  mt-4 text-xl "
                onClick={() => handleSubmit()}
                for="AddTODO"
              >
                Add todos
              </label>
            </div>
          </form>

          <div className="flex flex-row-reverse  w-full justify-around space-y-2 mr-[10px] ">
            {/*this div for rendering todo  */}
            <div className="space-y-5  ">
              {/* {(!(allTodo))?(console.log(allTodo,"empty")):(console.log(allTodo,"Notempty"))} */}
              {allTodo &&
                allTodo.map((model) => (
                  <tr className="flex flex-row justify-between ">
                    {/* {(!(allTodo))?(console.log(allTodo,"empty")):(console.log(model.todo.title,"Notempty"))} */}

                    <div className="  flex flex-row justify-around w-max">
                      <td className="cursor-pointer  w-[100px] text-[#fff] text-lg font-semibold">
                        {model.todo.title}
                      </td>

                      <div>
                        <p>CreatedAt</p>
                        <p className="text-[#EFF54D]">
                          {/* {model.createdAt.substring(0, 10)} */}
                        </p>
                      </div>

                      <div className="ml-[30px]">
                        <p>UpdatedAt</p>

                        <p className="text-[#EFF54D]">
                          {model.updatedAt.substring(0, 10) ===
                          model.createdAt.substring(0, 10)
                            ? "Not yet Updated"
                            : model.updatedAt.substring(0, 10)}
                        </p>
                      </div>

                      <div>
                        <button
                          onClick={() => handletask(model)}
                          className="ml-[50px] hover:bg-[#FF9F4A] px-4  rounded-lg "
                        >
                          Tasks
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
                  </tr>
                ))}
            </div>

            <div>
              <tr>
                <td className="border-4 px-[20px] ">
                  {count === 0 ? (
                    ""
                  ) : (
                    <Addtask temp1={count.task} id={count._id} />
                    )}
                    </td>
              </tr>
            </div>

            {/* <div> <p> {date}</p></div> */}
            {/* this div for edit and delete buttons */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todoapp;

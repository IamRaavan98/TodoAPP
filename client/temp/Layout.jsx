import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Addtask from "./Addtask";
import EditTodo from "./EditTodo";
const Layout = () => {
  const [addTodo, setAddTodo] = useState("");
  const [allTodo, setAllTodo] = useState(null);
  const [count, setCount] = useState(false);

  const fetchData = async () => {
    const res1 = await axios.get("/getAllTitels");
    setAllTodo(res1.data);
  };

  useEffect(() => {
    fetchData();
  }, [allTodo]);

  const submitdata = async () => {
    const data = {
      title: addTodo,
    };
    await axios.post("/addtodo", data);
    // console.log(res);
  };
  // for todo submit
  const handleSubmit = (event) => {
    event.preventDefault();
    submitdata();
    setAddTodo("");
  };

  const handleEdit = (event) => {
    event.preventDefault();
    setCount(true);
  };

  return (
    <div>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="flex flex-row justify-center  items-center drawer-content">
          {/* home todo */}
          <label
            htmlFor="my-drawer"
            className="px-[40px] py-[20px] rounded-md cursor-pointer
bg-[#E89F0B] drawer-button"
          >
            TODO
          </label>
        </div>

        {/* side drawer todo */}
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <button onClick={handleSubmit}>Add todo</button>
            <input
              type="text"
              id="Todo"
              Todo="Todo"
              className="border-4 border-green-800"
              value={addTodo}
              onChange={(event) => {
                setAddTodo(event.target.value);
              }}
            />
            <tbody>
              {/* for printing  todo  */}
              {allTodo &&
                allTodo.map((data) => (
                  <div class="dropdown dropdown-right flex flex-col  ">
                    <label tabindex="0" class="cursor-pointer m-1">
                      <div>
                        <p className="border-4 border-black text-center">
                          {data.title}
                        </p>
                        <div className="flex flex-row justify-around mr-[0] mt-[100px]">
                          <button onClick={handleEdit}>
                            <EditTodo />
                          </button>
                          <button>Delete</button>
                        </div>
                      </div>
                    </label>

                    {/* for printing task on click of todo */}
                    <ul
                      tabindex="0"
                      class="dropdown-content menu   rounded-box w-52"
                    >
                      <li>
                        <Addtask temp1={data.title} id={data._id} />
                      </li>
                    </ul>
                  </div>
                ))}
            </tbody>
          </ul>
        </div>
      </div>

      {/* <label onClick={handleSubmit} htmlFor="Todo" className="">
        Add TODO
      </label>
      <input
        type="text"
        id="Todo"
        Todo="Todo"
        className="border-4 border-red-800"
        value={addTodo}
        onChange={(event) => {
          setAddTodo(event.target.value);
        }}
      /> */}
    </div>
  );
};

export default Layout;

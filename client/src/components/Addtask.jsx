import React, { useEffect, useState } from "react";
import axios from "axios";

const Addtask = (props) => {
  const [task, setTask] = useState(props.temp1.title);
  const [input, setInput] = useState("");
  const [symbol, setsymbol] = useState("💪");

const Base_URL = "https://todoapp-production-3a0b.up.railway.app";

 //SUBMIT DATA
  const submitdata = async () => {
    if (input.trim() != 0) {
      const date = handleDate();
      const sendData = {
        name: input,
        date: date,
      };
      setInput("")
      await axios.put(`${Base_URL}/addTaskInsideTodo/${props.id}`, sendData);
      // console.log(task,"hello");
    }
  };

  const fetchData = async () => {
    const res = await axios.put(`${Base_URL}/addTaskInsideTodo/${props.id}`);
    setTask(res.data.task.title);
  };

  useEffect(() => {
    fetchData();
  }, [task]);

  //DATE
  const handleDate = () => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
    return currentDate;
  };

  //SUBMIT
  const handleSubmit = () => {
    submitdata();

  };

  // DELETE
  const handleDelete = async (title) => {
        const data ={
          toDelete:title
        }
        // console.log(data);
    const resp = await axios.post(`${Base_URL}/deleteTask/${props.id}`,data);
    // console.log(resp);
  };

//EDIT
const handleEdit= async(title) =>{

  const newtitle = prompt("please enter title to edit");

    if (!newtitle) alert("Enter Title to Edit");
    else {
      const resp = await axios.put(`${Base_URL}/editTask/${props.id}`, {
        original:title,
        toEdit:newtitle
      });
      // console.log(resp);
    }
}

  return (
    <div className="flex flex-col justify-start ">

      <form  action="" method="get" onSubmit={handleSubmit}>
     <div className="flex flex-col justify-center items-center">
      <input
        type="text"
        id="task"
        task="task"
        className="border-4 border-green-800"
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
        }}
      />
      <label className="cursor-pointer"  onClick={() => (handleSubmit())}>Add Task</label>
      </div>
      </form>
      <div className="mr-[100px] ">
        {task &&
          task.map((title) => (
            <tr className="border-4 border-black w-[150px]">
              <td>{symbol} </td>
              <td>{title}</td>
              <div className="flex flex-row justify-around ml-[10px]">
                <button onClick={() => handleEdit(title)}>Edit</button>
                <button
                  onClick={() => handleDelete(title)}
                  className="ml-[10px]"
                >
                  Delete
                </button>
              </div>
            </tr>
          ))}
      </div>
    </div>
  );
};

export default Addtask;

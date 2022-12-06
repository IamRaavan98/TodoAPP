

import React, { useEffect, useState } from "react";
import axios from "axios";

const Addtask = (props) => {
  const [temp, setTemp] = useState(props.temp1);
  const [tasks, setTask] = useState(null);
  const [taskObject, setTaskObject] = useState("");
  const [symbol, setsymbol] = useState("💪")
  const submitdata = async () => {
      const sendData = {
        task: tasks,
      };

      await axios.put(`/addTaskInsideTodo/${props.id}`, sendData);
   
  };

  const fetchtask = async () => {
    const res = await axios.put(`/addTaskInsideTodo/${props.id}`);
    setTaskObject(res.data.task);
    //    console.log(res.data);
  };

  useEffect(() => {
    fetchtask();
  }, [tasks]);

  const handleSubmites = (event) => {
    event.preventDefault();
    submitdata();
    setTask("");
  };

  return (
    <div className="flex flex-col justify-start ">
      <button onClick={handleSubmites}>Add Task</button>
      <input
        type="text"
        id="task"
        task="task"
        className="border-4 border-green-800"
        value={tasks}
        onChange={(event) => {
          setTask(event.target.value);
        }}
      />

      <div className="mr-[100px] ">
        {taskObject &&
          taskObject.map((alltasks) => (
          <tr className="border-4 border-black w-[150px]" >
            <td>{symbol} </td>
            <td>{alltasks}</td>
          </tr>
          
          ))}
      </div>

    </div>
  );
};

export default Addtask;
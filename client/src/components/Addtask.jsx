import React, { useEffect, useState } from "react";
import axios from "axios";

const Addtask = (props) => {
  const [task, setTask] = useState(props.title);
  const [tasktodoId, setTaskTodoId] = useState(null)
  
  const [input, setInput] = useState(null);
  const [symbol, setsymbol] = useState("💪");
  const [bigObj, setBigObj] = useState(props.BigObj.task)
// console.log(props.BigObj.task);
  const Base_URL = "https://todoapp-production-4cf3.up.railway.app";
  // const Base_URL = "http://localhost:3000"
  //SUBMIT DATA
 
  const submitdata = async () => {
    if(input.trim() != 0) {
    
      const sendData = {
        name: input,
        email:props.BigObj.email,
        tasktodo:task
      };
      setInput(" ");
      if(tasktodoId){
        // console.log(tasktodoId,"brother");
        const res  = await axios.put(`${Base_URL}/addTaskInsideTodo/${tasktodoId}`, sendData);
      }
    }
  };

  const fetchData = async () => {

    const res = await axios.get(`${Base_URL}/getAllTitels`);
       setBigObj(res.data.task)
   
  };

  fetchData();
  
  //SUBMIT
  const handleSubmit =async () => {
   
    
    for (let index = 0; index < bigObj.length; index++) {

      if(task === bigObj[index].tasktodo){
        setTaskTodoId(bigObj[index]._id)
        submitdata();
        return(0)
      }   
    }

  };


// DELETE
        const handleDelete = async(title)=>{
               
          const sendData = {
            name:title,
            email:props.BigObj.email,
            tasktodo:task
          };
          setInput("");
          
            const res  = await axios.post(`${Base_URL}/deleteTask`, sendData);
         

        }

  // // DELETE
  // const handleDelete = async (title) => {
  //   const data = {
  //     toDelete: title,
  //   };
  //   // console.log(data);
  //   const resp = await axios.post(`${Base_URL}/deleteTask/${props.id}`, data);
  //   // console.log(resp);
  // };

  // //EDIT
  // const handleEdit = async (title) => {
  //   const newtitle = prompt("please enter title to edit");

  //   if (!newtitle) alert("Enter Title to Edit");
  //   else {
  //     const resp = await axios.put(`${Base_URL}/editTask/${props.id}`, {
  //       original: title,
  //       toEdit: newtitle,
  //     });
  //     // console.log(resp);
  //   }
  // };


  
function handleOuterArray(array1){
  if(array1.tasktodo === task){
   const array2 = array1.title 
    return(
      <p>
        {array2&&array2.map((title)=>(
          <div className="flex flex-row">
           
          <h1>{title}</h1>
          <button
                  onClick={() => handleDelete(title)}
                  className="ml-[10px] font-medium text-lg hover:bg-[#FF9F4A] px-4  rounded-lg "
                >
                  Delete
                </button>
          </div>
        ))}

      </p>
    )
  }
  else{
    return(null)
  }
}
  return (
    <div className="relative left-20 flex flex-col justify-start ">
      <form action="" method="get" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center">
          <input
            type="text"
            id="task"
            autocomplete="off"
            placeholder="  Add Task"
            task="task"
            className="rounded-xl"
            value={input}
            defaultChecked
            onfocus="this.placeholder=''"
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
          <label
            className=" hover:text-[#ff9f4a] hover:font-extrabold"
            onClick={() => handleSubmit()}
          >
            Add Task
          </label>
        </div>
      </form>

        <div>
          {
            bigObj&&bigObj.map((array1)=>(
              <tr>
                <td >{handleOuterArray(array1)}
 </td>
                  
                </tr>
            ))
          }
        </div>



      {/* <div className="mr-[100px] ">
        {task &&
          task.map((title) => (
            <tr className="border-4 border-black w-[150px]">
              <td>{symbol} </td>
              <td>{title}</td>
              <div className="flex flex-row justify-around ml-[10px]">
                <button
                  onClick={() => handleEdit(title)}
                  className="ml-[10px] font-medium text-lg hover:bg-[#FF9F4A] px-4  rounded-lg "
                >
                  Edit
                </button>

               
              </div>
            </tr>
          ))}
      </div> */}
    </div>
  );
};

export default Addtask;

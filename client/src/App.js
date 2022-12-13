import React from "react";
import {Routes, Route} from "react-router-dom"
import Todoapp from "./components/Todoapp";
import Signup from "./components/Signup";
import Login from "./components/Login";
function App(){
    return(
        <>
        
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/Home" element={<Todoapp/>}/>
        </Routes>
        </>
    );
}
export default App;

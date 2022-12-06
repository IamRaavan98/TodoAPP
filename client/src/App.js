import React from "react";
import {Routes, Route} from "react-router-dom"
import Todoapp from "./components/Todoapp";
import Signup from "./components/Signup";
import Login from "./components/Login";
function App(){
    return(
        <>
        <Routes>
          <Route path="/" element={<Todoapp/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
        </>
    );
}
export default App;


import React from "react";
import Userinfo from "./Userinfo";
import { Routes,Route } from "react-router-dom";
import HomePage from "./HomePage";
const App=()=>{
  return(
    <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/Userinfo/:id" element={<Userinfo />} />
    </Routes>
    </>
  )
}

export default App;
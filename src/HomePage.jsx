import axios from "axios";
import { useState,useEffect } from "react";
import './App.css';
import { useNavigate } from "react-router-dom";
const HomePage=()=>{
  const Navigate = useNavigate()
  const [data,setData]=useState(null);
  const fetchUser= async()=>{
    const response = await axios.get("https://650dab9aa8b42265ec2c92e7.mockapi.io/userdata");
    console.log(response.data)
    setData(response.data)
  }
  useEffect(()=>{
    fetchUser()
  },[])

  const handleClick=(id)=>{
    Navigate(`/Userinfo/${id}`)
  }
    return(
        <>
        <h1>Leave Form</h1>

        {
      data?.map((elem,j)=>{return(
        <div key={j} className="box">
          <h2>{elem.Name}</h2>
          <button className="btn" onClick={()=>handleClick(elem.id)}>Click</button>
        </div>
        )})
    }
        </>
    )
}

export default HomePage;
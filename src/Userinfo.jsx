import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './App.css';
const Userinfo=()=>{
    const Navigate = useNavigate();
    const {id} = useParams();
    const[user,setUser]=useState(null)
    const[leavebal,Setleavebal]=useState(10);
    const [selectedType, setSelectedType] = useState("");
    const [isApproved, setIsApproved] = useState(false);
    const [notes, setNotes] = useState("");
    useEffect(()=>{
        fetchData()
    },[id])
    const fetchData = () => {
        axios.get(`https://650dab9aa8b42265ec2c92e7.mockapi.io/userdata/${id}`)
            .then((res) => {
                setUser(res.data);
                // Setleavebal(res?.data?.leaveBalance);
                const apiLeaveBalance = res?.data?.leaveBalance;
                Setleavebal(apiLeaveBalance !== undefined ? apiLeaveBalance : 10);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };
    const handlechange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    const handleSubmit=()=>{
        if (!isApproved) {
        alert("Please Select Approved By Manager")
    }
    else if (!notes.trim()) {
        alert("Please provide notes");
    }
    else if(leavebal===0){
        alert("Cannot Apply For The Leave Please Check The Leave Balance")
    }
    else{
        const updatedLeaveBal = leavebal - 1;
        const formData = {
            leaveBalance: updatedLeaveBal,
            selectedType: selectedType,
            notes: notes,
            isApproved: isApproved
        };
        axios.put(`https://650dab9aa8b42265ec2c92e7.mockapi.io/userdata/${id}`,formData)
        .then(()=>{
            Setleavebal(updatedLeaveBal);
            alert("Leave Applied")
        })
    }
}
    const BackToHome=()=>{
        Navigate("/")
    }
    console.log(user);
    return(
        <div className="InfoBox">
        <h1>UserInfo</h1>
        <div className="userinfo">
        <input type="text" name="employeeName" value={user?.Name} onChange={handlechange}/>
        <h3>Leave Balance : {leavebal}</h3>
        {/* <h3 style={{display:"inline-block"}}>Type:</h3>
        <input type="radio" name="Type" id="" checked={selectedType === "Half Day"}
         onChange={() => setSelectedType("Half Day")}/>Half Day
        <input type="radio" name="Type" id="" checked={selectedType === "Full Day"}
         onChange={() => setSelectedType("Full Day")}/>Full Day
        {selectedType === "Half Day" && (
                <div>
                    <h3>Reason For The Leave</h3>
                    <textarea
                        name="halfDayTextarea"
                        rows="4"
                        cols="50"
                        placeholder="Enter your message for Half Day"
                    />
                </div>
            )}
            {selectedType === "Full Day" && (
                <div>
                    <h3>Calender</h3>
                </div>
            )} */}
            <h3>Notes</h3>
            <textarea name="halfDayTextarea" rows="4" cols="50" className="notes" style={{display:"block"}} value={notes} onChange={(e) => setNotes(e.target.value)}/>
            <input type="checkbox" id="" style={{display:"inline-block"}} name="isApproved" checked={isApproved} onChange={() => setIsApproved(!isApproved)}/><h3 style={{display:"inline-block"}}>Is Approved By Manager</h3>
            <button onClick={()=>handleSubmit()}>Apply</button>
            <button onClick={()=>BackToHome()}>Go Back</button>
        </div>
        </div>
    )
}

export default Userinfo;
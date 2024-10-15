import axios from "axios";
import { useState } from "react";
import "./style.css"
import { useNavigate } from "react-router";



function CreateAcc() {
const [user,setUser]=useState("");
const [password,setPassword]=useState("");
const navigate=useNavigate();

const handleSubmit=async(e)=>{
  e.preventDefault();
  try{
   const resp=await axios.post("http://localhost:4001/create-user",{user,password});
   
   console.log("User created successfully",resp);
  navigate("/login")
  }
  catch(error){
    console.log("User creation failed",error);
  }

}

  return (
    <div className="login">
      <h1> Create an Account</h1>
     <form >
     User Name: <input type="text" onChange={(e)=>setUser(e.target.value)}/> <br/>
     Password: <input type="password" onChange={(e)=>setPassword(e.target.value)} /><br/>
     <button onClick={handleSubmit}>Create</button>

     </form > 
    </div>
  );
}

export default CreateAcc;

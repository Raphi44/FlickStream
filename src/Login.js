import { useState } from "react";
import axios from "axios"
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function LoginPage() {
  const [userName,setUserName]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState("");
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{

    
    const {data:token}= await axios.post("http://localhost:4001/login",{user:userName,password:password});

    sessionStorage.setItem('token',token);
    sessionStorage.setItem('user name',userName);
    const {data:userLoginData}= await axios.post("http://localhost:4001/user",{user:userName});
    const {data:userProfileData}=await axios.get(`http://localhost:4001/user/${userLoginData._id}`);
    const fullName=userProfileData.userProfile.FirstName+" "+userProfileData.userProfile.LastName;

    sessionStorage.setItem('userPermissions',userProfileData.userPermissions.permissions)

    dispatch({type:'ADD_UNAME',payload:fullName});


    
    dispatch({type:'ADD_PERMISSIONS',payload:userProfileData.userPermissions.permissions});
    

    navigate("/Main");

  }
  catch(err){

    if(err.response&&err.response.status===400)
      {
      setError(err.response.data.error);
      setPassword("");
      }
  }
}

  
  return (
  
    <div className="login">
    
    <form onSubmit={handleSubmit}>
    <span className="underline-image" > <img style={{inlineSize:"20px",marginRight:"2px"}} src="./avatar.png" alt="user icon" /> UserName: 
    <input className="input-no-border" value={userName} type="text"   onChange={(e)=>setUserName(e.target.value)} /> </span> <br/>

   <span className="underline-image"> <img src="./padlock.png" style={{inlineSize:"20px",marginRight:"5px"}} alt="password icon"/>Password: 
   <input className="input-no-border"  value={password} type="password"  onChange={(e)=>setPassword(e.target.value)} /> </span> <br/>
   
   <button type="submit" className="login-button">Login</button> <br />
   </form>
   {error&&<p>{error}</p>}
   <p>New User ? : <Link to="/Create-Account" >Create Account</Link> </p>

   </div>
    
    
  );
}

export default LoginPage;

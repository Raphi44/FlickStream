import { useLocation, useNavigate } from "react-router"
import "../../style.css"
import { useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";

const EditMember = () => {
    const location=useLocation();
    const member=location.state;
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [memberName,setMemberName]=useState(member.Name)
    const [memberEmail,setMemberEmail]=useState(member.Email)
    const [memberCity,setMemberCity]=useState(member.City)


    const handleSubmit=async()=>{
        const resp=await axios.patch(`http://localhost:4000/edit-member/${member._id}`,{Name:memberName,Email:memberEmail,City:memberCity});
        console.log(resp,"Member updated succesfully");
        dispatch({type:'UPDATE',payload:{_id:member._id,Name:memberName,Email:memberEmail,City:memberCity},reducerKey:'members'})
        navigate("/Main/Subscriptions");
    }
  return (
    <div className="page-border1">
        <h3 style={{marginTop:"25px",fontWeight:"bold"}}>Members <br/><br/><br/>
        Edit Member : {member.Name}  <br/> </h3><br/>
        <form onSubmit={e=>{e.preventDefault();handleSubmit();}}>
        Name : <input placeholder={memberName} onChange={(e)=>setMemberName(e.target.value)} /> <br/>
        Email : <input type="email" placeholder={memberEmail} onChange={(e)=>setMemberEmail(e.target.value)} /> <br/>
        City : <input placeholder={memberCity} onChange={(e)=>setMemberCity(e.target.value)} /> <br/><br/>


        <button type="submit">update</button>
        <button type="button"style={{marginLeft:"5px"}} onClick={()=>navigate("/Main/Subscriptions/all-members")}>cancle </button> <br/><br/>
        </form>
        
        
    </div>
  )
}

export default EditMember
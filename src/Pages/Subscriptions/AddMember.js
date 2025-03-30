import { useState } from "react"
import "../../style.css"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import axios from 'axios';

const AddMember = () => {
    const [memberName,setMemberName]=useState()
    const [memberEmail,setMemberEmail]=useState()
    const [memberCity,setMemberCity]=useState()
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleSubmit=async()=>{
        const {data}=await axios.post('http://localhost:4000/add-member',{Name:memberName,Email:memberEmail,City:memberCity});
        dispatch({type:"ADD",payload:{_id:data._id,Name:memberName,Email:memberEmail,City:memberCity},reducerKey:'members'});
        navigate('/Main/Subscriptions');

    }

  return (
    <div className="page-border3"> <br/>
    <h4 style={{fontWeight:"bold"}}>Add new Member</h4> <br/>
    
    <form onSubmit={e=>{e.preventDefault();handleSubmit();}}>
        Name : <input  onChange={(e)=>setMemberName(e.target.value)} /> <br/>
        Email : <input type="email"  onChange={(e)=>setMemberEmail(e.target.value)} /> <br/>
        City : <input onChange={(e)=>setMemberCity(e.target.value)} /> <br/><br/>


        <button type="submit">save</button>
        <button type="button"style={{marginLeft:"5px"}} onClick={()=>navigate("/Main/Subscriptions/all-members")}>cancle </button> <br/><br/>
    </form>
    
    </div>
   

  )
}

export default AddMember
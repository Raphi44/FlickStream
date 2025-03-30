import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import Member from './Member';


const AllMembers = () => {
const location=useLocation();
const [memberName,setMemberName]=useState("")
const {members}=useSelector(state=>state.members);
useEffect(()=>{
  if (!location.state?.memberName) {
    setMemberName("");
  }
  else{
    setMemberName(location.state.memberName);

  }
},[location.state?.memberName,memberName])


  return (
    <div>
    <ul className="unorderlist">
        {members.filter(member=>memberName===""?member:memberName===member.Name).map(member=>{return(
            <li key={member._id} ><Member member={member}/></li>
       ) })}
    </ul>
    
    </div>
)};

export default AllMembers;

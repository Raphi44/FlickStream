import { useSelector } from "react-redux";
import User from "./User";
import { Outlet, useNavigate } from "react-router";
import {  useEffect, useState } from "react";

const Users = () => {
  const {users:storeUsers} = useSelector((state) => state.users);
  const [users,setUsers]=useState(storeUsers)
  const [viewUsers,setViewUsers]=useState(true);
  const navigate=useNavigate();
  const [bgButton,setBgButton]=useState("0");

  useEffect(()=>{
    setUsers(storeUsers);

  },[storeUsers])

  const getUserUpdates=(id)=>{
    setUsers(users.filter(user=>user._id!==+id))
    
  }
  return (
    <>
      <button style={bgButton==="1"?{backgroundColor:"yellow"}:null} onClick={()=>{setBgButton("1");navigate("/Main/Users-Management/all-users"); setViewUsers(true) }}>All Users</button>
      <button style={{...(bgButton==="2"?{backgroundColor:"yellow"}:null) ,marginLeft: "5px" }} onClick={()=>{setBgButton("2"); navigate("/Main/Users-Management/all-users/add-user") ; setViewUsers(false)}}>Add User</button>
    {viewUsers&&  <ul className="unorderlist">
        {users?.map((user) => {
          return (
            <li key={user._id}>
              <User user={user} getUserUpdates={getUserUpdates} />{" "}
            </li>
          );
        })}
      </ul>} <br/>
      <Outlet/>
    </>
  );
};

export default Users;

import { useSelector } from "react-redux";
import User from "./User";
import { Outlet, useNavigate } from "react-router";
import {  useEffect, useState } from "react";

const Users = () => {
  const {users:storeUsers} = useSelector((state) => state.users);
  const [users,setUsers]=useState(storeUsers)
  const [viewUsers,setViewUsers]=useState(true);
  const navigate=useNavigate();
  useEffect(()=>{
    setUsers(storeUsers);

  },[storeUsers])

  const getUserUpdates=(id)=>{
    setUsers(users.filter(user=>user._id!==+id))
    
  }
  return (
    <>
      <button onClick={()=>{navigate("/Main/Users-Management/all-users"); setViewUsers(true) }}>All Users</button>
      <button style={{ marginLeft: "5px" }} onClick={()=>{navigate("/Main/Users-Management/all-users/add-user"); setViewUsers(false)}}>Add User</button>
    {viewUsers&&  <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
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

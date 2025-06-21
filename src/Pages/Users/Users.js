import { useSelector } from "react-redux";
import User from "./User";
import { Outlet, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import "../../styles/components.css";

const Users = () => {
  const {users:storeUsers} = useSelector((state) => state.users);
  const [users,setUsers]=useState(storeUsers)
  const [viewUsers,setViewUsers]=useState(true);
  const navigate=useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  useEffect(()=>{
    setUsers(storeUsers);
  },[storeUsers])

  const getUserUpdates=(id)=>{
    setUsers(users.filter(user=>user._id!==+id))
  }

  return (
    <div className="users-container">
      <div className="users-header">
        <h1 className="section-title">Users</h1>
        <div className="movies-nav-buttons">
          <button
            className={`movies-nav-button ${activeTab === "all" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("all");
              navigate("/Main/Users-Management/all-users");
              setViewUsers(true);
            }}
          >
            All Users
          </button>
          <button
            className={`movies-nav-button ${activeTab === "add" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("add");
              navigate("/Main/Users-Management/all-users/add-user");
              setViewUsers(false);
            }}
          >
            Add User
          </button>
        </div>
      </div>

      {viewUsers && (
        <ul className="unorderlist">
          {users?.map((user) => {
            return (
              <li key={user._id}>
                <User user={user} getUserUpdates={getUserUpdates} />
              </li>
            );
          })}
        </ul>
      )}
      <br/>
      <Outlet/>
    </div>
  );
};

export default Users;

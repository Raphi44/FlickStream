import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "../style.css";
import { getMembers, getMovies, getSubs, getUsers } from "../redux/allReducers";

function MainPage() {
  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const [bgButton,setBgButton]=useState("0");
  const { userName } = useSelector((state) => state.userProfile);
  const navigate = useNavigate();
  const logOut = () => {
    sessionStorage.removeItem("token");
    navigate("/Login");
  };



  const movies=useSelector(getMovies);
  const subs=useSelector(getSubs);
  const users=useSelector(getUsers);
  const members=useSelector(getMembers);

  const dispatch = useDispatch();


  useEffect(() => {
   
    const fetchUserDaTa = async () => {
        if(users.length===0){
      const { data:usersData } = await axios.get("http://localhost:4001/users");
      usersData.users.map((user) =>
        dispatch({ type: "ADD", payload: {_id:user._id,user:user.user}, reducerKey: "users" })
      );
      usersData.usersProfile.Users.map((userProfile) =>
        dispatch({ type: "ADD", payload: userProfile, reducerKey: "profiles" })
      );
      usersData.usersPermissions.userPermissions.map((userPermissions) =>
        dispatch({
          type: "ADD",
          payload: userPermissions,
          reducerKey: "permissions",
        })
      );
    }

      if(movies.length===0){
      const { data: moviesData } = await axios.get(`http://localhost:4000/movies`);
      moviesData.forEach((movie) => {
        dispatch({ type: "ADD", payload: movie, reducerKey: "movies" });
        
      });
      if(moviesData.length===0){
        await axios.get("http://localhost:4000/");
      }
    }


      

    if(members.length===0){
      const { data: membersData } = await axios.get(`http://localhost:4000/members`);
      membersData.forEach((member) => {
        dispatch({ type: "ADD", payload: member, reducerKey: "members" });
      });
      if(membersData.length===0){
        await axios.get("http://localhost:4000/");
      }
    }

    if(subs.length===0){
      const { data: subsData } = await axios.get("http://localhost:4000/subscriptions");
      subsData.forEach((sub) => {
        dispatch({ type: "ADD", payload: sub, reducerKey: "subscriptions" });
      });
    }
  };


    fetchUserDaTa();
  }, [dispatch]);

  return (
    <>
      <div className="header-container">
        <h1>Movies - Subscriptions Web Site</h1>{" "}
        <h3 className="username">{userName}</h3>
        <br />
      </div>
      <button style={bgButton==="1"?{backgroundColor:"yellow"}:null} onClick={() =>{setBgButton("1"); navigate("/Main/Movies")}}>Movies</button>
      <button style={bgButton==="2"?{backgroundColor:"yellow"}:null} onClick={() =>{setBgButton("2"); navigate("/Main/Subscriptions")}}>
        Subscriptions
      </button>
      {decodedToken.role === "admin" && (
        <button style={bgButton==="3"?{backgroundColor:"yellow"}:null} onClick={() => { setBgButton("3"); navigate("/Main/Users-Management")}}>
          Users Management
        </button>
      )}
      <button onClick={logOut}>Log Out</button> <br />
      <Outlet />
    </>
  );
}

export default MainPage;

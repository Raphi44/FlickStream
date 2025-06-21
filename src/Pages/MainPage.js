import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getMembers, getMovies, getSubs, getUsers } from "../redux/allReducers";

function MainPage() {
  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const [activeNav, setActiveNav] = useState("movies");
  const [isScrolled, setIsScrolled] = useState(false);
  const { userName } = useSelector((state) => state.userProfile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const movies = useSelector(getMovies);
  const subs = useSelector(getSubs);
  const users = useSelector(getUsers);
  const members = useSelector(getMembers);

  const logOut = () => {
    sessionStorage.removeItem("token");
    navigate("/Login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if(users.length === 0) {
        const { data: usersData } = await axios.get("http://localhost:4001/users");
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

      if(movies.length === 0) {
        const { data: moviesData } = await axios.get(`http://localhost:4000/movies`);
        moviesData.forEach((movie) => {
          dispatch({ type: "ADD", payload: movie, reducerKey: "movies" });
        });
        if(moviesData.length === 0) {
          await axios.get("http://localhost:4000/");
        }
      }

      if(members.length === 0) {
        const { data: membersData } = await axios.get(`http://localhost:4000/members`);
        membersData.forEach((member) => {
          dispatch({ type: "ADD", payload: member, reducerKey: "members" });
        });
        if(membersData.length === 0) {
          await axios.get("http://localhost:4000/");
        }
      }

      if(subs.length === 0) {
        const { data: subsData } = await axios.get("http://localhost:4000/subscriptions");
        subsData.forEach((sub) => {
          dispatch({ type: "ADD", payload: sub, reducerKey: "subscriptions" });
        });
      }
    };

    fetchUserData();
  }, [dispatch, users.length, movies.length, members.length, subs.length]);

  return (
    <div className="app-wrapper">
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-content">
          <div className="nav-brand">
            <h1 className="nav-title">Movies & Subscriptions</h1>
          </div>
          <div className="nav-links">
            <button 
              className={`nav-link ${activeNav === "movies" ? "active" : ""}`}
              onClick={() => {
                setActiveNav("movies");
                navigate("/Main/Movies");
              }}
            >
              Movies
            </button>
            <button 
              className={`nav-link ${activeNav === "subscriptions" ? "active" : ""}`}
              onClick={() => {
                setActiveNav("subscriptions");
                navigate("/Main/Subscriptions");
              }}
            >
              Subscriptions
            </button>
            {decodedToken.role === "admin" && (
              <button 
                className={`nav-link ${activeNav === "users" ? "active" : ""}`}
                onClick={() => {
                  setActiveNav("users");
                  navigate("/Main/Users-Management");
                }}
              >
                Users Management
              </button>
            )}
          </div>
          <div className="nav-user">
            <span className="username">{userName}</span>
            <button className="btn btn-secondary" onClick={logOut}>Logout</button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default MainPage;

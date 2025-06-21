import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { getMovies } from "../../redux/allReducers";

function Movies() {
  const navigate = useNavigate();
  const location = useLocation();
  const [findMovie, setFindMovie] = useState("");
  const [searchVisibility, setSearchVisibility] = useState(true);
  const [editPageVisibility, setEditPageVisibility] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const movies = useSelector(getMovies);

  const handleNavigation = () => {
    navigate("/Main/Movies/all-movies", { state: { findMovie } });
  };

  useEffect(() => {
    if(location.pathname === "/Main/Movies/add-movie") {
      setSearchVisibility(false);
    } else {
      setSearchVisibility(true);
    }

    if(location.pathname === '/Main/Movies/edit-movie') {
      setEditPageVisibility(false);
    } else {
      setEditPageVisibility(true);
    }
  }, [location]);

  return (
    <div className="movies-container">
      <div className="movies-header">
        <h1 className="section-title">Movies</h1>
        <div className="movies-nav-buttons">
          <button
            className={`movies-nav-button ${activeTab === "all" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("all");
              handleNavigation();
            }}
          >
            All Movies
          </button>
          <button
            className={`movies-nav-button ${activeTab === "add" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("add");
              navigate("add-movie");
            }}
          >
            Add Movie
          </button>
        </div>
      </div>

      <div className="movies-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Movies;
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import "../../styles/components.css";
const subscriptions_API=process.env.REACT_APP_SUBSCRIPTION_API_URL
const cinema_API=process.env.REACT_APP_CINEMA_API_URL

const AddUser = () => {
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [uName, setUname] = useState("");
  const [sto, setSto] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [viewSubChecked, setViewSubChecked] = useState(false);
  const [viewMovieChecked, setViewMovieChecked] = useState(false);
  const [userId, setUserId] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const fullDate = day + "/" + month + "/" + year;

  const handleSubmit = async (e) => {
    await axios.post(`${cinema_API}/add-user`, { userId, fName, lName, uName, fullDate, sto, permissions });
    dispatch({ type: "ADD", payload: { _id: userId, user: uName }, reducerKey: "users" });
    dispatch({ type: 'ADD', payload: { id: userId, FirstName: fName, LastName: lName, CreatedDate: fullDate, SessionTimeOut: sto }, reducerKey: "profiles" });
    dispatch({ type: "ADD", payload: { id: userId, permissions }, reducerKey: "permissions" });
    navigate("/Main");
  }

  const handleChanges = (e) => {
    const { checked, value } = e.target;
    if (checked)
      setPermissions([...permissions, value]);
    else
      setPermissions(permissions.filter(perm => perm !== value));
  }

  useEffect(() => {
    if (
      permissions.includes("CreateSubscriptions") &&
      permissions.includes("DeleteSubscriptions") &&
      permissions.includes("UpdateSubscriptions")
    ) {
      setViewSubChecked(true);
      if (!permissions.includes("ViewSubscriptions"))
        setPermissions([...permissions, "ViewSubscriptions"])
    }
    else
      setViewSubChecked(false);

    if (
      permissions.includes("CreateMovies") &&
      permissions.includes("DeleteMovies") &&
      permissions.includes("UpdateMovies")
    ) {
      setViewMovieChecked(true);
      if (!permissions.includes("ViewMovies"))
        setPermissions([...permissions, "ViewMovies"])
    }
    else
      setViewMovieChecked(false);
  }, [permissions, viewSubChecked, viewMovieChecked]);

  return (
    <div className="form-container">
      <h2 className="form-title">Add New User</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
        <div className="form-group">
          <label className="form-label">User ID</label>
          <input
            type="number"
            className="form-input"
            onChange={(e) => setUserId(+e.target.value)}
            placeholder="Enter user ID"
          />
        </div>

        <div className="form-group">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-input"
            onChange={(e) => setFname(e.target.value)}
            placeholder="Enter first name"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-input"
            onChange={(e) => setLname(e.target.value)}
            placeholder="Enter last name"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-input"
            onChange={(e) => setUname(e.target.value)}
            placeholder="Enter username"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Session Timeout (Minutes)</label>
          <input
            type="number"
            className="form-input"
            onChange={(e) => setSto(e.target.value)}
            placeholder="Enter session timeout"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Permissions</label>
          <div className="permissions-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                value="ViewSubscriptions"
                checked={permissions.includes("ViewSubscriptions") || viewSubChecked}
                onChange={(e) => handleChanges(e)}
              />
              View Subscriptions
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                value="CreateSubscriptions"
                checked={permissions.includes("CreateSubscriptions")}
                onChange={(e) => handleChanges(e)}
              />
              Create Subscriptions
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                value="DeleteSubscriptions"
                checked={permissions.includes("DeleteSubscriptions")}
                onChange={(e) => handleChanges(e)}
              />
              Delete Subscriptions
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                value="UpdateSubscriptions"
                checked={permissions.includes("UpdateSubscriptions")}
                onChange={(e) => handleChanges(e)}
              />
              Update Subscriptions
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                value="ViewMovies"
                checked={permissions.includes("ViewMovies")}
                onChange={(e) => handleChanges(e)}
              />
              View Movies
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                value="CreateMovies"
                checked={permissions.includes("CreateMovies")}
                onChange={(e) => handleChanges(e)}
              />
              Create Movies
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                value="DeleteMovies"
                checked={permissions.includes("DeleteMovies")}
                onChange={(e) => handleChanges(e)}
              />
              Delete Movies
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                value="UpdateMovies"
                checked={permissions.includes("UpdateMovies")}
                onChange={(e) => handleChanges(e)}
              />
              Update Movies
            </label>
          </div>
        </div>

        <div className="form-group">
          <button type="submit" className="form-submit-button">Save</button>
          <button 
            type="button" 
            className="form-cancel-button"
            onClick={() => navigate("/Main/Users-Management/all-users")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUser;
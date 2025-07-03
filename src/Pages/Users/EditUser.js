import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/components.css";
const subscriptions_API=process.env.REACT_APP_SUBSCRIPTION_API_URL
const cinema_API=process.env.REACT_APP_CINEMA_API_URL

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { profiles } = useSelector((state) => state.profiles);
  const profile = profiles.find((user) => user.id === +id) || {};

  const { users } = useSelector((state) => state.users);
  const user = users.find((user) => user._id === +id) || {};

  const { permissions } = useSelector((state) => state.permissions);
  const userPermissions = permissions?.find(
    (user) => user.id === +id
  )?.permissions || [];

  const [updatedPermissions, setUpdatedPermissions] = useState(userPermissions);
  const [fName, setFname] = useState(profile.FirstName);
  const [lName, setLname] = useState(profile.LastName);
  const [uName, setUname] = useState(user.user);
  const [sto, setSto] = useState(profile.SessionTimeOut);
  const [viewSubChecked, setViewSubChecked] = useState(updatedPermissions.includes("ViewSubscriptions"));
  const [viewMovieChecked, setViewMovieChecked] = useState(updatedPermissions.includes("ViewMovies"));
  const { userName } = useSelector(state => state.userProfile);
  const editedUserName = profile.FirstName + " " + profile.LastName;

  const handleChanges = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setUpdatedPermissions([...updatedPermissions, value]);
    } else {
      setUpdatedPermissions(updatedPermissions.filter((perm) => perm !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUserProfile = {
      firstName: fName,
      lastName: lName,
      sessionTimeOut: sto,
    };

    if (editedUserName === userName) {
      await dispatch({ type: "UPDATE_PERMISSIONS", payload: updatedPermissions });
    }
    await dispatch({ type: "UPDATE", payload: { id: +id, updatedPermissions }, reducerKey: "permissions" });
    await dispatch({ type: 'UPDATE', payload: updatedPermissions, reducerKey: "userProfile" });
    await dispatch({ type: "UPDATE", payload: { id: +id, updatedUserProfile }, reducerKey: "profiles" });
    await dispatch({ type: 'UPDATE', payload: { id: +id, user: uName }, reducerKey: "users" });

    const resp = await axios.patch(`${cinema_API}/user/${id}`, {
      user: uName,
      updatedUserProfile,
      updatedPermissions,
    });
    navigate("/Main/Users-Management/all-users");
  };

  useEffect(() => {
    if (
      updatedPermissions.includes("CreateSubscriptions") &&
      updatedPermissions.includes("DeleteSubscriptions") &&
      updatedPermissions.includes("UpdateSubscriptions")
    ) {
      setViewSubChecked(true);
      if (!updatedPermissions.includes("ViewSubscriptions")) {
        setUpdatedPermissions([...updatedPermissions, "ViewSubscriptions"]);
      }
    } else {
      setViewSubChecked(false);
    }

    if (
      updatedPermissions.includes("CreateMovies") &&
      updatedPermissions.includes("DeleteMovies") &&
      updatedPermissions.includes("UpdateMovies")
    ) {
      setViewMovieChecked(true);
      if (!updatedPermissions.includes("ViewMovies")) {
        setUpdatedPermissions([...updatedPermissions, "ViewMovies"]);
      }
    } else {
      setViewMovieChecked(false);
    }
  }, [updatedPermissions, viewSubChecked, viewMovieChecked, permissions]);

  return (
    <div className="edit-user-form">
      <h2>Edit User: {profile.FirstName} {profile.LastName}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            value={fName}
            onChange={(e) => setFname(e.target.value)}
            placeholder={profile.FirstName}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            value={lName}
            onChange={(e) => setLname(e.target.value)}
            placeholder={profile.LastName}
          />
        </div>

        <div className="form-group">
          <label htmlFor="userName">Username</label>
          <input
            id="userName"
            type="text"
            value={uName}
            onChange={(e) => setUname(e.target.value)}
            placeholder={user.user}
          />
        </div>

        <div className="form-group">
          <label htmlFor="sessionTimeout">Session Timeout (Minutes)</label>
          <input
            id="sessionTimeout"
            type="number"
            value={sto}
            onChange={(e) => setSto(e.target.value)}
            placeholder={profile.SessionTimeOut}
          />
        </div>

        <div className="form-group">
          <label>Created Date: {profile.CreatedDate}</label>
        </div>

        <div className="checkbox-group">
          <h3>Permissions</h3>
          <label className="checkbox-label">
            <input
              type="checkbox"
              value="ViewSubscriptions"
              checked={updatedPermissions.includes("ViewSubscriptions") || viewSubChecked}
              onChange={handleChanges}
            />
            View Subscriptions
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              value="CreateSubscriptions"
              checked={updatedPermissions.includes("CreateSubscriptions")}
              onChange={handleChanges}
            />
            Create Subscriptions
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              value="DeleteSubscriptions"
              checked={updatedPermissions.includes("DeleteSubscriptions")}
              onChange={handleChanges}
            />
            Delete Subscriptions
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              value="UpdateSubscriptions"
              checked={updatedPermissions.includes("UpdateSubscriptions")}
              onChange={handleChanges}
            />
            Update Subscriptions
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              value="ViewMovies"
              checked={updatedPermissions.includes("ViewMovies")}
              onChange={handleChanges}
            />
            View Movies
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              value="CreateMovies"
              checked={updatedPermissions.includes("CreateMovies")}
              onChange={handleChanges}
            />
            Create Movies
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              value="DeleteMovies"
              checked={updatedPermissions.includes("DeleteMovies")}
              onChange={handleChanges}
            />
            Delete Movies
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              value="UpdateMovies"
              checked={updatedPermissions.includes("UpdateMovies")}
              onChange={handleChanges}
            />
            Update Movies
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="update-button">
            Update
          </button>
          <button 
            type="button" 
            className="cancel-button"
            onClick={() => navigate("/Main/Users-Management/all-users")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;

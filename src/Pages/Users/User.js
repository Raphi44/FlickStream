import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "../../styles/components.css";

const User = ({ user, getUserUpdates }) => {
  const { profiles: usersProfile } = useSelector((state) => state.profiles);
  const { permissions: usersPermissions } = useSelector(
    (state) => state.permissions
  );
  const dispatch = useDispatch();
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  const profile = usersProfile?.find((profile) => profile.id === user._id);
  


  const userPermissions = usersPermissions?.find(
    (userP) => +userP.id === +user._id
  )?.permissions||[];
  
  const deleteUser = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch({type:"DELETE",payload:user._id,reducerKey:'users'})
      dispatch({type:"DELETE",payload:user._id,reducerKey:'profiles'})
      dispatch({type:"DELETE",payload:user._id,reducerKey:'permissions'})

      const resp = await axios.delete(`http://localhost:4001/user/${user._id}`);
      getUserUpdates(user._id);
      setResponse(resp);
    }
  };

  const editUser = () => {
    navigate(`/Main/Users-Management/edit-user/${user._id}`);
  };
  
  useEffect(()=>{

  },[profile])

  return (
    <div className="user-card">
      <div className="user-info">
        <h3 className="user-name">{profile?.FirstName} {profile?.LastName}</h3>
        <p className="user-detail"><strong>Username:</strong> {user.user}</p>
        <p className="user-detail"><strong>Session Timeout:</strong> {profile?.SessionTimeOut} minutes</p>
        <p className="user-detail"><strong>Created:</strong> {profile?.CreatedDate}</p>
        <div className="user-permissions">
          <strong>Permissions:</strong>
          <div className="permissions-list">
            {userPermissions.map((userP, index) => (
              <span key={index} className="permission-tag">{userP}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="user-actions">
        <button 
          className="edit-button"
          onClick={editUser}
        >
          Edit
        </button>
        <button 
          className="delete-button"
          onClick={deleteUser}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default User;

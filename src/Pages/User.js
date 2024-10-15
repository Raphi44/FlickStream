import axios from "axios";
import "../style.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const User = ({ user,getUserUpdates }) => {
  const { profiles: usersProfile } = useSelector((state) => state.profiles);
  const { permissions: usersPermissions } = useSelector(
    (state) => state.permissions
  );
  const dispatch=useDispatch();
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  const profile = usersProfile?.find((profile) => profile.id === user._id);
  


  const userPermissions = usersPermissions?.find(
    (userP) => +userP.id === +user._id
  )?.permissions||[];
  
  const deleteUser = async () => {
    dispatch({type:"DELETE",payload:user._id,reducerKey:'users'})
    dispatch({type:"DELETE",payload:user._id,reducerKey:'profiles'})
    dispatch({type:"DELETE",payload:user._id,reducerKey:'permissions'})


    const resp = await axios.delete(`http://localhost:4001/user/${user._id}`);
    getUserUpdates(user._id);
    setResponse(resp);
    console.log(response);
  };

  const editUser = () => {
    navigate(`/Main/Users-Management/edit-user/${user._id}`);
  };
  
  useEffect(()=>{

  },[profile])

  return (
    <div className="page-border2">
      Name : {profile?.FirstName} {profile?.LastName} <br />
      User Name : {user.user} <br />
      Session time out {"(Minutes)"} : {profile?.SessionTimeOut} <br />
      Created date : {profile?.CreatedDate}
      <br />
      Permissions:
      {userPermissions.map((userP,index) => {
        return <span key={index}> {userP} , </span>;
      })}
      <br />
      <button style={{marginTop:"10px",marginBottom:"3px"}} onClick={() => editUser()}>Edit</button>
      <button onClick={() => deleteUser()}>Delete</button>
    </div>
  );
};

export default User;

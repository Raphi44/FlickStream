import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import "../style.css";
import { useEffect, useState } from "react";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { profiles } = useSelector((state) => state.profiles);
  const profile = profiles.find((user) => user.id === +id)||{};

  const { users } = useSelector((state) => state.users);
  const user = users.find((user) => user._id === +id)||{};

  const { permissions } = useSelector((state) => state.permissions);
  const userPermissions = permissions?.find(
    (user) => user.id === +id
  )?.permissions||[];
  const dispatch=useDispatch();
  const [updatedPermissions, setUpdatedPermissions] = useState(userPermissions);

  const [fName, setFname] = useState(profile.FirstName);
  const [lName, setLname] = useState(profile.LastName);
  const [uName, setUname] = useState(user.user);
  const [sto, setSto] = useState(profile.SessionTimeOut);
  const [viewSubChecked,setViewSubChecked]=useState(updatedPermissions.includes("ViewSubscriptions"));
 const [viewMovieChecked,setViewMovieChecked]=useState(updatedPermissions.includes("ViewMovies"));
 const {userName}=useSelector(state=>state.userProfile);
 const editedUserName=profile.FirstName+" "+profile.LastName;

  const handleChanges = (e) => {
    const { checked, value } = e.target;

    if (checked) 
    setUpdatedPermissions([...updatedPermissions, value]);
    else
      setUpdatedPermissions(
        updatedPermissions.filter((perm) => perm !== value)
      );
  };

  const handleSubmit = async (e) => {
    const updatedUserProfile = {
      firstName: fName,
      lastName: lName,
      sessionTimeOut: sto,
    };
    if(editedUserName===userName)
      {
        await dispatch({type:"UPDATE_PERMISSIONS",payload:updatedPermissions})
      }
     await dispatch({type:"UPDATE",payload:{id:+id,updatedPermissions},reducerKey:"permissions"});
     await dispatch({type:'UPDATE',payload:updatedPermissions,reducerKey:"userProfile"});
     await dispatch({type:"UPDATE",payload:{id:+id,updatedUserProfile},reducerKey:"profiles"});
     await dispatch({type:'UPDATE',payload:{id:+id,user:uName},reducerKey:"users"});
    const resp = await axios.patch(`http://localhost:4001/user/${id}`, {
      user: uName,
      updatedUserProfile,
      updatedPermissions,
    });
    console.log(resp);
    navigate("/Main/Users-Management/all-users");
  };

  useEffect(() => {
    if(
      updatedPermissions.includes("CreateSubscriptions")&&
      updatedPermissions.includes("DeleteSubscriptions")&&
      updatedPermissions.includes("UpdateSubscriptions")
    )
    {
      setViewSubChecked(true);
      if(!updatedPermissions.includes("ViewSubscriptions"))
        setUpdatedPermissions([...updatedPermissions,"ViewSubscriptions"])
    }
    else
      setViewSubChecked(false);

      if(
        updatedPermissions.includes("CreateMovies")&&
        updatedPermissions.includes("DeleteMovies")&&
        updatedPermissions.includes("UpdateMovies")
      )
      {
        setViewMovieChecked(true);
        if(!updatedPermissions.includes("ViewMovies"))
          setUpdatedPermissions([...updatedPermissions,"ViewMovies"])
      }
      else
        setViewMovieChecked(false);
      

  }, [updatedPermissions,viewSubChecked,viewMovieChecked,permissions]);

  return (
    <>
      <h2>
        Edit User : {profile.FirstName} {profile.LastName}
      </h2>

      <div className="page-border2">
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>

          First Name :{" "}
          <input
            placeholder={profile.FirstName}
            onChange={(e) => setFname(e.target.value)}
          />{" "}
          <br />
          Last Name :{" "}
          <input
            placeholder={profile.LastName}
            onChange={(e) => setLname(e.target.value)}
          />{" "}
          <br />
          User Name :{" "}
          <input
            placeholder={user.user}
            onChange={(e) => setUname(e.target.value)}
          />
          <br />
          Session time out {"(Minutes)"} :{" "}
          <input
            placeholder={profile.SessionTimeOut}
            onChange={(e) => setSto(e.target.value)}
          />
          <br />
          Created Date : {profile.CreatedDate} <br />
          Permissions: <br />
          <label>
            <input
              type="checkbox"
              value="ViewSubscriptions"
              checked={
                updatedPermissions.includes("ViewSubscriptions") || viewSubChecked
              }
              onChange={(e) => handleChanges(e)}
            />
            View Subscriptions
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="CreateSubscriptions"
              checked={updatedPermissions.includes("CreateSubscriptions")}
              onChange={(e) => handleChanges(e)}
            />
            Create Subscriptions
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="DeleteSubscriptions"
              checked={updatedPermissions.includes("DeleteSubscriptions")}
              onChange={(e) => handleChanges(e)}
            />
            Delete Subscriptions
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="UpdateSubscriptions"
              checked={updatedPermissions.includes("UpdateSubscriptions")}
              onChange={(e) => handleChanges(e)}
            />
            Update Subscriptions
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="ViewMovies"
              checked={updatedPermissions.includes("ViewMovies")}
              onChange={(e) => handleChanges(e)}
            />
            View Movies
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="CreateMovies"
              checked={updatedPermissions.includes("CreateMovies")}
              onChange={(e) => handleChanges(e)}
            />
            Create Movies
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="DeleteMovies"
              checked={updatedPermissions.includes("DeleteMovies")}
              onChange={(e) => handleChanges(e)}
            />
            Delete Movies
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="UpdateMovies"
              checked={updatedPermissions.includes("UpdateMovies")}
              onChange={(e) => handleChanges(e)}
            />
            Update Movies
          </label>
          <br />
          <button
            style={{ marginTop: "10px", marginBottom: "20px" }}
            type="submit"
          >
            Update
          </button>
          <button type="button" onClick={()=>navigate("/Main/Users-Management/all-users")}>Cancle</button>
        </form>
      </div>
    </>
  );
};

export default EditUser;

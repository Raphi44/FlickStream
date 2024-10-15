import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
const AddUser=()=>{
    
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [uName, setUname] = useState("");
  const [sto, setSto] = useState("");
  const [permissions,setPermissions]=useState([]);
  const [viewSubChecked,setViewSubChecked]=useState(false);
  const [viewMovieChecked,setViewMovieChecked]=useState(false);
  const [userId,setUserId]=useState();
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const date=new Date();
    const year=date.getFullYear();
    const month=date.getMonth();
    const day=date.getDate();
    const fullDate=day+"/"+month+"/"+year;
  

    const handleSubmit=async(e)=>{
        await axios.post(`http://localhost:4001/add-user`,{userId,fName,lName,uName,fullDate,sto,permissions});
        dispatch({type:"ADD",payload:{_id:userId,user:uName},reducerKey:"users"});
        dispatch({type:'ADD',payload:{id:userId,FirstName:fName,LastName:lName,CreatedDate:fullDate,SessionTimeOut:sto},reducerKey:"profiles"});
        dispatch({type:"ADD",payload:{id:userId,permissions},reducerKey:"permissions"});
        navigate("/Main");
    }

    const handleChanges=(e)=>{
        const {checked,value}=e.target;
        if(checked)
            setPermissions([...permissions,value]);
        else
            setPermissions(permissions.filter(perm=>perm!==value));

    }

    useEffect(()=>{
        if(
            permissions.includes("CreateSubscriptions")&&
            permissions.includes("DeleteSubscriptions")&&
            permissions.includes("UpdateSubscriptions")
          )
          {
            setViewSubChecked(true);
            if(!permissions.includes("ViewSubscriptions"))
              setPermissions([...permissions,"ViewSubscriptions"])
          }
          else
            setViewSubChecked(false);
      
            if(
                permissions.includes("CreateMovies")&&
                permissions.includes("DeleteMovies")&&
                permissions.includes("UpdateMovies")
            )
            {
              setViewMovieChecked(true);
              if(!permissions.includes("ViewMovies"))
                setPermissions([...permissions,"ViewMovies"])
            }
            else
              setViewMovieChecked(false);
            
      
        }, [permissions,viewSubChecked,viewMovieChecked ]);




    return(
        <>
       

        <h2>Add New User</h2>
        <form onSubmit={(e)=>{e.preventDefault();  handleSubmit()}}>
        User Id : <input
            onChange={(e) => setUserId(+e.target.value)}
          /><br/>
        First Name : <input
            onChange={(e) => setFname(e.target.value)}
          /><br/>
        Last Name : <input
            onChange={(e) => setLname(e.target.value)}
          /> <br/>
        User Name : <input
            onChange={(e) => setUname(e.target.value)}
          /> <br/>
        Session time out {"(Minutes)"} : <input
            onChange={(e) => setSto(e.target.value)}
          /> <br/>
        Permissions : <br/>
        <label>
            <input
              type="checkbox"
              value="ViewSubscriptions"
              checked={
               
                permissions.includes("ViewSubscriptions") || viewSubChecked
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
              checked={permissions.includes("CreateSubscriptions")}
              onChange={(e) => handleChanges(e)}
            />
            Create Subscriptions
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="DeleteSubscriptions"
              checked={permissions.includes("DeleteSubscriptions")}
              onChange={(e) => handleChanges(e)}
            />
            Delete Subscriptions
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="UpdateSubscriptions"
              checked={permissions.includes("UpdateSubscriptions")}
              onChange={(e) => handleChanges(e)}
            />
            Update Subscriptions
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="ViewMovies"
              checked={permissions.includes("ViewMovies")}
              onChange={(e) => handleChanges(e)}
            />
            View Movies
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="CreateMovies"
              checked={permissions.includes("CreateMovies")}
              onChange={(e) => handleChanges(e)}
            />
            Create Movies
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="DeleteMovies"
              checked={permissions.includes("DeleteMovies")}
              onChange={(e) => handleChanges(e)}
            />
            Delete Movies
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="UpdateMovies"
              checked={permissions.includes("UpdateMovies")}
              onChange={(e) => handleChanges(e)}
            />
            Update Movies
          </label>
          <br/>
          <button style={{marginTop:"20px",marginBottom:"10px"}} type="submit">Save</button> 
          <button type="button" onClick={()=>navigate("/Main/Users-Management")}>Cancle</button>
          </form>
        </>
    )
}

export default AddUser;
import { useNavigate } from "react-router";
import "../../style.css";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { hasPermission } from "../../utils/PermissionHandle";
import WatchedMovies from "./WatchedMovies";
const subscriptions_API=process.env.REACT_APP_SUBSCRIPTION_API_URL

const Member = ({member}) => {
  const dispatch=useDispatch();
  
  const {userPermissions}=useSelector(state=>state.userProfile);
  const handleDelete=async()=>{
    if(hasPermission("DeleteSubscriptions",userPermissions)){
    dispatch({type:'DELETE',payload:member._id,reducerKey:'members'});
    dispatch({type:"DELETE",payload:member._id,reducerKey:'subscriptions'});
    const resp=await axios.delete(`${subscriptions_API}/delete-member/${member._id}`);
    console.log(resp);
    navigate("/Main/Subscriptions");
    }
    else
    navigate("/unauthorized");
  }

  const navigate=useNavigate();
  return (
    <div className="page-border2" style={{width:"500px"}}> <h3 style={{marginTop:"25px",fontWeight:"bold"}}>{member.Name}</h3><br/>
      Email : {member.Email} <br/>
      City : {member.City} <br/>
      <button onClick={()=>navigate("/Main/edit-member",{state:member})}>Edit</button>
      <button style={{marginLeft:"2px"}} onClick={()=>handleDelete()}>Delete</button><br/>
      <WatchedMovies memberId={member._id}/>
      


    </div>
  )
}

export default Member
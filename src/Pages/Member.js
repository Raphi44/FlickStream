import { useNavigate } from "react-router";
import "../style.css";


const Member = ({member}) => {

  const navigate=useNavigate();
  return (
    <div className="page-border3"> <h3 style={{marginTop:"25px",fontWeight:"bold"}}>{member.Name}</h3><br/>
      Email : {member.Email} <br/>
      City : {member.City} <br/>
      <button onClick={()=>navigate("/Main/edit-member",{state:member})}>Edit</button>
      <button style={{marginLeft:"2px"}}>Delete</button>


    </div>
  )
}

export default Member
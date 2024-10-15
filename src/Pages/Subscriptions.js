import { Outlet, useNavigate } from "react-router";
import "../style.css"

function Subscriptions(){
const navigate=useNavigate();

    return(
        <div className="page-border1">
        <h2>Subscriptions</h2> <br/>

        <button onClick={()=>navigate("all-members")}>All Members</button>
        <button style={{marginLeft:"5px"}}>Add Member</button> <br/>
        <Outlet/>
         
        
        
        
        
        </div>
    )

}



export default Subscriptions;
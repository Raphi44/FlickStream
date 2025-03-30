import { Outlet, useNavigate } from "react-router";
import "../../style.css"
import { useState } from "react";

function Subscriptions(){
const navigate=useNavigate();
const [bgButton,setBgButton]=useState("0");

    return(
        <div className="page-border1">
        <h2>Subscriptions</h2> <br/>

        <button style={bgButton==="1"?{backgroundColor:"yellow"}:null} onClick={()=>{setBgButton("1");navigate("all-members")}}>All Members</button>
        <button style={{...(bgButton==="2"?{backgroundColor:"yellow"}:null)  ,marginLeft:"5px"}}   onClick={()=>{setBgButton("2");navigate('add-member')}}>Add Member</button> <br/>
        <Outlet/>
         
        
        
        
        
        </div>
    )

}



export default Subscriptions;
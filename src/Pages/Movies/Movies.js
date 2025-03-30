import { useEffect, useState } from "react";
import "../../style.css";
import { Outlet, useLocation, useNavigate } from "react-router";

function Movies(){
const navigate=useNavigate();
const location=useLocation();
const [findMovie,setFindMovie]=useState("")
const [searchVisibilty,setSearchVisibility]=useState(true);
const [editPageVisibilty,setEditPageVisibility]=useState(true);
const [bgButton,setBgButton]=useState("0");

const handleNavigation=()=>{
    navigate("/Main/Movies/all-movies",{state:{findMovie}})
}


useEffect(()=>{

    if(location.pathname==="/Main/Movies/add-movie")
        setSearchVisibility(false);
    else
        setSearchVisibility(true);

    if(location.pathname==='/Main/Movies/edit-movie')
        setEditPageVisibility(false);
    else
        setEditPageVisibility(true);

},[location,searchVisibilty,editPageVisibilty])



    return(
        <div className="page-border1" >
        <h2>Movies</h2> <br/>
        {editPageVisibilty&& <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <button style={bgButton==="1"?{backgroundColor:"yellow"}:null} onClick={()=>{setBgButton("1");handleNavigation()}}>All Movies</button>
        <button style={{  ...(bgButton === "2" ? { backgroundColor: "yellow" } : null ), margin: "5px"  }} onClick={()=>{setBgButton("2");navigate("add-movie")}}>Add Movie</button>
        {searchVisibilty&& <div>Find Movie : <input type="text"  onChange={(e)=>setFindMovie(e.target.value)}/>  
        <button style={{marginLeft:"5px"}}onClick={handleNavigation} >Find</button> <br/> </div>}
        </div>}
        <Outlet />
        
        
   
        </div>
    )

}



export default Movies;
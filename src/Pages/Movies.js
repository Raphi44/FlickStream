import { useEffect, useState } from "react";
import "../style.css";
import { Outlet, useLocation, useNavigate } from "react-router";

function Movies(){
const navigate=useNavigate();
const location=useLocation();
const [findMovie,setFindMovie]=useState("")
const [searchVisibilty,setSearchVisibility]=useState(true);
const [editPageVisibilty,setEditPageVisibility]=useState(true);

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
        <div className="page-border1">
        <h2>Movies</h2> <br/>
        {editPageVisibilty&& <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <button onClick={handleNavigation}>All Movies</button>
        <button style={{margin:"5px"}} onClick={()=>navigate("add-movie")}>Add Movie</button>
        {searchVisibilty&& <div>Find Movie : <input type="text"  onChange={(e)=>setFindMovie(e.target.value)}/>  
        <button style={{marginLeft:"5px"}}onClick={handleNavigation} >Find</button> <br/> </div>}
        </div>}
        <Outlet />
        
        
   
        </div>
    )

}



export default Movies;
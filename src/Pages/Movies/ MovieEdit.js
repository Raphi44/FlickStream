import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from 'axios'
import { useDispatch } from "react-redux";
 const  MovieEdit = () => {
    const token=sessionStorage.getItem("token");
    const location=useLocation();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [movieName,setMovieName] =useState(location.state.Name);
    const [movieGenres,setMovieGenres]=useState(location.state.Genres);
    const [movieImg,setMovieImg]=useState(location.state.Image);
    const [movieDate,setMovieDate]=useState(location.state.Premiered);
    const updatedMovie={_id:location.state._id,Name:movieName,Genres:movieGenres,Image:movieImg,Premiered:movieDate};
    const handleSubmit=async()=>{
    const resp=await axios.patch(`http://localhost:4000/edit-movie/${location.state._id}`,updatedMovie,
      {
        headers: { Authorization: `Bearer ${token}` },
      });
    dispatch({type:"UPDATE",payload:updatedMovie,reducerKey:"movies"})
    console.log(resp,"resp from server editing movie");
    navigate("/Main/Movies");

    }
  return (
    <div>
    <h2>Edit Movie : {location.state.Name}</h2> <br/>
    <form onSubmit={(e)=>{e.preventDefault();handleSubmit()}}>
    Name : <input type="text" placeholder={location.state.Name} onChange={(e)=>setMovieName(e.target.value)} /> <br/>
    Genres : <input type="text" placeholder={location.state.Genres} onChange={(e)=>setMovieGenres(e.target.value.split(","))}/> <br/>
    Image url : <input type="text" placeholder={location.state.Image} onChange={(e)=>setMovieImg(e.target.value)}/> <br/>
    Premiered : <input type="text" placeholder={location.state.Premiered.slice(0,10)} onChange={(e)=>setMovieDate(e.target.value)}/> <br/>
    <button type="submit" style={{marginRight:"10px",marginTop:"10px"}} >update</button>
    <button type="button" onClick={()=>navigate("/Main/Movies")}>cancle</button>
    </form>
    </div>
  )
}


export default MovieEdit;
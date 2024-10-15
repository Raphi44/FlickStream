import { useNavigate } from "react-router";
import "../style.css"
import Subscribers from "./Subscribers";
import { useDispatch, useSelector } from "react-redux";
import axios  from 'axios'
import { hasPermission } from "../utils/PermissionHandle";
const Movie=({movie})=>{
const navigate=useNavigate();
const movieId=movie._id;
const dispatch=useDispatch();
const {userPermissions}=useSelector(state=>state.userProfile)
const deleteMovie=async(id)=>{
    if(hasPermission("DeleteMovies",userPermissions)){
        dispatch({type:"DELETE",payload:id,reducerKey:"movies"});
        const resp=await axios.delete(`http://localhost:4000/delete_movie/${id}`);
        console.log(resp);
       
    }
    else{
     navigate("/unauthorized");
    }
}
    return(
        <div className="page-border2">
        <h2>{movie.Name} , {movie.Premiered.slice(0,4)}</h2> <br/>
       <h4> genres: {movie.Genres.map(genre=>`"${genre}"`).join(', ')} </h4> <br/>
       <div className="movie-content">
        <img style={{width:"200px"}} src={movie.Image} alt={movie.Name}/>
        <Subscribers movieId={movieId}/>
        </div>
        <button style={{marginBottom:"15px"}} onClick={()=>navigate("/Main/Movies/edit-movie",{state:movie})}>Edit</button>
        <button onClick={()=>deleteMovie(movieId)}>Delete</button>
        </div>
    )
}


export default Movie;
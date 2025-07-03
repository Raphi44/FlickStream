import { useNavigate } from "react-router";
import "../../style.css"
import Subscribers from "./Subscribers";
import { useDispatch, useSelector } from "react-redux";
import axios  from 'axios'
import { hasPermission } from "../../utils/PermissionHandle";
const subscriptions_API=process.env.REACT_APP_SUBSCRIPTION_API_URL


const Movie = ({movie}) => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const movieId = movie._id;
  const dispatch = useDispatch();
  const {userPermissions} = useSelector(state => state.userProfile);

  const deleteMovie = async(id) => {
    if(hasPermission("DeleteMovies", userPermissions)) {
      dispatch({type: "DELETE", payload: id, reducerKey: "movies"});
      const resp = await axios.delete(`${subscriptions_API}/delete_movie/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(resp);
    } else {
      navigate("/unauthorized");
    }
  }

  return (
    <div className="page-border3">
      <h2>{movie.Name} , {movie.Premiered.slice(0,4)}</h2> <br/>
      <h4> genres: {movie.Genres.map(genre => `"${genre}"`).join(', ')} </h4> <br/>
      <div className="movie-content">
        <img style={{width: "150px"}} src={movie.Image} alt={movie.Name}/>
        <Subscribers movieId={movieId}/>
      </div>
      <div className="movie-actions-buttons">
        <button 
          className="movie-action-button edit"
          onClick={() => navigate("/Main/Movies/edit-movie", {state: movie})}
        >
          Edit
        </button>
        <button 
          className="movie-action-button delete"
          onClick={() => deleteMovie(movieId)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Movie;
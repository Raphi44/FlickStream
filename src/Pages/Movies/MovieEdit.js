import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from 'axios'
import { useDispatch } from "react-redux";
import "../../styles/variables.css";
import "../../styles/base.css";
import "../../styles/components.css";

const MovieEdit = () => {
    const token = sessionStorage.getItem("token");
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [movieName, setMovieName] = useState(location.state.Name);
    const [movieGenres, setMovieGenres] = useState(location.state.Genres);
    const [movieImg, setMovieImg] = useState(location.state.Image);
    const [movieDate, setMovieDate] = useState(location.state.Premiered);
    const updatedMovie = {_id: location.state._id, Name: movieName, Genres: movieGenres, Image: movieImg, Premiered: movieDate};
    const subscriptions_API=process.env.REACT_APP_SUBSCRIPTION_API_URL

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const resp = await axios.patch(
                `${subscriptions_API}/edit-movie/${location.state._id}`,
                updatedMovie,
                {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (resp.data) {
                dispatch({type: "UPDATE", payload: resp.data, reducerKey: "movies"});
                console.log(resp, "resp from server editing movie");
                navigate("/Main/Movies");
            }
        } catch (error) {
            console.error("Error updating movie:", error);
            if (error.response) {
                if (error.response.status === 401) {
                    alert("Your session has expired. Please log in again.");
                    navigate("/Login");
                } else if (error.response.status === 403) {
                    alert("You don't have permission to update movies.");
                } else {
                    alert("An error occurred while updating the movie.");
                }
            } else {
                alert("Network error. Please try again.");
            }
        }
    }

    return (
        <div style={{
            maxWidth: '400px',
            margin: '0 auto',
            padding: '2rem',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
        }}>
            <h2 style={{
                fontSize: '1.5rem',
                color: '#ffffff',
                marginBottom: '1.5rem',
                textAlign: 'center'
            }}>
                Edit Movie: {location.state.Name}
            </h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#ffffff',
                        fontSize: '1rem'
                    }}>
                        Name
                    </label>
                    <input 
                        type="text" 
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            backgroundColor: '#ffffff',
                            border: '1px solid #cccccc',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            color: '#000000'
                        }}
                        value={movieName}
                        onChange={(e) => setMovieName(e.target.value)} 
                    />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#ffffff',
                        fontSize: '1rem'
                    }}>
                        Genres
                    </label>
                    <input 
                        type="text" 
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            backgroundColor: '#ffffff',
                            border: '1px solid #cccccc',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            color: '#000000'
                        }}
                        value={movieGenres.join(',')}
                        onChange={(e) => setMovieGenres(e.target.value.split(','))}
                    />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#ffffff',
                        fontSize: '1rem'
                    }}>
                        Image URL
                    </label>
                    <input 
                        type="text" 
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            backgroundColor: '#ffffff',
                            border: '1px solid #cccccc',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            color: '#000000'
                        }}
                        value={movieImg}
                        onChange={(e) => setMovieImg(e.target.value)}
                    />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#ffffff',
                        fontSize: '1rem'
                    }}>
                        Premiered
                    </label>
                    <input 
                        type="text" 
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            backgroundColor: '#ffffff',
                            border: '1px solid #cccccc',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            color: '#000000'
                        }}
                        value={movieDate}
                        onChange={(e) => setMovieDate(e.target.value)}
                    />
                </div>
                <div style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    marginTop: '1.5rem',
                    justifyContent: 'center'
                }}>
                    <button 
                        type="submit" 
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#e50914',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: '500',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#f40612';
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 4px 12px rgba(229, 9, 20, 0.4)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#e50914';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                        }}
                    >
                        Update
                    </button>
                    <button 
                        type="button" 
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            color: '#ffffff',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: '500',
                            transition: 'all 0.2s ease'
                        }}
                        onClick={() => navigate("/Main/Movies")}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default MovieEdit; 
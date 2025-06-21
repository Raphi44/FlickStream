import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import { useNavigate } from 'react-router';

const AddMovie = () => {
    const token=sessionStorage.getItem("token");
    const [movieName,setMovieName]=useState("");
    const [movieGenres,setMovieGenres]=useState([]);
    const [movieImage,setMovieImage]=useState("");
    const [movieDate,setMovieDate]=useState("");
    const id=uuidv4();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const movieData={_id:id,Name:movieName,Genres:movieGenres,Image:movieImage,Premiered:movieDate}
    
    const handleSubmit= async()=>{
        dispatch({type:"ADD",payload:movieData,reducerKey:"movies"});
        try{
            const resp=await axios.post("http://localhost:4000/add-movie",movieData,
            {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(resp);
        }
        catch(error){
            if (error.response && error.response.status === 403) {
                alert('You do not have permission to add movies.');
            } else {
                console.error(error);
            }
        }
        navigate("/Main");
    }

    return (
        <div className="form-container">
            <h2 className="form-title">Add New Movie</h2>
            <form onSubmit={(e)=>{e.preventDefault(); handleSubmit()}}>
                <div className="form-group">
                    <label className="form-label">Name</label>
                    <input 
                        type='text' 
                        className="form-input"
                        onChange={(e)=>setMovieName(e.target.value)}
                        placeholder="Enter movie name"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Genres</label>
                    <input 
                        type='text' 
                        className="form-input"
                        onChange={(e)=>setMovieGenres(e.target.value.split(','))}
                        placeholder="Enter genres (comma separated)"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Image URL</label>
                    <input 
                        type='text' 
                        className="form-input"
                        onChange={(e)=>setMovieImage(e.target.value)}
                        placeholder="Enter image URL"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Premiered</label>
                    <input 
                        type='text' 
                        className="form-input"
                        onChange={(e)=>setMovieDate(e.target.value)}
                        placeholder="Enter premiere date"
                    />
                </div>
                <div className="form-group">
                    <button  type='submit' className="form-submit-button">Save</button>
                    <button 
                        type='button' 
                        className="form-cancel-button"
                        onClick={()=>navigate('/Main/Movies')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddMovie;
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
          }
        );
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
    <div>
    <form onSubmit={(e)=>{e.preventDefault(); handleSubmit() }}>
        Name : <input type='text' onChange={(e)=>setMovieName(e.target.value)}/> <br/>
        Genres : <input type='text' onChange={(e)=>setMovieGenres(e.target.value.split(','))}/> <br/>
        Image url : <input type='text' onChange={(e)=>setMovieImage(e.target.value)} /> <br/>
        Premiered : <input type='text' onChange={(e)=>setMovieDate(e.target.value)} /> <br/>
        <button type='submit'>save</button>
        <button style={{marginLeft:"10px",marginTop:"20px"}} type='button' onClick={()=>navigate('/Main/Movies')}>cancle</button>
    </form>
    </div>
  )
}

export default AddMovie;
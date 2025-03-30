import { useState } from 'react';
import '../../style.css'
import { Select } from "antd";
import axios from 'axios';
import { useDispatch } from 'react-redux';



const NewMovieSubscribe = ({unwatchedMovies,memberId}) => {
    const [date,setDate]=useState();
    const [movie,setMovie]=useState();
   const dispatch=useDispatch();
      const onSearch = (value) => {
        console.log('search:', value);
      };

      const handleSubmit=async()=>{
        try{
       const movieId=unwatchedMovies?.find(unwatchedMovie=>unwatchedMovie.Name===movie)?._id;
        const {data}=await axios.post(`http://localhost:4000/subscribe-movie/${memberId}`,{movieId,date});
        dispatch({type:'UPDATE',payload:{_id:data._id,MemberId:data.MemberId,movie:{movieId,date,_id:data.Movies?.find(movie=>movie.movieId===movieId)?._id}},reducerKey:'subscriptions'});
        console.log(data);
        alert(`Successfully subscribed to the movie ${movie}!`)

        }
        catch(error)
        {
            alert(`Movie "${movie}" subscription failed`);
            console.log({error:error.message});
        }
    
      }
      

  return (
    <div className="subscribe-page">
        <br/> Add a new movie <br/>
        <form onSubmit={(e)=>{e.preventDefault();handleSubmit()}}>
  <Select
    showSearch
    placeholder="Select a person"
    optionFilterProp="label"
    onChange={(value)=>setMovie(value)}
    onSearch={onSearch}
    options={unwatchedMovies.map(movie=>{
        return(
            {
                value :movie.Name,
                label:movie.Name
            }
        )
    }
    
    )}
  />
       
        <input style={{marginLeft:"5px"}} type='date' onChange={(e)=>setDate(e.target.value)} /> <br/>
        <button type='submit'>Subscribe</button><br/>

        </form>
    
    </div>
  )
}

export default NewMovieSubscribe
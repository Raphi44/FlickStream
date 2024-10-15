import {  useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Movie from "./Movie";
import "../style.css"
import Pagination from "./Pagination";
import { useLocation } from "react-router";
const AllMovies =() => {
  const { movies: moviesData } = useSelector((state) => state.movies);
  const [currentPage,setCurrentPage]=useState(1);
  const [postsPerPage]=useState(25);
  const [findMovie,setFindMovie]=useState("");

  const indexOflastPost=currentPage*postsPerPage;
  const indexOfFirstPost=indexOflastPost-postsPerPage;
  const currentPosts=moviesData.slice(indexOfFirstPost,indexOflastPost);
  const paginate=(pageNumber)=>{setCurrentPage(pageNumber)}
  const location=useLocation();
  useEffect(()=>{
    if(location.state?.findMovie)
        setFindMovie(location.state.findMovie);
  },[findMovie,location.state?.findMovie])
    //const findMovie=location.state.findMovie;
  
 



  return <>
  <ul className="list-group mb-4" style={{ listStyleType: "none", padding: "0", margin: "0" }}>
    {
        findMovie===""?
        currentPosts.filter(movie=>{return(location.state?.findMovie===""?movie:movie.Name.toLowerCase().includes(findMovie.toLowerCase()))})
        .map(movie=>{
            return(
                
                <li key={movie._id} className="list-group-item"> <Movie  movie={movie} /> 
                
                </li>
                
                
            
            )
        }):
        moviesData.filter(movie=>{return(location.state?.findMovie===""?movie:movie.Name.toLowerCase().includes(findMovie.toLowerCase()))})
        .map(movie=>{
            return(
                
                <li key={movie._id} className="list-group-item"> <Movie  movie={movie} /> 
                
                </li>
                
                
            
            )
        })

    }
    <Pagination postsPerPage={postsPerPage} totalPosts={moviesData.length} paginate={paginate} />
  </ul>
  </>;
};

export default AllMovies;

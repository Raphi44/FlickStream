const axios = require("axios");
const { Member, Movie, Subscriptions } = require("../models/subscriptionsModel");
const membersURL = "https://jsonplaceholder.typicode.com/users";
const moviesURL = "https://api.tvmaze.com/shows";

const fetchMembersData = () => {
  return axios.get(`${membersURL}`);
};

const fetchMoviesData = () => {
  return axios.get(`${moviesURL}`);
};

const getUsersDataFromDb=()=>{
  return Member.find({}).sort({_id:1});
}

  const getMoviesFromDb=()=>{
    return Movie.find({}).sort({_id:1});;
}

const getSubscriptions=()=>{
  return Subscriptions.find();
}


const addSubscription=(data)=>{
 return  Subscriptions.create(data);
}

const addMovie=async(data)=>{
    return  await Movie.create(data);
}

const getMovie=async(id)=>{

  return await Movie.findById(id);
}

const deleteMovie=(id)=>{
  return Movie.deleteOne({_id:id})
}

const getMemberbyId=(id)=>{
  
  return Member.findById(id);
}
module.exports = { fetchMembersData,getMemberbyId, fetchMoviesData,getUsersDataFromDb,getMoviesFromDb,getSubscriptions,addSubscription,addMovie,getMovie,deleteMovie};

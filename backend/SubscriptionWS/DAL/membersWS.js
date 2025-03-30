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

const deleteMember=async(id)=>{
  await Member.deleteOne({_id:id})
  return Subscriptions.deleteOne({MemberId:id})

}

const addMember=(data)=>{
  return Member.create({Name:data.Name,Email:data.Email,City:data.City});
}

const getSubscriber=async(id)=>{
  const member= await Subscriptions.findOne({MemberId:id});
  if(!member){
    return  await Subscriptions.create({MemberId:id,Movies:[]})
  }
  return member;
}


module.exports = { fetchMembersData,getSubscriber,addMember,deleteMember,getMemberbyId, fetchMoviesData,getUsersDataFromDb,getMoviesFromDb,getSubscriptions,addSubscription,addMovie,getMovie,deleteMovie};

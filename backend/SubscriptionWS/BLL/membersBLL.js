const  mongoose = require("mongoose");
const membersDal = require("../DAL/membersWS");
const { Member, Movie } = require("../models/subscriptionsModel");

const getMembers = async () => {
  const { data:membersData } = await membersDal.fetchMembersData();

  const filtered_members = membersData.map((x) => {
    return {
   //   _id: x.id,
      Name: x.name,
      Email: x.email,
      City: x.address.city,
    };
  });
  return filtered_members;
};
const getMovies = async () => {
  const { data:moviesData } = await membersDal.fetchMoviesData();

  const filtered_movies = moviesData.map((x) => {
    return {
      _id: x.id,
      Name: x.name,
      Genres: x.genres,
      Image: x.image.medium,
      Premiered: x.premiered,
    };
  });
  return filtered_movies;
};

const populateMembersDB = async () => {
  const data = await Member.findOne();
  if (!data) {

    const membersData = await getMembers();

    await Member.insertMany(membersData,{ordered:true});

    return "Members data base populated successfully"
  }
  return "Members data base already populated"
};

const populateMoviesDB = async () => {
  const data = await Movie.findById(1);
  if (!data) {
    const moviesData = await getMovies();
    await Movie.insertMany(moviesData);
    return "Movies data base populated successfully"
  }
  return " Movies data base already populated"
};

const getMembersFromDb=async()=>{
      const data=await membersDal.getUsersDataFromDb();
      if(!data){
        return "Error fetching data from members db";
      }
      return data;
}

const getMoviesFromDb=async()=>{
  const data=await membersDal.getMoviesFromDb();
  if(!data){
    return "Error fetching data from movies db";
  }
  return data;
}

const getSubscriptions=async()=>{
  return await membersDal.getSubscriptions();
}

const addSubscription=async(data)=>{
  return await membersDal.addSubscription(data);
}

const addMovie=async(data)=>{
  return await membersDal.addMovie(data);
}

const editMovie=async(data)=>{
  const movie=await membersDal.getMovie(data._id);
  movie.Name=data.Name;
  movie.Genres=data.Genres;
  movie.Image=data.Image;
  movie.Premiered=data.Premiered;
  return await movie.save();
}

const deleteMovie=async(id)=>{
    return await membersDal.deleteMovie(id);
}

const updateMember=async(id,data)=>{
  console.log(id,typeof(id));
  
  const member=await membersDal.getMemberbyId(id);
  member.Name=data.Name;
  member.Email=data.Email;
  member.City=data.City;
  return await member.save();
  
}

const deleteMember= async(id)=>{
  return await membersDal.deleteMember(id);
}

const addMember=async (data)=>{
  return await membersDal.addMember(data);
}

const subscribeMovie=async (memberId,data)=>{

  const member= await membersDal.getSubscriber(memberId);
  member.Movies=[...member.Movies,data]
  return await member.save();
}
module.exports = { populateMembersDB,subscribeMovie,addMember,deleteMember ,populateMoviesDB,getMembersFromDb,getMoviesFromDb,getSubscriptions,addSubscription,addMovie,editMovie,deleteMovie,updateMember };

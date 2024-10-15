const User = require("../models/usersModel");
const jf = require("jsonfile");



const getUser = async (user) => {
  return User.findOne({ user: user });
};


const getUsersProfile = () => {
  return jf.readFile("./files/Users.json");
};

const getUsers = () => {
  return User.find({}).sort({ _id: 1 });
};

const getPermissions = () => {
  return jf.readFile("./files/Permissions.json");
};

const deleteUser=async(id)=>{
      await User.deleteOne({_id:id});
}

const getUserById=async(id)=>{
    return await User.findById(id);
  
}

const addUserToDb=(userData)=>{
  return  User.create({_id:userData.userId,user:userData.uName,role:"user",password:""});

}

module.exports = {
  getUser,
  getPermissions,
  getUsers,
  getUsersProfile,
  deleteUser,
  getUserById,
  addUserToDb
};

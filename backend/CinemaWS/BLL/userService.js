const userDal = require("../DAL/userDal");
const bcrypt = require("bcryptjs");

const { createSecretToken } = require("../utils/SecretToken");
const jf = require("jsonfile");

const getUser = async (userData) => {
  const resp= await userDal.getUser(userData);
  return resp;
};

const checkLogin = async (userData) => {
  const dbUserData = await getUser(userData.user);

  if (!dbUserData) {
    throw new Error("Invalid user credentials");
  }

  const isValid = await bcrypt.compare(userData.password, dbUserData.password);
  if (!isValid) {
    throw new Error("Invalid password");
  }
  return createSecretToken(dbUserData);
};

const getUsersData = async () => {
  const users = await userDal.getUsers();

  const usersProfile = await userDal.getUsersProfile();

  const usersPermissions = await userDal.getPermissions();

  if (!users || !usersProfile || !usersPermissions) {
    return "Failed at getting users data";
  }

  return { users, usersProfile, usersPermissions };
};

const deleteUserById = async (id) => {
  try {
    await userDal.deleteUser(+id);
    return { success: true, message: `User with ID ${id} deleted.` };
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
};

const deleteUserProfile = async (id) => {
  try {
    const file = await jf.readFile("./files/Users.json");
    const updatedFile = file.Users.filter((user) => user.id !== +id);
    await jf.writeFile("./files/Users.json", { Users: updatedFile });
    return { success: true, message: `User profile with ID ${id} deleted.` };
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
};

const deleteUserPermissions = async (id) => {
  try {
    const file = await jf.readFile("./files/Permissions.json");
    const updatedFile = file.userPermissions.filter((userP) => userP.id !== +id);
    await jf.writeFile("./files/Permissions.json", {
      userPermissions: updatedFile,
    });
    return { success: true, message: `User profile with ID ${id} deleted.` };
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
};

const updateUser = async (id, user) => {
  try {
    const dbUser = await userDal.getUserById(id);
    dbUser.user = user;
    await dbUser.save();
    const updatedDbUser= await userDal.getUserById(id);
    console.log(updatedDbUser,"updated db user after save");
    return "User updated successfully";
  } catch (error) {
    throw new Error("User update failed");
  }
};

const createUser = async (data) => {
  try{
  const user = await userDal.getUser(data.user);


  if (user&&bcrypt.compare("",user.password)) {
    user.password=data.password;
    return await user.save();
  }
  else
   throw new Error("User does not exist");
  }
  catch(error){
    throw new Error({error:error.message})
  }
  
};

const addUserToDb=async (userData)=>{
    return await userDal.addUserToDb(userData);
}

const updateProfile = async (id, profile) => {
  try{
  const file = await userDal.getUsersProfile();
  const updatedFile = file.Users.map((userP) => {
    if (+userP.id === +id)
      return {
        ...userP,
        FirstName: profile.firstName,
        LastName: profile.lastName,
        SessionTimeOut: profile.sessionTimeOut,
      };
    return userP;
  });

   return await jf.writeFile("./files/Users.json", { Users: updatedFile });}
   catch(error){
    return("User profile update failed",error);
   }
};

const updatePermissions=async(id,permissions)=>{
  try{

  const file = await userDal.getPermissions();
  const updatedFile=file.userPermissions.map((userP)=>{
    if(+userP.id===+id)
      {
        return(
          {id:+id,permissions:permissions

          }
        )
      }
      return userP;
  })
 return  await jf.writeFile("./files/Permissions.json",{userPermissions:updatedFile})

}
catch(error){
  return ("User permissions updated failed",error);
}
}

const addUserProfile=async(data)=>{
    const file=await jf.readFile("./files/Users.json");
    
    const newProfile={id:data.id,FirstName:data.fName,LastName:data.lName,CreatedDate:data.fullDate,SessionTimeOut:data.sto};
    const updatedFile={...file,Users:[...file.Users,newProfile]};
    return await jf.writeFile("./files/Users.json",updatedFile);



}


const addUserPermissions=async(data)=>{
  const file=await jf.readFile("./files/Permissions.json");
  const updatedFile={...file,userPermissions:[...file.userPermissions,{id:data.id,permissions:data.permissions}]}
  return await jf.writeFile("./files/Permissions.json",updatedFile);

}


const getUserProfile=async(id)=>{
  const file=await jf.readFile("./files/Users.json");
  const profile=file.Users.find(profile=>profile.id===+id);
  return profile;
}

const getUserPermissions=async(id)=>{
  const file=await jf.readFile("./files/Permissions.json");
  console.log(file,"file")
  const permissions=file.userPermissions.find(perm=>perm.id===+id);
  console.log(permissions,"permissions")
  return permissions;

}

module.exports = {
  checkLogin,
  getUser,
  getUsersData,
  deleteUserById,
  deleteUserProfile,
  deleteUserPermissions,
  updateUser,
  createUser,
  updateProfile,
  updatePermissions,
  addUserToDb,
  addUserProfile,
  addUserPermissions,
  getUserPermissions,
  getUserProfile
};

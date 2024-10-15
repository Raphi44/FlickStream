require("dotenv").config();
const jwt = require("jsonwebtoken");
const jf=require("jsonfile");
//const crypto=require("crypto")


//const secretKey = crypto.randomBytes(32).toString('hex');   generate secretkey to store in .env
//console.log(secretKey)   

const createSecretToken = async(user) => {
  const file=await jf.readFile("./files/Users.json");
  const sto=file.Users.find(userP=>userP.id===user._id).SessionTimeOut;
    return jwt.sign({user:user.user,role:user.role}, process.env.TOKEN_KEY, {
      expiresIn:+sto*60,
    });
  };

  module.exports={createSecretToken}
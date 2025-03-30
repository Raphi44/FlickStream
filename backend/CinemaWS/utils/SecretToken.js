const jwt = require("jsonwebtoken");
const jf=require("jsonfile");
//const crypto=require("crypto")


//const secretKey = crypto.randomBytes(32).toString('hex');   generate secretkey to store in .env
//console.log(secretKey)   

const createSecretToken = async(user) => {
  const usersFile=await jf.readFile("./files/Users.json");
  const permissionsFile =await jf.readFile("./files/Permissions.json");
  const userPermissions=permissionsFile.userPermissions.find(userP=>userP.id===user._id)?.permissions;
  const sto=usersFile.Users.find(userP=>userP.id===user._id).SessionTimeOut;
    return jwt.sign({user:user.user,role:user.role,userPermissions}, process.env.TOKEN_KEY, {
      expiresIn:+sto*60,
    });
  };

const verifyToken=(requiredPermission)=>{
    return (req,res,next)=>{
      const token=req.headers['authorization'];
      
      if (!token) {
        return res.status(403).json({ message: 'Access denied. Token missing.' });
      }
      try {

        
        const decoded = jwt.verify(token.split(' ')[1], process.env.TOKEN_KEY); 
        

        if (!decoded.userPermissions || !decoded.userPermissions.includes(requiredPermission)) {
          return res.status(403).json({ message: `Access denied. Missing ${requiredPermission} permission.` });
        }
        next(); 
      } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
      }
    }
    

}

  module.exports={createSecretToken,verifyToken}


  
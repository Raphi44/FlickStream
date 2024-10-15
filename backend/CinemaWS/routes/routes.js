const express=require("express");
const userBll=require("../BLL/userService");

const router=express.Router();

router.post("/login",async(req,res)=>{
    try{
    const data=req.body;
    const resp=await userBll.checkLogin(data);
    res.status(200).json(resp);
}
    catch(error){
        res.status(400).json({error:error.message})
    }

})

router.get("/users",async(req,res)=>{
    try{
        const data= await userBll.getUsersData();
        res.json(data);

    }
    catch(error){
    res.status(500).json({error : error.message});
    }
})

router.post("/user",async(req,res)=>{
    try{
        const data=req.body;
        const resp = await userBll.getUser(data.user);
        res.status(200).json(resp);

    }
    catch(error){
    res.status(500).json({error : error.message});
    }
})

router.delete("/user/:id",async(req,res)=>{
    try{
    const {id}=req.params;
    console.log("hello from delete", id)
    await userBll.deleteUserById(id);
    await userBll.deleteUserProfile(id);
    await userBll.deleteUserPermissions(id);

    res.status(200).json("User Deleted Succesfully");
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
})

router.patch("/user/:id",async (req,res)=>{
    try{
    const {id}=req.params;
    const {user,updatedUserProfile,updatedPermissions}=req.body;
    console.log(updatedUserProfile);
    const respUserUpdate= await userBll.updateUser(id,user);
    const respProfileUpdate= await userBll.updateProfile(id,updatedUserProfile);
    const respPermissionsUpdate=await userBll.updatePermissions(id,updatedPermissions);
    
    res.status(200).json({respProfileUpdate,respUserUpdate,respPermissionsUpdate});
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
})

router.post("/create-user",async (req,res)=>{
    try{
    const data=req.body;
    const resp=await userBll.createUser(data);
    res.status(200).json(resp);
    }
    catch (error){
        res.status(400).json({error:error.message});
    }
})

router.post("/add-user",async(req,res)=>{
    try{
    const {userId,fName,lName,fullDate,uName,sto,permissions}=req.body;
    const userResp=await userBll.addUserToDb({userId,uName});
    await userBll.addUserProfile({id:userId,fName,lName,fullDate,sto});
    await userBll.addUserPermissions({id:userId,permissions});

    res.status(200).json(userResp);

    }
    catch(error)
     {
        res.status(400).json({error:error.message})
     }

})

router.get("/user/:id",async (req,res)=>{
    try{
    const {id}=req.params;
    console.log(id,"id")
    const userProfile=await userBll.getUserProfile(id);
    const userPermissions=await userBll.getUserPermissions(id);
    res.status(200).json({userProfile,userPermissions});
    }
    catch(error){
        res.status(400).json({error:error.message});
    }


})
module.exports=router;
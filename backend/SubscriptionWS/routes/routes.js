const express=require("express");
const membersBll=require("../BLL/membersBLL");
const { verifyToken } = require("../../CinemaWS/utils/SecretToken");


const router=express.Router();

router.get("/",async(req,res)=>{
    try{
    const membersResult=await membersBll.populateMembersDB();
    const moviesResult=await membersBll.populateMoviesDB();
    res.status(200).json({
        members: membersResult,
        movies: moviesResult
    });
}
catch(error){
    res.status(500).json({ error: error.message });

}   
})

router.get("/members",async(req,res)=>{
    try{
    const data=await membersBll.getMembersFromDb();
    res.status(200).json(data);  
    }
    catch(error){
    res.status(500).json({error : error.message});
    }
})

router.get("/movies",async(req,res)=>{
    try{
    const data=await membersBll.getMoviesFromDb();
    res.status(200).json(data);  
    }
    catch(error){
    res.status(500).json({error : error.message});
    }
})

router.get("/subscriptions",async (req,res)=>{
    try{
        const data= await membersBll.getSubscriptions();
        res.status(200).json(data);
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
    
})

router.post("/sub",async(req,res)=>{
    const resp=await membersBll.addSubscription({MemberId: 1,
        Movies: [
          { movieId: 1, date: new Date('2024-09-12') }
          
        ]})
    res.status(200).json(resp);
})

router.post("/add-movie",verifyToken("CreateMovies"),async(req,res)=>{
    try{
    console.log("hello from add movie route")
    const data=req.body;
    const resp=await membersBll.addMovie(data);
    res.status(200).json(resp);
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
})

router.patch("/edit-movie/:id",verifyToken("UpdateMovies") ,async(req,res)=>{
    try{
        const data=req.body;
        const resp=await membersBll.editMovie(data);
        res.status(200).json(resp);
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
})

router.delete("/delete_movie/:id",verifyToken("DeleteMovies"),async(req,res)=>{
    try{
    const {id}=req.params;
    const resp=await membersBll.deleteMovie(id);
    res.status(200).json(resp);
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
})

router.patch("/edit-member/:id",async(req,res)=>{
    try{
    const {id}=req.params;
    const data=req.body;
    const resp=await membersBll.updateMember(id,data);
    res.status(200).json(resp);
    }
    catch(error){
        res.status(200).json({error:error.message});
    }
})

router.delete("/delete-member/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const resp=await membersBll.deleteMember(id);
        res.status(200).json(resp);    
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
})

router.post("/add-member",async(req,res)=>{
    try{
        const data=req.body;
        const resp=await membersBll.addMember(data);
        res.status(200).json(resp);
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
})

router.post("/subscribe-movie/:id",async(req,res)=>{
    try{
    const {id}=req.params;
    const data=req.body;
    const resp=await membersBll.subscribeMovie(id,data);
    res.status(200).json(resp);
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
})

module.exports=router
require("dotenv").config({path:"../.env"});
const express=require("express");
const cors=require("cors");
const connectDB=require("./config/db");
const router=require("./routes/routes");
const {PORT_CIN:PORT}=process.env;


connectDB();
const app=express();
app.use(cors());
app.use(express.json());
app.use("/",router);



app.listen(PORT,()=>{
    console.log(`app listening on port ${PORT} `);
})


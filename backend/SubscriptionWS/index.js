require("dotenv").config({path:"../.env"});
const express=require("express");
const cors=require("cors");
const connectDB=require("./config/db");
const router=require("./routes/routes");

const {PORT_SUBS:port}=process.env;


connectDB();

const app=express();
app.use(cors());
app.use(express.json());

app.use("/",router);

app.listen(port,()=>console.log(`app listening on port ${port}`));

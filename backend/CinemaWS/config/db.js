const mongoose = require("mongoose");
require("dotenv").config();
const mongoUrl=process.env.MONGO_URL;



const connectDB = async () => {
  await mongoose
    .connect(mongoUrl
      
    )
    .then(() => console.log("connected to mongo db"))
    .catch((error) => console.error("MongoDB connection error ", error));
};


module.exports=connectDB;
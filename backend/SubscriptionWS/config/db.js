const mongoose=require("mongoose");
const mongoUrl=process.env.MONGO_URL_SUBS;

const connectDB = async () => {
    try {
      await mongoose.connect(mongoUrl);
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  };


module.exports= connectDB; 



const mongoose=require("mongoose");

const connectDB = async () => {
    try {
      await mongoose.connect('mongodb+srv://raphi11:159951aa@moviesproj.zfmau45.mongodb.net/SubscriptionsDB');
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  };


module.exports= connectDB; 



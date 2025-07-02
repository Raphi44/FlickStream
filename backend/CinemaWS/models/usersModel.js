const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");



const userSchema= new mongoose.Schema({
    _id:{ type: Number, required: true, unique: true },
    user:String,
    password:String,
    role: {type:String,
    enum:['admin','user'],
    default:'user'
    }
})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is modified
  this.password = await bcrypt.hash(this.password, 12);
  next();
});


const User=mongoose.model("User",userSchema);

module.exports = User;
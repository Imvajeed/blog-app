import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,

    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.pre('save', async function (next) {
  try {
    // Only hash if password is modified or new
    if (!this.isModified('password')) return next();

    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

export const Users = mongoose.model("Users",userSchema);
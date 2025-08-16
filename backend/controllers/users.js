import { Users } from "../models/users.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const JWT_KEY = process.env.JWT_KEY;



//i need to remove this in production
const handleGetUsers = async(req,res)=>{
    const users = await Users.find({});
    if(users){
        return res.status(200).json(users);
    }else{
        return res.status(404).json({error:"Users not found"});
    }

}

const handleSignupUsers = async(req,res)=>{
    const body = req.body;
    console.log("User request",body);
    const newUser = await Users.create(
        {
            username:body.username,
            firstname:body.firstname,
            lastname:body.lastname,
            email:body.email,
            password:body.password
        }
    )

    if(newUser){
        return res.status(200).json({message:"User created successfully",newUser});
    }else{
        return res.status(400).json({error:"User not created"});
    }

}

const handleUsersLogin = async (req,res)=>{
    const body = req.body;
    const user = await Users.findOne({username:body.username});
    if(user){
        const verified = await bcrypt.compare(body.password,user.password);
        if(verified){

            const token =jwt.sign({
                id:user._id,
                username:user.username,
                email:user.email
            },JWT_KEY,{ expiresIn: '15m' });

            const refreshToken =jwt.sign({
                id:user._id,
                username:user.username,
                email:user.email
            },JWT_KEY,{ expiresIn: '10h' });

            res.cookie('refreshToken',refreshToken,{ httpOnly: true});

            return res.status(200).json({accessToken:token});
        }else{
            return res.status(401).json({message:"username or password is wrong"})
        }
    }else{
        return res.status(401).json({message:"username or password is wrong U"})
    }
}

const getAccessToken = async(id)=>{
    const user = await Users.findById(id);
    if(user){
        const token =jwt.sign({
                id:user._id,
                username:user.username,
                email:user.email
            },JWT_KEY,{ expiresIn: '15m' });
        return token;
    }else{
        return null;
    }
}

const handleGetToken = async(req,res)=>{
    console.log(req);
    const refreshToken = req.cookies.refreshToken;
    const verified = jwt.verify(refreshToken,JWT_KEY);
    if(verified){
        const token = await getAccessToken(verified.id);
        return res.status(200).json({accessToken:token});
    }
    else{
        return res.status(401).json({message:'unauthorised'});
    }
}

export {handleGetUsers,handleSignupUsers,handleUsersLogin,handleGetToken};
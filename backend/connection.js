import mongoose from "mongoose";
import ENV from 'dotenv';
ENV.config();
const mongo_url = process.env.MONGO_URL;

const connectDb = ()=>{
    mongoose.connect(`${mongo_url}/blog-app`).then(console.log("Database connected")).catch(error=>console.log(error));
}

export default connectDb;
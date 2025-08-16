import ENV from 'dotenv';
ENV.config();
import express from 'express';
import connectDb from './connection.js';
import logRequest from './middleware/logAllRequest.js';
import userRouter from './routes/users.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import blogRouter from './routes/blogs.js'

//PORT is saved in env file as PORT
const PORT = process.env.PORT;

//connecting db and creating app with express
connectDb();
const app = express();

//app middlewares
app.use(logRequest);
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

//handling routes
app.use("/users",userRouter);
app.use("/blogs",blogRouter);




//starting listner on PORT=8000
app.listen(PORT,()=>{
    console.log("Server running on Port : ",PORT);
})
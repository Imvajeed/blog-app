import express from 'express';
import { handleGetUsers,handleSignupUsers, handleUsersLogin,handleGetToken } from '../controllers/users.js';
const route = express.Router();

//i have to remove in production
route.get('/',handleGetUsers);


route.post('/signup',handleSignupUsers);
route.post('/login',handleUsersLogin);
route.get('/token',handleGetToken);


export default route;
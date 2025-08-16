import express from 'express';
import { handleGetAllBlogs,handleCreateBlogs,handleEditBlogs, handleDeleteBlog,handleGetMyBlogs } from '../controllers/blogs.js';
import verifyAuth from '../middleware/verifyAuth.js'


const router = express.Router();


router.get('/',handleGetAllBlogs);
router.get('/my-blogs',verifyAuth,handleGetMyBlogs)
router.post('/create',verifyAuth,handleCreateBlogs);
router.post('/edit',verifyAuth,handleEditBlogs);
router.delete('/delete',verifyAuth,handleDeleteBlog);



export default router;
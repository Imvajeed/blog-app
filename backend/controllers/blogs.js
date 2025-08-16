import { Blogs } from '../models/blogs.js'

const handleGetAllBlogs = async (req, res) => {
    const blogs = await Blogs.find({});
    return res.status(200).json({blogs:blogs});

}
const handleCreateBlogs = async (req, res) => {
    const body = req.body;
    if (body) {
        try {
            const blog = await Blogs.create({
                title: body.title,
                description: body.description,
                user_id: req.userInfo.id
            });
            if (blog) {
                return res.status(200).json({ message: 'blog created', data: blog });
            } else {
                return res.status(401).json({ error: 'blog not created' });
            }

        } catch (e) {
            return res.status(401).json({ error: 'blog not created' });
        }
    } else {
        return res.status(401).json({ error: 'empty body' });
    }
}


const handleEditBlogs = async (req, res) => {
    const body = req.body;
    const title = body.title;
    const description = body.description;
    let edits = {}
    if (title && description) {
        edits.title = title;
        edits.description = description;
    } else if (title) {
        edits.title = title;
    } else if (description) {
        edits.description = description;
    } else {
        return res.status(200).json({ message: "nothing to update" });
    }
    try {
        const blog = await Blogs.findById(body._id);
        console.log(blog.user_id);
        console.log("hello",req.userInfo.id);

        if (blog) {
            if (`${blog.user_id}` !== req.userInfo.id) {
                return res.status(401).json({ error: "Unauthorised" });
            } else {
                const newBlog = await Blogs.findByIdAndUpdate(body._id, { ...edits }, { new: true });
                return res.status(200).json(newBlog);
            }
        }
    } catch (e) {
        console.log(e);
        return res.status(401).json({ error: "Edit was unsuccessful" });
    }
}


const handleDeleteBlog = async(req,res)=>{
    const body = req.body;
    if(body&&body.id){
        try{
            const blog = await Blogs.findById(body.id);
            if(`${blog.user_id}`===req.userInfo.id){
                const deletedBlog = await Blogs.findByIdAndDelete(body.id);
                return res.status(200).json({message:'Delete success', deletedBlog});
            }else{
                return res.status(401).json({message:'Unauthorised'});
            }
        }catch(e){
            return res.status(401).json({error:"Delete was unsuccessful"});
        }
    }
}


const handleGetMyBlogs = async(req,res)=>{
    
    const blogs = await Blogs.find({user_id:req.userInfo.id});
    if(blogs){
        return res.status(200).json({blogs:blogs});
    }
    else{
        return res.status(200).json({});
    }
}

export {
    handleGetAllBlogs,
    handleCreateBlogs,
    handleEditBlogs,
    handleDeleteBlog,
    handleGetMyBlogs
}
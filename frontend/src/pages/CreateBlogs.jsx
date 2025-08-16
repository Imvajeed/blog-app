import React, { useEffect, useState } from 'react'
import store from '../store/BlogStore';
import { useDispatch } from 'react-redux';
import { createBlogs } from '../store/BlogSlice';
import { blogUploaded } from '../store/BlogSlice';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../store/UserSlice';


function CreateBlogs() {
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [status,setStatus] = useState(store.getState().Blogs.uploadBlogs.status)
  const [statusMessage, setStatusMessage] = useState(store.getState().Blogs.tokenMessage)
  const dispatch = useDispatch();
  const [loader,setLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    if(status!=='pending'){
      setLoader(false);
    }
    if(status==='success'){
      alert('Blog Uploaded');
      dispatch(blogUploaded());
      navigate('/my-blogs');
      
    }else if(status==='rejected'){
      alert('something went wrong');
    }
    if(statusMessage){
      dispatch(getAccessToken());
    }
  },[status,statusMessage])


  store.subscribe(()=>{
    setStatus(store.getState().Blogs.uploadBlogs.status);
    setStatusMessage(store.getState().Blogs.tokenMessage);
  })



  const handleUploadBlog = (e)=>{
    e.preventDefault();
    if(title&&description){
      setLoader(true);
      dispatch(createBlogs({title,description}));

    }else{
      alert('title and descriptions are required');
    }

  }
  return (
    <>
      
<form class="max-w-sm mx-auto">
  <div>
      <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
      <input type="text" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      />
  </div>
  <div class="mb-5">
      <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blog Content</label>
      <textarea type="text" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-100"
      value={description}
      onChange={(e)=>setDescription(e.target.value)}
      ></textarea>
  </div>
  <div>
    <button className=' dark:text-white rounded-full text-base bg-blue-300  p-1 hover:cursor-pointer' onClick={handleUploadBlog}>Upload</button>
  </div>
  
  
</form>

    </>
  )
}

export default CreateBlogs
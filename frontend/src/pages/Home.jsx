import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { useEffect, useState } from "react";
import store from '../store/BlogStore'
import {getAllBlogs} from '../store/BlogSlice'
function Home() {
  const [blogs,setBlogs] = useState(store.getState().Blogs.allBlogs.data);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(blogs.length<=0){
      dispatch(getAllBlogs());
    }
  },[])

  store.subscribe(()=>{
    setBlogs(store.getState().Blogs.allBlogs.data);
  });

  return (
    <>
        <div className="flex justify-evenly flex-wrap items-center mt-2 content-between">
            {
              blogs.map((element,index)=>(
                <BlogCard blog={element}/>
              ))
            }
        </div>

    </>
  )
}

export default Home;
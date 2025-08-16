import store from "../store/BlogStore"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {getMyBlogs} from '../store/BlogSlice'
import { useEffect, useState } from "react"

import BlogCard from "../components/BlogCard"

function UserBlogs() {
  const [myBlogs,setMyblogs] = useState(store.getState().Blogs.myblogs.data);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(myBlogs.length<=0){
      dispatch(getMyBlogs());
    }
  },[])
  store.subscribe(()=>{
    setMyblogs(store.getState().Blogs.myblogs.data)
  })

  return (
   <>
    <div className="flex justify-evenly flex-wrap items-center mt-2 content-between">
            {
              myBlogs.map((element,index)=>(
                <BlogCard blog={element}/>
              ))
            }
        </div>
    
   </>
  )
}

export default UserBlogs
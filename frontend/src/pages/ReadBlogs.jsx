import { useState } from "react"
import store from "../store/BlogStore"
import { useNavigate } from "react-router-dom";


function ReadBlogs() {
    const [blog, setBlogs] = useState(store.getState().Blogs.currentBlog);
    const navigate = useNavigate();
    if (!blog) {
        return (
            <>
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Nothing to show</h5>
            </>
        )
    }

    const handleBackToHome = () => {
        navigate('/home');

    }
    return (
        <>
            <div className="m-5 flex flex-col justify-center items-center">
                <div>
                    <div className="max:w-75">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
                </div>
                <div className="max:w-75">
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{blog.description}</p>
                </div>
                </div>
                <button class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer w-35"
                    onClick={handleBackToHome}

                >
                    Back to Home
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </button>
            </div>
        </>
    )
}

export default ReadBlogs
import { setCurrentBlog } from "../store/BlogSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function BlogCard({blog}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSetCurrentBlog = ()=>{
        dispatch(setCurrentBlog(blog));
        navigate('/read-blog');

    }

    const turncate = ()=>{
        let arr = blog.description.split(' ');
        console.log(arr);
        let turn = '';
        for(let i = 0; i< arr.length;i++){
            if(i===10){
                turn +='....';
                break;
            }
            turn += arr[i]+' ';
        }
        return turn;
    }
    return (
        <>


            <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{turncate()}</p>
                <button class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer"
                onClick={handleSetCurrentBlog}
                >
                    Read more
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </button>
            </div>

        </>
    )
}

export default BlogCard
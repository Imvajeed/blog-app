import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAccessToken } from "./UserSlice";
const API_URL = import.meta.env.VITE_API_URL;


export const createBlogs = createAsyncThunk('/blogs/upload-blogs', async (userData, thunk) => {
    try {
        const responce = await axios.post(`${API_URL}/blogs/create`, {
            title: userData.title,
            description: userData.description
        }, {
            headers: {
                bearer: localStorage.getItem('token')
            },
            withCredentials: true
        }).catch(error => thunk.rejectWithValue(error));

        return await responce.data;

    } catch (e) {
        return thunk.rejectWithValue(e);
    }

})

export const getAllBlogs = createAsyncThunk('/blogs', async (_, thunk) => {
    try {
        const responce = await axios.get(`${API_URL}/blogs`, {
            headers: {
                bearer: localStorage.getItem('token')
            }, withCredentials: true
        }).catch(error => thunk.rejectWithValue(error));
        return await responce.data;
    } catch (e) {
        return thunk.rejectWithValue(e);
    }
})


export const getMyBlogs = createAsyncThunk('/blogs/my-blogs',async(_,thunk)=>{
    try{
        const responce = await axios(`${API_URL}/blogs/my-blogs`,{
            headers:{
                bearer:localStorage.getItem('token')
            },withCredentials:true
        }).catch(error=>thunk.rejectWithValue(error));
        console.log(responce.data);
        return await responce.data;
    }catch(e){
        return thunk.rejectWithValue(e);
    }
})

const BlogSlice = createSlice({
    name: 'Blogs',
    initialState: {
        tokenMessage:null,
        allBlogs: {
            data: [],
            error: null,
            status: 'pending'
        },
        myblogs: {
            status:'pending',
            error:null,
            data:[]

        },
        uploadBlogs: {
            status: 'pending',
            error: null,
            message: null
        },
        currentBlog: {}
    },
    reducers: {
        blogUploaded: (state) => {
            state.uploadBlogs.status = 'pending';
        },
        setCurrentBlog: (state, actions) => {
            state.currentBlog = actions.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createBlogs.fulfilled, (state, actions) => {
            console.log(actions.payload);
            if (actions.payload.status === 401) {
                state.uploadBlogs.status = 'rejected';
                state.uploadBlogs.error = 'Axios Error';
                state.tokenMessage = actions.payload.responce.data.error;
                getAccessToken();
            }
            else {
                state.uploadBlogs.status = 'success';
                state.uploadBlogs.error = null;
                state.uploadBlogs.message = actions.payload.message;
                state.tokenMessage = null;
            }
        })
            .addCase(createBlogs.rejected, (state, actions) => {
                state.uploadBlogs.error = actions.error;
                state.uploadBlogs.message = 'Something went wrong';
                state.uploadBlogs.status = 'rejected';
            })
            .addCase(createBlogs.pending, (state) => {
                state.uploadBlogs.status = 'pending';
                state.uploadBlogs.error = null;
                state.uploadBlogs.message = null;
            })
        builder.addCase(getAllBlogs.fulfilled, (state, actions) => {
            state.allBlogs.status = 'success';
            state.allBlogs.error = null;
            state.allBlogs.data = actions.payload.blogs;
        })
            .addCase(getAllBlogs.rejected, (state, actions) => {
                state.allBlogs.error = actions.error;
                state.uploadBlogs.status = 'rejected';
            })
            .addCase(getAllBlogs.pending, (state) => {
                state.allBlogs.status = 'pending';
                state.allBlogs.error = null;
            })
        builder.addCase(getMyBlogs.fulfilled, (state, actions) => {
            state.myblogs.status = 'success';
            state.myblogs.error = null;
            state.myblogs.data = actions.payload.blogs;
        })
            .addCase(getMyBlogs.rejected, (state, actions) => {
                state.myblogs.error = actions.error;
                state.myblogs.status = 'rejected';
            })
            .addCase(getMyBlogs.pending, (state) => {
                state.myblogs.status = 'pending';
                state.myblogs.error = null;
            })
    }

})

export const { blogUploaded, setCurrentBlog } = BlogSlice.actions;
export default BlogSlice.reducer;
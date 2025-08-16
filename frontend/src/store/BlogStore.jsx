import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './UserSlice';
import BlogReducer from './BlogSlice';

const store = configureStore({
    reducer:{
        Users:UserReducer,
        Blogs:BlogReducer
    }

})

export default store;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const Signup = createAsyncThunk('/users/signup', async (userData, thunk) => {
    try {
        
        const responce = await axios.post(`${API_URL}/users/signup`, {
            username: userData.username,
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            password: userData.password
        }).catch(error => thunk.rejectWithValue(error));
        return await responce.data;

    } catch (e) {
        return thunk.rejectWithValue(e);
    }
})


export const userLogin = createAsyncThunk('/users/login',async(userData,thunk)=>{
    try{
        console.log("API",API_URL);
        const responce = await axios.post(`${API_URL}/users/login`,{
            username:userData.username,
            password:userData.password,
        },{
            withCredentials:true
        }).catch(error=>thunk.rejectWithValue(error));

        console.log(await responce.data)
        return await responce.data;
    }catch(e){
        return thunk.rejectWithValue(e);
    }
})

export const getAccessToken = createAsyncThunk('/users/token',async(_,thunk)=>{
    try{
        const responce = await axios.get(`${API_URL}/users/token`,{withCredentials:true}).catch(error=>thunk.rejectWithValue(e));
        return await responce.data;
    }catch(e){
        return thunk.rejectWithValue(e);
    }
})
const userSlice = createSlice({
    name: "Users",
    initialState: {
        user: {
            loggedIn: false,
            accessToken: null,
            userInfo: null,
            error: null,
            status:'pending'
        },
        signup:{
            error:null,
            status:'pending',
        }
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(Signup.rejected, (state, actions) => {
                state.signup.error = actions.error;
                state.signup.status = 'rejected';
            })
            .addCase(Signup.pending,(state)=>{
                state.signup.status = 'pending';
            })
            .addCase(Signup.fulfilled,(state,actions)=>{
                state.signup.status = 'success';
                state.signup.error = null;
            })


        builder
            .addCase(userLogin.rejected, (state, actions) => {
                state.user.error = actions.error;
                state.signup.status = 'rejected';
            })
            .addCase(userLogin.pending,(state)=>{
                state.user.status = 'pending';
            })
            .addCase(userLogin.fulfilled,(state,actions)=>{
                state.user.status = 'success';
                state.user.error = null;
                state.user.accessToken = actions.payload.aceessToken || null;
                localStorage.setItem('token',actions.payload.accessToken);
                state.user.loggedIn = true;

            })
        builder
            .addCase(getAccessToken.rejected, (state, actions) => {
                state.user.error = actions.error;
                state.user.status = 'rejected';
            })
            .addCase(getAccessToken.pending,(state)=>{
                state.user.status = 'pending';
                state.user.loggedIn = false;
            })
            .addCase(getAccessToken.fulfilled,(state,actions)=>{
                state.user.status = 'success';
                state.user.error = null;
                state.user.accessToken = actions.payload.aceessToken;
                localStorage.setItem('token',actions.payload.accessToken);
                state.user.loggedIn = true;

            })
    }
})



export default userSlice.reducer;
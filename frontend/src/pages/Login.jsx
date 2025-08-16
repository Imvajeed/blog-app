import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loders from '../components/Loders'
import { useDispatch } from 'react-redux';
import store from '../store/BlogStore';
import { userLogin } from '../store/UserSlice';
function Login() {
  const [loading, setLoading] = useState(false);
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [loggedIn,setLoggedIn] = useState(store.getState().Users.user.loggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    if(loggedIn){
      navigate('/home');
    }
  },[loggedIn])
  
  store.subscribe(()=>{
    setLoggedIn(store.getState().Users.user.loggedIn);
  })

  if (loading) {
    return (
      <>
      <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className="text-white text-center mb-2 text-2xl">Logging In</h1>
          <Loders/>
        </div>

      </>
    )
  }

  const handleLogin = (e)=>{
    e.preventDefault();
    setLoading(true);
    try{
      dispatch(userLogin({username,password}));

    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);;
      setPassword('');
      setUsername('');
    }
  }



  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-900">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-100">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="username"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  placeholder='Username'
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  placeholder="Password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                onClick={handleLogin}
              >
                Sign in
              </button>
            </div>
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                Forgot password?
              </a>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Not a member?{' '}
            <Link to={'/sign-up'} className="font-semibold text-indigo-400 hover:text-indigo-300">
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login
import  {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserProfile from './pages/UserProfile';
import CreateBlogs from './pages/CreateBlogs';
import NavBar from './components/NavBar';
import UserBlogs from './pages/UserBlogs';
import ReadBlogs from './pages/ReadBlogs';

function App() {
  

  return (
    <>
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/sign-up' element={<Signup/>}/>
          <Route path='/my-profile' element={<UserProfile/>}/>
          <Route path='/create-blog' element={<CreateBlogs/>}/>
          <Route path='/my-blogs' element={<UserBlogs/>}/>
          <Route path='/read-blog' element={<ReadBlogs/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useJwt } from "react-jwt";
import Dashboard from './dashboard';
import LoadingBar from 'react-redux-loading'
import NewTweet from './NewTweet'
import TweetPage from './TweetPage'
import Navigationbar from './Navbar';
import Register from './Register';
import SignIn from './SignIn';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Home from './Home';
import Profile from './Profile';
import { ToastContainer } from 'react-toastify'
import { authActions } from '../store/auth-slice';


function App() {
  console.log("app");
  const token = useSelector(state => state.auth.token);
  const currentUser = useSelector(state => state.user.currentUser);
  const tweetList = useSelector(state => state.tweet.tweetList);
  const { decodedToken, isExpired } = useJwt(localStorage.getItem('token'));
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  // console.log(token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;



  return (
    <Router>
      <LoadingBar />
      <Navigationbar />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard loggedIn={isLoggedIn} />} />
        <Route path='/tweet/:id' element={<TweetPage tweetList={tweetList} currentUser={currentUser} />} />
        <Route path='/new' element={<NewTweet />} />
        <Route path='/profile/:id' element={<Profile tweetList={tweetList} />} />
        <Route path='/login' element={<SignIn loggedIn={isLoggedIn} />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;


// if(token !== null){
//   return (
//     <Router>
//       <LoadingBar />
//       <Navigationbar />
//       <ToastContainer />
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/dashboard' element={<Dashboard loggedIn={isLoggedIn} />} />
//         <Route path='/tweet/:id' element={<TweetPage tweetList={tweetList} currentUser={currentUser} />} />
//         <Route path='/new' element={<NewTweet />} />
//         <Route path='/profile/:id' element={<Profile tweetList={tweetList} />} />
//       </Routes>
//     </Router>  
//   );
// }
// else{

//   return (
//     <Router>
//       <LoadingBar />
//       <Navigationbar />
//       <ToastContainer />
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/dashboard' element={<Dashboard loggedIn={isLoggedIn} />} />
//         <Route path='/tweet/:id' element={<TweetPage tweetList={tweetList} currentUser={currentUser} />} />
//         <Route path='/new' element={<NewTweet />} />
//         <Route path='/login' element={<SignIn loggedIn={isLoggedIn} />} />
//         <Route path='/register' element={<Register />} />
//         <Route path='/profile/:id' element={<Profile tweetList={tweetList} />} />
//       </Routes>
//     </Router>

//   );

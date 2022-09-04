import React, { Component, Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom'
import { useJwt } from "react-jwt";
import Dashboard from './dashboard';
import LoadingBar from 'react-redux-loading'
import NewTweet from './NewTweet'
import TweetPage from './TweetPage'
import Navbar from './Navbar';
import Register from './Register';
import SignIn from './SignIn';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { loadAllTweet } from '../services/TweetService';
import { tweetActions } from '../store/tweet-slice';
import Home from './Home';
import Profile from './Profile';
import {ToastContainer} from 'react-toastify'


function App() {
  console.info('app js running');
  const token = useSelector(state => state.auth.token);
  const currentUser = useSelector(state => state.user.currentUser);
  const tweetList = useSelector(state => state.tweet.tweetList);
  const notification = useSelector(state => state.notification.notification);
  const { decodedToken, isExpired } = useJwt(localStorage.getItem('token'));
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  console.log(token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  console.log(currentUser);

  return (
    <Router>
      <LoadingBar />
      <Navbar loggedIn={isLoggedIn} currentUser={currentUser} />
      <ToastContainer/>
      <Routes>
        {/* <Route exact path="/" element={loggedIn ? <Dashboard loggedIn={loggedIn} /> : <Navigate to="/login" />} /> */}
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard loggedIn={isLoggedIn} />} />
        {/* <Route path='/' element={<Dashboard loggedIn={isLoggedIn} />} /> */}
        <Route path='/tweet/:id' element={<TweetPage tweetList={tweetList} currentUser={currentUser} />} />
        <Route path='/new' element={<NewTweet />} />
        <Route path='/login' element={<SignIn loggedIn={isLoggedIn} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile/:id' element={<Profile tweetList={tweetList} />} />
      </Routes>
    </Router>

  );
}

export default App;
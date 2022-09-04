import React, { Component, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { CreateTweet } from '../services/TweetService';
import { useSelector, useDispatch } from 'react-redux';
import { notificationActions } from '../store/notification-slice';
import { toast } from 'react-toastify';


const NewTweet = () => {
    const dispatch = useDispatch();
    const [tweetObj, setTweetObj] = useState({});
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.user.currentUser);
    
    const handleChange = (event) => {
        setTweetObj({ ...tweetObj, [event.target.name]: event.target.value })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(tweetObj);
        CreateTweet(currentUser.email, tweetObj).then(() => {
            toast.success("Tweet posted successfully");
            navigate('/dashboard');
        },error => {
            toast.error(error);
            console.log(error);
        });
    }

    return (
        <div>
            <h3 className='center'>Compose new Tweet</h3>
            <form className='new-tweet' onChange={handleChange} onSubmit={handleSubmit}>
                <input name='tag' className='form-control mb-2' placeholder='Enter tag'/>
                <textarea
                    placeholder="What's happening?"
                    className='form-control mb-3'
                    maxLength={280}
                    name="subject"
                />
                <button
                    className='btn btn-primary'
                    type='submit'                >
                    Submit</button>
            </form>
        </div>
    );
}

export default NewTweet
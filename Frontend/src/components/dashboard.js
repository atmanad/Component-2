import React, { useEffect } from 'react';
import { showLoading, hideLoading } from 'react-redux-loading'
import { useNavigate } from 'react-router-dom';
import Tweet from './Tweet';
import { loadAllTweet } from '../services/TweetService';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { tweetActions } from '../store/tweet-slice';
 

const Dashboard = ({ loggedIn }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // console.log(loggedIn);
    const loadTweets = () => {
        dispatch(showLoading());
        loadAllTweet().then(response => {
            dispatch(tweetActions.loadTweets(response));
            dispatch(hideLoading());
        }, error => {
            dispatch(hideLoading());
            console.log(error);
        });
    }


    useEffect(() => {
        if(loggedIn)loadTweets();
        else navigate('/login');
    }, [loggedIn]);

    const tweetList = useSelector(state => state.tweet.tweetList);
    // console.log(tweetList);

    if (tweetList === undefined) {
        return (<div>loading......</div>)
    }

    return (
        tweetList.length !== 0 &&
        (
            <div>
                <ul className='dashboard-list mt-5'>
                    {tweetList?.map((tweet) => (
                        <li key={tweet?.id}>
                            <Tweet t={tweet} reply={false}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    )

}



export default Dashboard;
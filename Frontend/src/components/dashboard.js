import React, { useEffect } from 'react';
import { showLoading, hideLoading } from 'react-redux-loading'
import Tweet from './Tweet';
import { loadAllTweet } from '../services/TweetService';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { tweetActions } from '../store/tweet-slice';


const Dashboard = ({ loggedIn }) => {
    const dispatch = useDispatch();
    console.log(loggedIn);
    const loadTweets = () => {
        dispatch(showLoading());
        loadAllTweet().then(response => {
            dispatch(tweetActions.loadTweets(response));
            // console.log(response);
            dispatch(hideLoading());
        }, error => {
            dispatch(hideLoading());
            console.log(error);
        });
    }


    useEffect(() => {
        if(loggedIn)loadTweets();
    }, [loggedIn]);

    const tweetList = useSelector(state => state.tweet.tweetList);
    console.log(tweetList);
    // console.log(tweetList);

    // return (
    //     <div>
    //         <h3 className='center'>Your Timeline</h3>
    //         <ul className='dashboard-list'>
    //             {tweetList?.map((tweet) => (
    //                 <li key={tweet.id}>
    //                     <Tweet t={tweet} />
    //                 </li>
    //             ))}
    //         </ul>
    //     </div>
    // )

    if (tweetList === undefined) {
        return (<div>loading......</div>)
    }

    return (
        tweetList.length !== 0 &&
        (
            <div>
                <ul className='dashboard-list'>
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
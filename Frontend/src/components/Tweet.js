import React, { Component, useDebugValue, useState } from 'react';
import { Modal, Button, Tab, Tabs } from 'react-bootstrap';
import { FaReply } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa'
import { FaRegHeart, FaInfoCircle, FaEdit, FaRegTrashAlt } from 'react-icons/fa'
// import {AiOutlineInfoCircle} from 'react-icons'
import { Link, useNavigate } from 'react-router-dom'
import { deleteTweet, postALike, updateTweet } from '../services/TweetService';
import { useSelector, useDispatch } from 'react-redux';
import { tweetActions } from '../store/tweet-slice';
import { toast } from 'react-toastify';


const Tweet = ({ t, reply, profilePage }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser);
    const tweetList = useSelector(state => state.tweet.tweetList);
    const [show, setShow] = useState(false);

    // console.log(t);
    const {
        datePosted, tag, subject, user, id, likes, replies
    } = t;

    const [updatedTweet, setUpdatedTweet] = useState(subject);


    // console.log(likes);
    // console.log(currentUser);
    const hasLiked = likes.filter(element => element.userId == currentUser.email);
    // console.log(hasLiked);



    const handleLike = (e) => {
        e.preventDefault();
        postALike(id, currentUser).then((res) => {
            if (res) {
                tweetList.forEach((element, index) => {
                    if (element.id == id) {
                        dispatch(tweetActions.addLike({
                            index: index,
                            like: {
                                tweetId: id,
                                userId: currentUser.email
                            }
                        }))
                    }
                });
            }
            // console.log(id, user);
            // console.log("success");
            // navigate('/dashboard');
        }, error => console.log(error));

    }

    function formatDate(timestamp) {
        const d = new Date(timestamp)
        const time = d.toLocaleTimeString('en-US')
        return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
    }
    // toParent = (e, id) => {
    //     e.preventDefault()
    //     this.props.history.push(`/tweet/${id}`)

    // }
    // const { tweet } = this.props;
    // console.log(props);
    // if ( tweet === null) {
    //     return <p>The tweet dosen't exist</p>
    // }

    // console.log(user);


    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(id, subject);
        updateTweet(currentUser.email, id, { tag: tag, subject: updatedTweet }).then(res => {
            console.log(res);
            tweetList.forEach((element, index) => {
                if (element.id == id) {
                    dispatch(tweetActions.updateTweet({
                        index: index,
                        subject: updatedTweet
                    }));
                }
            });

            toast.success(res);
            handleClose();
        }, error => {
            console.log(error);
            toast.error(error.message)
        });

    }

    const handleDelete = (e) => {
        e.preventDefault();
        deleteTweet(currentUser.email, id).then(res => {
            console.log(res);
            dispatch(tweetActions.deleteTweet(id));
            toast.success("Tweet Deleted");
        }, error => {
            console.log(error);
            toast.error(error.message)
        });

    }

    return (
        <>
            <Modal show={show} onHide={handleClose} >
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Tweet</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form style={{ minWidth: 400 + "px" }} onSubmit={handleSubmit}>
                            <textarea
                                placeholder="What's happening?"
                                className='form-control mb-3'
                                maxLength={280}
                                name="subject"
                                value={updatedTweet}
                                onChange={(e) => setUpdatedTweet(e.target.value)}
                            />
                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>
                    </Modal.Body>
                </Modal.Dialog>
            </Modal>
            <div className='tweet'>
                <img
                    src={`https://tylermcginnis.com/would-you-rather/dan.jpg`}
                    alt={`Avatar of ${user?.firstName}`}
                    className='avatar'
                />
                <div className='tweet-info'>
                    <div>
                        <span>{user?.firstName}.{user?.lastName}</span>
                        <div>{datePosted && formatDate(datePosted)}</div>
                        <div>
                            #{tag}
                        </div>
                        <p>{subject}</p>
                    </div>
                    <div className='tweet-icons'>
                        <Link to={`/tweet/${id}`} className={reply ? "disabled" : ""}>
                            <FaReply className='tweet-icon mr-2' />
                        </Link>

                        <span>{replies && replies.length}</span>
                        <button className='heart-button ml-2'
                            onClick={handleLike}
                        >
                            {hasLiked.length !== 0
                                ? <FaHeart color='#e0245e' className='tweet-icon' />
                                : <FaRegHeart className='tweet-icon' />
                            }
                            {/* <FaRegHeart className='tweet-icon' /> */}
                        </button>
                        <span>{likes && likes.length}</span>
                        {profilePage &&
                            <>
                                <span><FaEdit className="tweet-icon" onClick={handleShow} /></span>
                                <span><FaRegTrashAlt className="tweet-icon ml-3" color='#e0245e' onClick={handleDelete} /></span>
                            </>

                        }

                    </div>
                </div>
            </div>
        </>
    );
}


export default Tweet
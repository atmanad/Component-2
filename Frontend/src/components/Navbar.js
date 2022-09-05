import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../services/UserService'
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/auth-slice';

function Navbar({ loggedIn, currentUser }) {
    return (
        <>
            <div className='nav justify-content-center'>
                <ul>
                    {loggedIn ? <LoggedIn currentUser={currentUser} /> : <LoggedOut />}
                </ul>
            </div>
        </>
    )
}

export default Navbar

function LoggedIn({ currentUser }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick = () => {
        logout();
        dispatch(authActions.logout());
        navigate('/login');
        console.log('logging out');
    }
    return (
        <>
            <li>
                <NavLink to='/dashboard' className={isActive => (isActive ? "active" : 'none')}>
                    Dashboard
                </NavLink>
            </li>
            <li>
                <NavLink to='/new' className={isActive => (isActive ? "active" : 'none')}>
                    New Tweet
                </NavLink>
            </li>
            <li>
                <span>{currentUser.email}</span>
            </li>
            <li>
                <NavLink to={`/profile/${currentUser.email}`} className={isActive => (isActive ? "active" : 'none')}>
                    <span>{currentUser.firstName}.{currentUser.lastName}</span>
                </NavLink>
            </li>
            <li>
                <a className='active'>
                    <button onClick={handleClick} className="log-btn">Log out</button>
                </a>
            </li>
        </>
    )
}
function LoggedOut() {
    return (
        <>
            <li>
                <NavLink to='/login' className={isActive => (isActive ? "active" : 'none')}>
                    Login
                </NavLink>
            </li>
            <li>
                <NavLink to='/register' className={isActive => (isActive ? "active" : 'none')}>
                    Register
                </NavLink>
            </li>
        </>
    )

}
// logoutbutton.js

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';
import { NavLink } from 'react-router-dom';
import '../styles/LogoutButton.css';


const LogoutButton = () => {
  const dispatch = useDispatch()
  const LogoutFromNavBar = useSelector(state => state.session.user)
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  if (LogoutFromNavBar) {
    return <NavLink to='/' onClick={onLogout} className="logout">Logout</NavLink>;
  } else {
    return (
        <div className = "logout_outer_container">
          <div className = "logout_inner_container">
          <NavLink to='/login' exact={true} activeClassName='active' className='logout_btn'>
              Log In
          </NavLink>
          </div>
        </div>
    )
  }
};

export default LogoutButton;

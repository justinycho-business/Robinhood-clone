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
    return <NavLink to='/login' exact={true} activeClassName='active' className='logout'>
              Please log in
          </NavLink>
  }

};

export default LogoutButton;

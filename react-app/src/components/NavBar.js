
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux'
import './styles/NavBar.css';


const NavBar = () => {

  

  const user = useSelector(state => state.session.user)
  const removeSignUpFromNavBar = useSelector(state => state.session.user)

  if(removeSignUpFromNavBar) {
    return (
      <nav>
        <div>
          <p>Welcome {user.username}</p>
        </div>
         <div>
          <NavLink to='/' exact={true} activeClassName='active' className='home'>
            Home
          </NavLink>
        </div>
        <div>
          <NavLink to='/login' exact={true} activeClassName='active' className='login'>
            Login
          </NavLink>
        </div>

        {/* <div>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div> */}
        <div>
          <LogoutButton />
        </div>
    </nav>


  } else {
    return (
           <nav>
        <div>
          <p>Welcome {user.username}</p>
        </div>
         <div>
          <NavLink to='/' exact={true} activeClassName='active' className='home'>
            Home
          </NavLink>
        </div>
        <div>
          <NavLink to='/login' exact={true} activeClassName='active' className='login'>
            Login
          </NavLink>
        </div>
        <div>
          <NavLink to='/sign-up' exact={true} activeClassName='active' className='signup'>
            Sign Up
          </NavLink>
        </div>
        {/* <div>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div> */}
        <div>
          <LogoutButton />
        </div>
    </nav>
  )
  }
}

export default NavBar;


import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux'
import './styles/NavBar.css';


const NavBar = () => {
  const [search, setSearch] = useState('')
  const user = useSelector(state => state.session.user)
  const removeSignUpFromNavBar = useSelector(state => state.session.user)

  if (removeSignUpFromNavBar) {
    return (
      <nav>
        <div>
          <NavLink to='/' exact={true} activeClassName='active' className='home'>
          <div className="feather_icon">
          <i class="fas fa-feather"></i>
          </div>
          </NavLink>
        </div>
        <div className="welcome_message">
          <p>Welcome {user.username}</p>
        </div>
        <div className="search_container">
          <label htmlFor="search"></label>
          <input placeholder="Search" className="search" type="text" value={search} onChange={(e) => setSearch(e.target.value)}></input>
        </div>
        {/* <div>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div> */}
        <div className="nav_icons">
          <div>
            <NavLink to={`/dashboard/${user.id}`} exact={true} activeClassName='active' className='dashboard'>
              Dashboard
            </NavLink>
          </div>
          <div>
            <LogoutButton />
          </div>
        </div>
      </nav>
    )
  } else {
    return (
      <nav>
        <div>
          <NavLink to='/' exact={true} activeClassName='active' className='home'>
          <div className="feather_icon">
          Mr.Hood <i class="fas fa-feather"></i>
          </div>
          </NavLink>
        </div>
        {/* <div>
          <NavLink to='/login' exact={true} activeClassName='active' className='login'>
            Login
          </NavLink>
        </div> */}
        {/* <div>
          <NavLink to='/users' exact={true} activeClassName='active'>
          Users
          </NavLink>
        </div> */}
          <div>
          <LogoutButton />
          </div>
          <div>
          <NavLink to='/sign-up' exact={true} activeClassName='active' className='signup'>
            Sign Up
          </NavLink>
        </div>
      </nav>
    )
  }
}

export default NavBar;

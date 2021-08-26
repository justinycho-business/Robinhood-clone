import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles/Footer.css';

const Footer = () => {
  return(
    <div className="footer_container">
      <NavLink to='/about-us' className='about_us' exact={true}>
      <div className="footer">
            <div>
            <NavLink to='/about-us' className='about_us' exact={true}>
              About us
            </NavLink>
            </div>
      </div>
      </NavLink>
    </div>
  )
}

export default Footer

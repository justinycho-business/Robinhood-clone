import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../store/session';
import './styles/Home.css'

const Home = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const demoUserLogin = async (e) => {
    e.preventDefault();
    await dispatch(login('demo@aa.io', 'password'))


  };
  if (user) {
    return <Redirect to={`/dashboard/${user.id}`} />;
  }
  return (
    <div className='row-home'>
      <div className='home-column-1'>
        {/* <div><h1 className="h1-0">Maple Stocks</h1></div> */}
        <div><h1 className="h1-0">Investing Made Easy</h1></div>
        <div className="description_1">
        Investing with peace of mind using the
        </div>
        <div className="description_2">
        tools you need to get the bang out of your buck.
        </div>
        <div className="description_3">
        Sign up now! Gains may vary.
        </div>
        <div className="sign_up_outer_container">
          <div className="sign_up_container">
          <NavLink to='/sign-up' exact={true} activeClassName='active' className='sign_up'>
          Sign Up
          </NavLink>
          <button type='submit' className='demologin' onClick={demoUserLogin}>Demo Login</button>
          </div>
        </div>
      </div>
      <div className="home-column-2">
      <div className="home-column-2-bottom">
          <h2>Credits:</h2>
          <ul>
            <li className="lihome"><a href="https://robinhood.com/">https://robinhood.com/</a> for the inspiration and below gif </li>
            <li className="lihome">Data was provided by Financial Modeling Prep (<a href='https://financialmodelingprep.com/developer/docs/'>https://financialmodelingprep.com/developer/docs/</a>)</li>
            <li className="lihome">Data was also provided by IEX Cloud (<a href='https://iexcloud.io/docs/api/'>https://iexcloud.io/docs/api/</a>)</li>
            <li className="lihome">Loading animation is from: <a href="https://codepen.io/martinvd">https://codepen.io/martinvd</a> </li>

          </ul>
        </div>
        <div className="home-column-2-top">
          <img className="gifrobin" src="https://i.ibb.co/QQPYQ4Q/credits-to-robinhood-com.gif"/>
        </div>
        {/* <div className="home-column-2-bottom">
          <h2>Credits:</h2>
          <ul>
            <li><a href="https://robinhood.com/">https://robinhood.com/</a> for the inspiration and above gif </li>
            <li>Data was provided by Financial Modeling Prep (<a href='https://financialmodelingprep.com/developer/docs/'>https://financialmodelingprep.com/developer/docs/</a>)</li>
            <li>Data was also provided by IEX Cloud (<a href='https://iexcloud.io/docs/api/'>https://iexcloud.io/docs/api/</a>)</li>
          </ul>
        </div> */}
      </div >
    </div>
  );
};

export default Home;

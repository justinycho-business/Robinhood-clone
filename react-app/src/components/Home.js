import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './styles/Home.css'

const Home = () => {


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
      </div>
      <div class="home-column-2">

      </div>
    </div >
  );
};

export default Home;

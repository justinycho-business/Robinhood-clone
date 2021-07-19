import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './styles/Home.css'

const Home = () => {


  return (
    <div className='row-home'>
      <div className='home-column-1'>
        <div><h1 className="h1-0">Maple Stocks</h1></div>
        <div><h2 className="h2-0">Your smooth and slick trading platform</h2></div>
      </div>
      <div class="home-column-2">

      </div>

    </div >
  );
};

export default Home;

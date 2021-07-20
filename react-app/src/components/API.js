import React, { useEffect, useState } from 'react';
import { NavLink, Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


function Api() {

    let [stockdata, setstockdata] =useState(null);
  useEffect(() => {

    (async function fetchData() {
      const response = await fetch('/api/company');
      console.log(response);
      const responseData = await response.json();
      console.log(responseData);
        setstockdata(responseData);
    })()

  }, []);
    console.log(stockdata);
    return (
    <>
    {stockdata &&

          <h1>{stockdata?.symbol}</h1>

    }
    </>)
}






// const API = () => {

//     let stockinfo = {};

//     // const fetch = require("node-fetch");
//     // async function testApi() {
//     //     let response = await fetch(api)
//     //     let data = response.json()
//     //     return data
//     // }

//     // testApi().then(data => {
//     //     console.log(data)
//     // stockinfo = data})

//     return (
//     <div className='row-home'>
//       <div className='home-column-1'>
//         <div><h1 className="h1-0">`${stockinfo}`</h1></div>
//       </div>
//       <div class="home-column-2">

//       </div>

//     </div >
//   );
// };

export default Api;

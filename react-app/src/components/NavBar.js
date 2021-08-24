import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useDispatch, useSelector } from 'react-redux'
import { getDashboardData } from '../store/dashboard';
// import { SearchBar } from 'react-native-elements';
import './styles/NavBar.css';

const NavBar = () => {
  const [search, setSearch] = useState('')
  const [companyTickerData, setCompanyTickerData] = useState(undefined)
  const user = useSelector(state => state.session.user)
  const removeSignUpFromNavBar = useSelector(state => state.session.user)
  // const dispatch = useDispatch()
  const history = useHistory()
  // const id = useParams()

  // let companyTickerData;

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/search/all`)
      const responseData = await response.json()
      // console.log(responseData.tickers);
      setCompanyTickerData(responseData.tickers)

      // let trimmed_companylist = () => {
      //   let array = responseData.tickers.map(ele => ele.ticker)
      //   return array.filter(ele => ele.includes('.'))

      // }
      // setCompanyTickerData(trimmed_companylist())
      // // console.log(searchData)

    })()
  }, []);

  // useEffect(() => {

  // }, [companyTickerData])

  //after we find the ticker, user selects it and gets redirected to stocks page
  const searchResult = async (e) => {
    e.preventDefault()
    const data = e.target.value
    history.push(`/stocks/${data}`)
  }

  const shoot = () => {
    history.push(`/dashboard/${user.id}`);
    window.location.reload(true);
  }

  const homePageRedirect = (e) => {
    e.preventDefault();
    history.push('/')

  };

  // // create queue for the data and add initial node
  //    let companyTickerData = new Queue(this.nodes.length);
  //    let explored = new Set();
  //    companyTickerData.enqueue(node);
  // // mark the first node as explored?
  //    add(node);
  // // iterate through data until queue is empty
  //    while (!companyTickerData.isEmpty()) {
  //       let newData = companyTickerData.dequeue();    
  //       console.log(newData);
  // // grabbed this part from a tutorial
  // // 1. in the edges object, we search for nodes this node is directly connected to.
  // // 2. we filter out the nodes that have already been explored.
  // // 3. then we mark each unexplored node as explored and add it to the queue.
  //       this.edges[newData]
  //       .filter(n => !explored.has(n))
  //       .forEach(n => {
  //          explored.add(n);
  //          companyTickerData.enqueue(n);
  //       });
  //    }
  // }

  if (removeSignUpFromNavBar) {
    return (
      <>{companyTickerData &&
        <nav className='NavBar'>
          <div className="firstbox">
            <NavLink to='/' exact={true} activeClassName='active' className='home'>
              <div className="feather_icon">
                <i className="fas fa-feather"></i>
              </div>
            </NavLink>
          </div>
          <div className="secondbox"
          // className = "welcome_message_container"
          >
            <div className="welcome_message_outer_container">
              <div className="welcome_message_inner_container">
                <div className="welcome_message" onClick={homePageRedirect}>Welcome {user.username}</div>
              </div>
            </div>
          </div>
          {/* {companyTickerData && */}
          <div className="thirdbox"
          // className="search_outer_container"
          >
            {/* <div className = "search_inner_container"> */}
            <div className="search_container">
              <input placeholder="Search" className="search" type="text" value={search} onChange={(e) => setSearch(e.target.value)}></input>
              <div class="dropdown">
                {search !== '' && <div id="myDropdown" class="dropdown-content">
                  {search !== '' &&
                    //filter method on the data grabbed from our useEffect
                    companyTickerData.filter((e) => e.ticker.startsWith(search.toUpperCase())).map(dicOfCompany => (
                      <a href={`/stocks/${dicOfCompany.ticker}`}>
                        {dicOfCompany.ticker}
                      </a>
                    ))
                  }
                </div>}
              </div>
            </div>
            {/* <ul>
                  {
                    //filter method on the data grabbed from our useEffect
                    companyTickerData.filter((e) => e.ticker.startsWith(search.toUpperCase())).map(dicOfCompany => (
                      <li onClick={() => searchResult(dicOfCompany.ticker)}>
                          {dicOfCompany.ticker}
                      </li>
                    ))
                  }
                </ul> */}
            {/* </div> */}
          </div>
          {/* } */}
          {/* <div>
        <NavLink to='/users' exact={true} activeClassName='active'>
          Users
        </NavLink>
      </div> */}
          <div className="fourthbox"
            className="nav_icons">
            <div>
              <NavLink to={`/dashboard/${user.id}`} onClick={shoot} exact={true} activeClassName='active' className='dashboard'>
                Dashboard
              </NavLink>
            </div>
            <div>
              <LogoutButton />
            </div>
          </div>
        </nav>}
      </>
    )
  } else {
    return (
      <nav>
        <div className="firstbox">
          <NavLink to='/' exact={true} activeClassName='active' className='home'>
            <div className="feather_icon_container">
              <div className="feather_icon">
                Mr. Hood <i class="fas fa-feather"></i>
              </div>
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
        <div className="second_outer_container">
          <div className="second_container">
            <NavLink to='/login' exact={true} activeClassName='active' className='login'>
              Log In
            </NavLink>
          </div>
          <div className="thirdbox">
            <NavLink to='/sign-up' exact={true} activeClassName='active' className='signup'>
              Sign Up
            </NavLink>
          </div>
        </div>
      </nav>
    )
  }
}

export default NavBar;

// const NavBar = () => {
//     const [search, setSearch] = useState('')
//     const user = useSelector(state => state.session.user)
//     const removeSignUpFromNavBar = useSelector(state => state.session.user)
//     // const dispatch = useDispatch()
//     const history = useHistory()
//     // const id = useParams()

//   // useEffect(() => {
//   //     (async() => {
//   //         const response = await fetch(`/api/search/info/${id.ticker}`)
//   //         const responseData = await response.json()
//   //         setSearch(responseData);
//   //         dispatch(getDashboardData(ticker.id))
//   //     })()
//   // }, [user, id, dispatch]);

//   useEffect(() => {
//       (async() => {
//           const response = await fetch(`/api/search/all`)
//           const responseData = await response.json()
//           console.log(responseData);
//           setSearch(responseData);
//       })()
//   }, []);

//   //after we find the ticker, user selects it and gets redirected to stocks page
//   const searchResult = async(e) => {
//       e.preventDefault()
//       const data = e.target.value
//       history.push(`/stocks/${data}`)
//   }

//   if (removeSignUpFromNavBar) {
//     return (
//       <nav>
//         <div>
//           <NavLink to='/' exact={true} activeClassName='active' className='home'>
//             <div className="feather_icon">
//               <i className="fas fa-feather"></i>
//             </div>
//           </NavLink>
//         </div>
//         <div className = "welcome_message_container">
//           <div className="welcome_message_inner_container">
//             <div className = "welcome_message">Welcome {user.username}</div>
//           </div>
//         </div>
//         <div className="search_outer_container">
//           <div className = "search_inner_container">
//             <input placeholder="Search" className="search" type="text" value={search} onChange={(e) => setSearch(e.target.value)}></input>
//               <div>
//                 <div>
//                   {/* <ul> */}
//                     {/* {
//                       //filter method on the data
//                       setSearch.filter('ticker I"ll be grabbing' === search).forEach(ticker => {
//                         <li>

//                         </li>
//                       })
//                     } */}
//                   {/* </ul> */}
//                 </div>
//               </div>
//           </div>
//         </div>
//         {/* <div>
//           <NavLink to='/users' exact={true} activeClassName='active'>
//             Users
//           </NavLink>
//         </div> */}
//         <div className="nav_icons">
//           <div>
//             <NavLink to={`/dashboard/${user.id}`} exact={true} activeClassName='active' className='dashboard'>
//               Dashboard
//             </NavLink>
//           </div>
//           <div>
//             <LogoutButton />
//           </div>
//         </div>
//       </nav>
//     )
//   } else {
//     return (
//       <nav>
//         <div>
//           <NavLink to='/' exact={true} activeClassName='active' className='home'>
//             <div className="feather_icon">
//               Mr.Hood <i class="fas fa-feather"></i>
//             </div>
//           </NavLink>
//         </div>
//         {/* <div>
//           <NavLink to='/login' exact={true} activeClassName='active' className='login'>
//             Login
//           </NavLink>
//         </div> */}
//         {/* <div>
//           <NavLink to='/users' exact={true} activeClassName='active'>
//           Users
//           </NavLink>
//         </div> */}
//         <div>
//           <LogoutButton />
//         </div>
//         <div>
//           <NavLink to='/sign-up' exact={true} activeClassName='active' className='signup'>
//             Sign Up
//           </NavLink>
//         </div>
//       </nav>
//     )
//   }
// }

// export default NavBar;

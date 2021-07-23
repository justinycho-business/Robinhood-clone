import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useDispatch, useSelector } from 'react-redux'
import { getDashboardData } from '../store/dashboard';
import './styles/NavBar.css';

const NavBar = () => {
    const [search, setSearch] = useState('')
    // const [searchData, setSearchData] = useState([])
    const user = useSelector(state => state.session.user)
    const removeSignUpFromNavBar = useSelector(state => state.session.user)
    // const dispatch = useDispatch()
    const history = useHistory()
    // const id = useParams()

  // useEffect(() => {
  //     (async() => {
  //         const response = await fetch(`/api/search/info/${id.ticker}`)
  //         const responseData = await response.json()
  //         setSearch(responseData);
  //         dispatch(getDashboardData(ticker.id))
  //     })()
  // }, [user, id, dispatch]);
  let companyTickerData;

  useEffect(() => {
      (async() => {
          const response = await fetch(`/api/search/all`)
          const responseData = await response.json()
          companyTickerData = responseData.tickers
          // setSearchData(responseData.tickers)
          // console.log(searchData)
          console.log(companyTickerData)
      })()
  }, []);

  //after we find the ticker, user selects it and gets redirected to stocks page
  const searchResult = async(e) => {
      e.preventDefault()
      const data = e.target.value
      history.push(`/stocks/${data}`)
  }

  if (removeSignUpFromNavBar) {
    return (
      <nav>
        <div>
          <NavLink to='/' exact={true} activeClassName='active' className='home'>
            <div className="feather_icon">
              <i className="fas fa-feather"></i>
            </div>
          </NavLink>
        </div>
        <div className = "welcome_message_container">
          <div className="welcome_message_inner_container">
            <div className = "welcome_message">Welcome {user.username}</div>
          </div>
        </div>
        {companyTickerData &&
        <div className="search_outer_container">
          <div className = "search_inner_container">
            <input placeholder="Search" className="search" type="text" value={search} onChange={(e) => setSearch(e.target.value)}></input>
              <div>
                <div>
                  <ul>
                    {
                      //filter method on the data grabbed from our useEffect
                      companyTickerData.filter((e) => e.ticker.startsWith(search)).forEach(ticker => {
                        <li onClick={(e) => searchResult(e.ticker)} value={ticker}>
                            {ticker}
                        </li>
                      })
                    }
                  </ul>
                </div>
              </div>
          </div>
        </div>
        }
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

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Dashboard.css';

function Dashboard() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const [portfolioValue, setPortolioValue] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        // return dispatch(addFunds({portfolioValue}))
    }

    return (
        <div class='wrapper'>
            <div className='portfolioDiv'>
                <h1>Dashboard</h1>
                <h1>Add Total Portfolio Value Monday {user.username}</h1>
                <h3>Add a daily percent change {user.username}</h3>
            </div>
            <div className='graph'>
                <div>Graph Goes Here</div>
                <button>1D</button>
                <button>1W</button>
                <button>1M</button>
                <button>3M</button>
                <button>1Y</button>
                <button>5Y</button>
                <button>All</button>
            </div>
            <div className='addFundsDiv'>
                <h3>Buying Power</h3>
                <h3>Add the available cash Monday {user.username}</h3>
                <label>Add Funds</label>
                <input
                    type="portfolioValue"
                    value={portfolioValue}
                    onChange={(e) => setPortolioValue(e.target.value)}
                    required
                />
                <button type="submit">Submit Funds</button>
            </div>
            <div className='watchlistDiv'>
                <h1>Watchlist</h1>
                <ul className='watchlistUl'>
                    <li className='watchlistLi'>
                        <p className='ticker'>AAPL</p>
                        <p className='shares'>70 Shares</p>
                        <p className='lilGraph'>Small Graph</p>
                        <p className='price'>Price</p>
                        <p className='percent'>Percent Change</p>
                    </li>
                    <li className='watchlistLi'>
                        <p className='ticker'>BA</p>
                        <p className='shares'>70 Shares</p>
                        <p className='lilGraph'>Small Graph</p>
                        <p className='price'>$438.34</p>
                        <p className='percent'>-4.11%</p>
                    </li>
                    <li className='watchlistLi'>
                        <p className='ticker'>TSLA</p>
                        <p className='shares'>70 Shares</p>
                        <p className='lilGraph'>Small Graph</p>
                        <p className='price'>$652.09</p>
                        <p className='percent'>2.38%</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addFundsToPortfolio } from '../store/dashboard';

import { LineChart, Line, Area, Tooltip, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import './styles/Dashboard.css'



function Dashboard() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const [portfolioValue, setPortolioValue] = useState("")

    const graphData = [{uv: 75, time: 10}, {uv: 20, time: 15}, {uv: 45, time: 15}, {uv: 15, time: 25}, {uv: 35, time: 25}]
    const renderLineChart = (
        <ResponsiveContainer width="100%" aspect={2}>
        <LineChart data={graphData}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
        </LineChart>
        </ResponsiveContainer>
    )

    // function to check if user is logged in then returns the user ID
    const loggedInUser = useSelector((state) => {
        if(!state.session.user) return null;
        return state.session.user.id
    });

    // function to handle the addFunds on click form
    const handleSubmit = (event) => {
        event.preventDefault();

        const payload = {
            userId: loggedInUser,
            portfolioValue
        }
        return dispatch(addFundsToPortfolio(payload))
    }


    useEffect(() => {
    }, [dispatch])


    return (
        <div class='wrapper'>
            <div className='portfolioDiv'>
                <h1>Dashboard</h1>
                <h1>Add Total Portfolio Value Monday {user.username}</h1>
                <h3>Add a daily percent change {user.username}</h3>
            </div>
            <div className='graph'>
                <div>renderLineChart
                <ResponsiveContainer width="100%" aspect={2}>
                <LineChart data={graphData}>
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                </LineChart>
                </ResponsiveContainer>
                </div>
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
                <form action='/api/dashboard/addFunds' method="post">
                    <input
                        type="text"
                        placeholder="Amount of funds to add"
                        name='portfolioValue'
                        value={portfolioValue}
                        onChange={(e) => setPortolioValue(e.target.value)}
                        required
                    />
                    <button type="submit" onClick={() => handleSubmit}>Submit Funds</button>
                </form>
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

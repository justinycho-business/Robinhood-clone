import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


function Dashboard() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const [portfolioValue, setPortolioValue] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        // return dispatch(addFunds({portfolioValue}))
    }

    return (
        <div>
            <div>
                <h1>Dashboard</h1>
            </div>
            <div>
                <h1>Add Total Portfolio Value Monday {user.username}</h1>
                <h3>Add a daily percent change {user.username}</h3>
                <h1>Graph goes here</h1>
            </div>
            <div>
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
            <div>
                <h1>Watchlist</h1>
            </div>
        </div>
    )
}

export default Dashboard;

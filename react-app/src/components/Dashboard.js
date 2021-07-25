import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {addFundsToPortfolio, getDashboardData, graphTimePeriodButton} from "../store/dashboard";
import moment from "moment";
import intradayData from "../data/data";
import {
    LineChart,
    Line,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts";

import "./styles/Dashboard.css";

function Dashboard() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const userData = useSelector((state) => state?.dashboard?.userData);
    const lilGraphs = useSelector((state) => state?.dashboard?.userData?.watchlistAPICallData);

    const [portfolioValue, setPortolioValue] = useState("");

    // function to check if user is logged in then returns the user ID
    const loggedInUser = useSelector((state) => {
        if (!state.session.user) return null;
        return state.session.user.id;
    });

    // function to handle the addFunds on click form
    const addFundsSubmit = (event) => {
        event.preventDefault();
        const payload = {
            userId: user.id,
            'amount': portfolioValue,
        };
        return dispatch(addFundsToPortfolio(payload));
    };

    useEffect(() => {
        dispatch(getDashboardData(user?.id));
    }, []);


    const timePeriodButton = (payload_obj) => {
        dispatch(graphTimePeriodButton(payload_obj))
    }

    const min = (data) => {
        let min = Infinity;
        for (let i = 0; i < data.length; i++) {
        let lowData = data[i].low;
        if (lowData < min) {
            min = lowData;
        }
        }
        console.log(min, '===========max==============')
        return parseFloat((min * 0.995).toFixed(2));
    };

    const max = (data) => {
        const flatten = [...data]
        console.log(flatten, '=============max data=========================')
        let max = 0;
        for (let i = 0; i < data.length; i++) {
        let highData = data[i].high;
        if (highData > max) {
            max = highData;
        }
        }
        console.log(max, '===========max==============')
        return parseFloat((max * 1.005).toFixed(2));
    };

    const watchlistGraphDataTrimmed = (graphObj) => {
        const result = []
        const watchlistTicker = userData.watchlist
        watchlistTicker.forEach((ele) => {
            const graphData = graphObj[ele.ticker]
            for (let i = 0; i < graphData.length; i++) {
                console.log(graphData[i], '======================graphData[i]============================')
                if (graphData[i].date.startsWith(`${moment().format('YYYY-MM-DD')}`)) {
                    result.push(graphData[i])
                }
            }
        })
        console.log(result.reverse())
        return result.reverse()
    }

    if (!userData) {
        return (<>
            <div class="loader">
                <div class="inner one"></div>
                <div class="inner two"></div>
                <div class="inner three"></div>

            </div>
            </>
            // credit to: " https://codepen.io/martinvd "
        );
    }

    return (
        <>
        {userData && (
            <div class="wrapper">
            <div className="portfolioDiv">
                <h1>Dashboard</h1>
                <h1>Add Total Portfolio Value Monday {user.username}</h1>
                <h3>Add a daily percent change {user.username}</h3>
            </div>
            <div className="graph">
                <div>
                <ResponsiveContainer width="100%" aspect={2}>
                    <LineChart data={intradayData}>
                    <Line
                        dataKey="close"
                        stroke="#6afa27"
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                    />
                    <XAxis hide={true} dataKey="date" />
                    <YAxis
                        hide={true}
                        domain={[min(intradayData), max(intradayData)]}
                    />
                    <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
                </div>
                <button onClick={() => timePeriodButton({'string': 'oneDay', 'id': user.id})}>1D</button>
                <button onClick={() => timePeriodButton({'string': 'oneWeek', 'id': user.id})}>1W</button>
                <button onClick={() => timePeriodButton({'string': 'oneMonth', 'id': user.id})}>1M</button>
                <button onClick={() => timePeriodButton({'string': 'threeMonths', 'id': user.id})}>3M</button>
                <button onClick={() => timePeriodButton({'string': 'oneYear', 'id': user.id})}>1Y</button>
                <button onClick={() => timePeriodButton({'string': 'fiveYears', 'id': user.id})}>5Y</button>
                <button onClick={() => timePeriodButton({'string': 'all', 'id': user.id})}>All</button>
            </div>
            <div className="addFundsDiv">
                <h3>Buying Power</h3>
                <h3>Add the available cash Monday {user.username}</h3>
                <form onSubmit={addFundsSubmit}>
                    <input
                        type="text"
                        placeholder="Amount of funds to add"
                        name="portfolioValue"
                        value={portfolioValue}
                        onChange={(e) => setPortolioValue(e.target.value)}
                        required
                    />
                    <button type="submit">
                        Submit Funds
                    </button>
                </form>
            </div>
            <div className='porfolioListDiv'>
                <h1>Portfolio</h1>
                <ul className='portfolioUl'>
                    {userData &&
                        userData?.portfolio.map((companyArray) => {
                        <li className='porfolioLi'>
                            <div className='ticker'>{companyArray.company_details.ticker}</div>
                            <div className='shares'>{companyArray.company_details.quantity}</div>
                            <div className='lilGraph'>
                                <ResponsiveContainer width="100%" aspect={2}>
                                    <LineChart data={intradayData}>
                                        <Line dataKey="close" stroke="#6afa27"
                                            strokeWidth={2} dot={false} isAnimationActive={false}/>
                                    <XAxis hide={true} dataKey="date" />
                                    <YAxis hide={true} domain={[min(intradayData), max(intradayData)]}/>
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <div className='price'>Price</div>
                            <div className='percent'>Percent Change</div>
                        </li>
                    })}
                </ul>
            </div>
            <div className="watchlistDiv">
                <h1>Watchlist</h1>
                <ul className="watchlistUl">
                    {userData &&
                        userData?.watchlistAPICallData.map((company) => (
                        <li className="watchlistLi" key={company[0].ticker}>
                            <div className="ticker">
                                <p>{company[0].symbol}</p>
                            </div>
                            <div className="lilGraph">
                                <ResponsiveContainer width="100%" aspect={2}>
                                    <LineChart data={watchlistGraphDataTrimmed(userData.watchlistOneDayData)}>
                                    <Line
                                        dataKey="close"
                                        stroke="#6afa27"
                                        strokeWidth={2}
                                        dot={false}
                                        isAnimationActive={false}
                                    />
                                    <XAxis hide={true} dataKey="date" />
                                    <YAxis
                                        hide={true}
                                        domain={[min(watchlistGraphDataTrimmed(userData.watchlistOneDayData)), max(watchlistGraphDataTrimmed(userData.watchlistOneDayData))]}
                                    />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="price">
                                <p>${company[0].price}</p>
                            </div>
                            {/* <p className='percent'>{company.ticker}</p> */}
                        </li>
                        ))}
                    </ul>
                </div>
                </div>
            )}
        </>
    );
}

export default Dashboard;

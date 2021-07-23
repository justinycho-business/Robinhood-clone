import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {addFundsToPortfolio, getDashboardData, getlilgraphs, graphTimePeriodButton} from "../store/dashboard";
import { get1dayData } from "../store/stocks";
import moment from "moment";
import intradayData from "../data/data";
import {
    LineChart,
    Line,
    Area,
    Tooltip,
    CartesianGrid,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts";

import "./styles/Dashboard.css";

function Dashboard() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    let watchlist = useSelector((state) => state?.dashboard?.userData);
    let userData = useSelector((state) => state?.dashboard?.userData);
    const watchlistData = useSelector((state) => state?.dashboard?.userData);
    const lilgraphs = useSelector((state) => state?.dashboard?.lilgraphs);

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

    useEffect(() => {
        const get_watchlist_graphs1 = () => {
        let result = [];
        console.log(watchlist);
        for (let i = 0; i < watchlist[0]?.watchlist.length; i++) {
            result.push(watchlist?.watchlist[i].ticker);
        }
        return result;
        };
        if(watchlist){
        dispatch(getlilgraphs(get_watchlist_graphs1()));
        }
    }, [getDashboardData]);


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
        return parseFloat((min * 0.995).toFixed(2));
    };
    const max = (data) => {
        let max = 0;
        for (let i = 0; i < data.length; i++) {
        let highData = data[i].high;
        if (highData > max) {
            max = highData;
        }
        }
        return parseFloat((max * 1.005).toFixed(2));
    };

    if (!watchlist) {
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
        {watchlist && (
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
                    {watchlistData &&
                        watchlistData?.watchlistAPICallData.map((company) => (
                        <li className="watchlistLi" key={company.id}>
                            <div className="ticker">
                            <p>{company[0].symbol}</p>
                            </div>
                            <div className="lilGraph">
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

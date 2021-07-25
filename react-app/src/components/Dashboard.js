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

    let watchlist = useSelector((state) => state?.dashboard?.userData);
    let userData = useSelector((state) => state?.dashboard?.userData);
    const watchlistData = useSelector((state) => state?.dashboard?.userData);
    const lilgraphs = useSelector((state) => state?.dashboard?.lilgraphs);
    const watchlistcharts = useSelector((state) => state?.dashboard?.userData?.watchlistOneDayData);


    const [portfolioValue, setPortolioValue] = useState("");
    const [watchlistchartinfo, setwatchlistchartinfo] = useState(undefined)

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


    const oneDayGraphDataTrimmed = (data) => {
        const result = []
        // console.log(`${moment().format('YYYY-MM-DD')}`) //2021-07-22
        for (let i = 0; i < data.length; i++) {
            if (data[i].date.startsWith(`${moment().format('YYYY-MM-DD')}`)) {
                result.push(data[i])
            }
        }
        //saturday
        if (result.length === 0) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].date.startsWith(`${moment().subtract(1, 'days').format('YYYY-MM-DD')}`)) {
                    result.push(data[i])
                }
            }
        }
        // sunday
        if (result.length === 0) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].date.startsWith(`${moment().subtract(2, 'days').format('YYYY-MM-DD')}`)) {
                    result.push(data[i])
                }
            }
        }

        //just in case
        if (result.length === 0) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].date.startsWith(`${moment().subtract(3, 'days').format('YYYY-MM-DD')}`)) {
                    result.push(data[i])
                }
            }
        }

        return result.reverse()
    }

    const oneWeekGraphDataTrimmed = (data) => {
        console.log(`${moment().subtract(10, 'days').calendar()}`)

        let result;
        for (let i = 0; i < data.length; i++) {
            if (data[i].date === `${moment().subtract(7, 'days').format('YYYY-MM-DD')} 10:00:00` ||
                data[i].date === `${moment().subtract(8, 'days').format('YYYY-MM-DD')} 10:00:00` ||
                data[i].date === `${moment().subtract(9, 'days').format('YYYY-MM-DD')} 10:00:00` ||
                data[i].date === `${moment().subtract(10, 'days').format('YYYY-MM-DD')} 10:00:00`) {
                result = data.slice(0, i)
            }
        }
        return result.reverse()
    }


    const min = (data) => {
        let min = Infinity;
        for (let i = 0; i < data.length; i++) {
        let lowData = data[i].low;
        if (lowData < min) {
            min = lowData;
        }
        }

        return parseFloat((min * 1).toFixed(2));

    };

    const max = (data) => {
        const flatten = [...data]

        let max = 0;
        for (let i = 0; i < data.length; i++) {
        let highData = data[i].high;
        if (highData > max) {
            max = highData;
        }
        }

        return parseFloat((max * 1.00).toFixed(2));

    };



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
                <h1>{user.username} Dashboard</h1>
                {/* <h1>Add Total Portfolio Value Monday {user.username}</h1> */}
                {/* <h3>Add a daily percent change {user.username}</h3> */}
            </div>
            <div className="graph">
                <div>
                    <ResponsiveContainer width="100%" aspect={2}>
                        <LineChart data={intradayData}>
                        <Line
                            dataKey="close"
                            stroke="#6afa27"
                            strokeWidth={3}
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
                <button className='dashboard-button' onClick={() => timePeriodButton({'string': 'oneDay', 'id': user.id})}>1D</button>
                <button className='dashboard-button' onClick={() => timePeriodButton({'string': 'oneWeek', 'id': user.id})}>1W</button>
                <button className='dashboard-button' onClick={() => timePeriodButton({'string': 'oneMonth', 'id': user.id})}>1M</button>
                <button className='dashboard-button' onClick={() => timePeriodButton({'string': 'threeMonths', 'id': user.id})}>3M</button>
                <button className='dashboard-button' onClick={() => timePeriodButton({'string': 'oneYear', 'id': user.id})}>1Y</button>
                <button className='dashboard-button' onClick={() => timePeriodButton({'string': 'fiveYears', 'id': user.id})}>5Y</button>
                <button className='dashboard-button' onClick={() => timePeriodButton({'string': 'all', 'id': user.id})}>All</button>
            </div>
            <div className="addFundsDiv">
                <h3>{`$${user.buying_power} Available for investment`}</h3>
                <p>Add funds to your account</p>
                <form onSubmit={addFundsSubmit}>
                    <input className='form-input'
                        type="text"
                        placeholder="Amount of funds to add"
                        name="portfolioValue"
                        value={portfolioValue}
                        onChange={(e) => setPortolioValue(e.target.value)}
                        required
                    />
                    <button className='dashboard-button' type="submit">
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
                                    <LineChart data={watchlistcharts[`${companyArray.company_details.ticker}`]}>
                                        <Line dataKey="close" stroke="#6afa27"
                                            strokeWidth={2} dot={false} isAnimationActive={false}/>
                                    <XAxis hide={true} dataKey="date" />
                                    <YAxis
                                    hide={true}
                                    // domain={[min(intradayData), max(intradayData)]}
                                    />
                                    <Tooltip />
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
                                <LineChart data={oneWeekGraphDataTrimmed(watchlistcharts[company[0].symbol])}>
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
                                    domain={
                                        [min(oneWeekGraphDataTrimmed(watchlistcharts[company[0].symbol])),
                                        max(oneWeekGraphDataTrimmed(watchlistcharts[company[0].symbol]))]}
                                />
                                <Tooltip/>
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

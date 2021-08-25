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
    const portfolio_comps = useSelector((state) => state?.dashboard?.userData?.portfolio);
    const [portfolioValue, setPortolioValue] = useState("");
    const [watchlistchartinfo, setwatchlistchartinfo] = useState(undefined)

    // function to check if user is logged in then returns the user ID
    const loggedInUser = useSelector((state) => {
        if (!state.session.user) return null;
        return state.session.user.id;
    });

    //make array for portfolio companies
    const portfolio_to_array = (dict) => {
        let result = []
        for (let key in dict) {
            result.push(dict[key])

        }
        // console.log(result);
        return result
    }

    // coment out below. test function
    const oneWeekGraphDataTrimmedport = (data) => {
        let result;
        for (let i = 0; i < data.length; i++) {
            if (data[i].date === `${moment().subtract(30, 'days').format('YYYY-MM-DD')} 10:00:00` ||
                data[i].date === `${moment().subtract(31, 'days').format('YYYY-MM-DD')} 10:00:00` ||
                data[i].date === `${moment().subtract(32, 'days').format('YYYY-MM-DD')} 10:00:00` ||
                data[i].date === `${moment().subtract(33, 'days').format('YYYY-MM-DD')} 10:00:00`
                ) {
                result = data.slice(0, i+1)
            }
        }
        return result.reverse()
    }

    const portfolio_total_value_over_one_week = (dict) => {
        const array_of_stocks_owned = portfolio_to_array(dict)
        // console.log(array_of_stocks_owned);
        let sumofport = []
        let result = []
        for (let dict = 0; dict < array_of_stocks_owned.length; dict++) {
            const array_weekdata = oneWeekGraphDataTrimmedport(array_of_stocks_owned[dict].weekdata)
            let copy_array = [...array_weekdata]
            result.push(copy_array)}

        for (let x = 0; x < result[0].length; x++) {
            let datapoint = {"date" : 0, 'close': 0};
            datapoint['date'] = result[0][x].date;
            sumofport.push(datapoint)
        }

        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result[i].length; j++) {
                let adding_number = result[i][j].close
                    sumofport[j].close += (adding_number * array_of_stocks_owned[i].quantity);
            }
        }


        return sumofport
    }

    const add_buyingpower = (array) => {
        let buying_power = user.buying_power;
        for (let i = 0; i < array.length; i++) {
            array[i].close = (array[i].close+buying_power).toFixed(2)
        }
        return array
    }

    // if (portfolio_comps) {
    //     let test = add_buyingpower(portfolio_total_value_over_one_week(portfolio_comps))
    //     console.log(test);

    // }


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
        let max = 0;
        for (let i = 0; i < data.length; i++) {
            let highData = data[i].high;
            if (highData > max) {
                max = highData;
            }
        }
        return parseFloat((max * 1.00).toFixed(2));
    };

    const portmin = (data) => {
        let min = Infinity;
        for (let i = 0; i < data.length; i++) {
            let lowData = data[i].close;
            if (lowData < min) {
                min = lowData;
            }
        }
        return parseFloat((min * .995).toFixed(2));
    };

    const portmax = (data) => {
        let max = 0;
        for (let i = 0; i < data.length; i++) {
            let highData = data[i].close;
            if (highData > max) {
                max = highData;
            }
        }
        return parseFloat((max * 1.005).toFixed(2));
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
    const shoot = () => {
        window.location.reload(true);
    }

    const value = parseFloat(add_buyingpower(portfolio_total_value_over_one_week(portfolio_comps))[add_buyingpower(portfolio_total_value_over_one_week(portfolio_comps)).length -1].close)

    return (
        <>
        {userData && (
            <div class="wrapper">
                <div className="portfolioDiv">
                    <h1>{user.username}'s Current Portfolio Value
                    {portfolio_to_array(portfolio_comps).length >= 1 && <span> ${value.toLocaleString('en-US', {maximumFractionDigits:2})}</span>}
                    {!(portfolio_to_array(portfolio_comps).length >= 1) && <span> $0</span>}


                    </h1>

                    {/* <h1>Add Total Portfolio Value Monday {user.username}</h1> */}
                    {/* <h3>Add a daily percent change {user.username}</h3> */}
                </div>
                <div className="graph">
                    <div>
                    {!portfolio_to_array(portfolio_comps).length >= 1 && <div className="warning">Please add funds with the below form and purchase stocks to view your portfolio chart</div>}
                    {portfolio_to_array(portfolio_comps).length >= 1 && <ResponsiveContainer width="100%" aspect={2}>
                            <LineChart data={add_buyingpower(portfolio_total_value_over_one_week(portfolio_comps))}>
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
                                domain={[portmin(add_buyingpower(portfolio_total_value_over_one_week(portfolio_comps))),
                                    portmax(add_buyingpower(portfolio_total_value_over_one_week(portfolio_comps)))]}
                            />
                            <Tooltip />
                            </LineChart>
                        </ResponsiveContainer>}
                    </div>
                    {/* <button className='dashboard-button' onClick={() => timePeriodButton({'string': 'oneDay', 'id': user.id})}>1D</button>
                    <button className='dashboard-button' onClick={() => timePeriodButton({'string': 'oneWeek', 'id': user.id})}>1W</button> */}
                    <button className='dashboard-button' onClick={() => timePeriodButton({'string': 'oneMonth', 'id': user.id})}>1M</button>
                    {/* <button className='dashboard-button' onClick={() => timePeriodButton({'string': 'threeMonths', 'id': user.id})}>3M</button>
                    <button className='dashboard-button' onClick={() => timePeriodButton({'string': 'oneYear', 'id': user.id})}>1Y</button>
                    <button className='dashboard-button' onClick={() => timePeriodButton({'string': 'fiveYears', 'id': user.id})}>5Y</button>
                    <button className='dashboard-button' onClick={() => timePeriodButton({'string': 'all', 'id': user.id})}>All</button> */}
                </div>
                <div className="addFundsDiv">
                    <h3 className = 'available-funds-h3'>{`$${user.buying_power.toLocaleString('en-US', {maximumFractionDigits:2})} Available for investment`}</h3>
                    <p className='add-funds-pTag'>Add funds to your account</p>
                    <form className ='add-funds-form' onSubmit={addFundsSubmit}>
                        <input className='form-input'
                            type="text"
                            placeholder="Amount to add in dollars. (This field takes in an integer)"
                            name="portfolioValue"
                            value={portfolioValue}
                            onChange={(e) => setPortolioValue(e.target.value)}
                            required
                        />
                        <button onClick={shoot} className='dashboard-button' type="submit">
                            Submit Funds
                        </button>
                    </form>
                </div>
                <div className= 'sidebar-div'>
                    <div className='porfolioListDiv'>
                        <h1>Portfolio</h1>
                        <ul className='porfolioUl'>
                            {userData && portfolio_comps &&
                                portfolio_to_array(portfolio_comps).map((companyArray) => (
                                <li key={companyArray.id} className='porfolioLi'>
                                    <div className='ticker'><a className="linkstostocks" href={`/stocks/${companyArray.ticker}`}>{companyArray.ticker}</a></div>
                                    <div className='lilGraph'>
                                        <ResponsiveContainer width="100%" aspect={2}>
                                            <LineChart data={oneWeekGraphDataTrimmed(companyArray.weekdata)}>
                                                <Line dataKey="close" stroke="#6afa27"
                                                    strokeWidth={2} dot={false} isAnimationActive={false}/>
                                            <XAxis hide={true} dataKey="date" />
                                            <YAxis
                                            hide={true}
                                            domain={[min(oneWeekGraphDataTrimmed(companyArray.weekdata)), max(oneWeekGraphDataTrimmed(companyArray.weekdata))]}
                                            />
                                            <Tooltip />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className ='port-div'>
                                        <p className='shares'>{`shares: ${companyArray.quantity}`}</p>
                                        <p className='price'>Current Price ${companyArray.weekdata[0].close.toFixed(2)}</p>
                                        {/* <div className='percent'>Percent Change</div> */}
                                    </div>
                                </li>
                                ))}
                        </ul>
                    </div>
                    <div className="watchlistDiv">
                        <h1>Watchlist</h1>
                        <ul className="watchlistUl">
                            {userData &&
                                userData?.watchlistAPICallData.map((company) => (
                                <li className="watchlistLi" key={company[0].ticker}>
                                    <div className="ticker">
                                        <a className="linkstostocks" href={`/stocks/${company[0].symbol}`}>{company[0].symbol}</a>
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
                </div>
            )}
        </>
    );
}

export default Dashboard;

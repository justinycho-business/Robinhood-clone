import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { get1dayData, graphTimePeriodButton, sellSharesButton } from '../store/stocks';
import { getDashboardData } from '../store/dashboard'
import ticks from "../data/1dayticks"
import './styles/Stocks.css';

// console.log(ticks);
// console.log(new Date());
// console.log(new Date(`${moment().format('YYYY-MM-DD')} 09:30:00`).getTime() / 1000)
// console.log(new Date("2021-07-22 13:50:00").getTime() / 1000);
// console.log((new Date('2021-07-13 09:30:00').getTime() / 1000) - 25200)// 9 30 =  1626168600
// console.log((new Date('2021-07-13 16:00:00').getTime() / 1000) - 25200) // needs to equal 1626969600
// console.log(moment().format('YYYY-MM-DD'))
// console.log(typeof(moment().format('YYYY-MM-DD')));


const Stocks = () => {
    const dispatch = useDispatch()
    const urlTicker = useParams().ticker

    const urlString = window.location.href;

    const getTicker = (string) => {
        for (let i = string.length; i >= 0; i--) {
            const slash = '/'
            if (string[i] === slash) {
                return string.substring(i + 1)
            }
        }
    }

    const [graphstate, setgraphstate] = useState("1D")
    const [stockdata, setstockdata] = useState(null);
    const [totalStocks, setTotalStocks] = useState(1);
    const [sellShares, setSellShares] = useState(1);
    const [ticker, setTicker] = useState(getTicker(urlString))
    const [userId, setUserId] = useState(null)
    const [option, setOption] = useState('add')
    const [buySell, setBuySell] = useState('buy')
    const [watchlistContainer, setContainer] = useState('')
    const [optionText, setOptionText] = useState('')

    const [buyingPower, setBuyingPower] = useState(0)
    
    const watchlist = useSelector(state => state?.dashboard)
    const priceData = useSelector(state => state?.priceData?.oneDayDataStocks)
    const user = useSelector(state => state.session.user);
    const oneDayGraphData = useSelector(state => state?.priceData?.oneDayDataStocks)
    const companyInfo = useSelector(state => state?.dashboard?.userData)
    const id = useParams();
    let watchlistButton;
    const timePeriodGraphData = useSelector(state => state?.priceData?.timePeriodData)

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

    // console.log(`${moment().subtract(10, 'days').format('YYYY-MM-DD')}`)

    const oneWeekGraphDataTrimmed = (data) => {
        console.log(`${moment().subtract(10, 'days').calendar()}`)
        console.log(data);
        let result;
        for (let i = 0; i < data.length; i++) {
            if (data[i].date === `${moment().subtract(7, 'days').format('YYYY-MM-DD')} 10:00:00` ||
                data[i].date === `${moment().subtract(8, 'days').format('YYYY-MM-DD')} 10:00:00` ||
                data[i].date === `${moment().subtract(9, 'days').format('YYYY-MM-DD')} 10:00:00` ||
                data[i].date === `${moment().subtract(10, 'days').format('YYYY-MM-DD')} 10:00:00`) {
                result = data.slice(0, i)
            }
        }
        return result
    }

    const oneMonthGraphDataTrimmed = (data) => {
        // console.log(`${moment().subtract(30, 'days').calendar()}`)
        let result;
        for (let i = 0; i < data.length; i++) {
            if (data[i].date === `${moment().subtract(30, 'days').format('YYYY-MM-DD')}` ||
                data[i].date === `${moment().subtract(31, 'days').format('YYYY-MM-DD')}` ||
                data[i].date === `${moment().subtract(32, 'days').format('YYYY-MM-DD')}` ||
                data[i].date === `${moment().subtract(33, 'days').format('YYYY-MM-DD')}`) {
                result = data.slice(0, i)
            }
        }
        return result
    }

    const threeMonthGraphDataTrimmed = (data) => {
        // console.log(`${moment().subtract(30, 'days').calendar()}`)
        let result;
        for (let i = 0; i < data.length; i++) {
            if (data[i].date === `${moment().subtract(90, 'days').format('YYYY-MM-DD')}` ||
                data[i].date === `${moment().subtract(91, 'days').format('YYYY-MM-DD')}` ||
                data[i].date === `${moment().subtract(92, 'days').format('YYYY-MM-DD')}` ||
                data[i].date === `${moment().subtract(93, 'days').format('YYYY-MM-DD')}`) {
                result = data.slice(0, i)
            }
        }
        return result
    }

    const oneYearGraphDataTrimmed = (data) => {
        // console.log(`${moment().subtract(30, 'days').calendar()}`)
        let result;
        for (let i = 0; i < data.length; i++) {
            if (data[i].date === `${moment().subtract(365, 'days').format('YYYY-MM-DD')}` ||
                data[i].date === `${moment().subtract(366, 'days').format('YYYY-MM-DD')}` ||
                data[i].date === `${moment().subtract(367, 'days').format('YYYY-MM-DD')}` ||
                data[i].date === `${moment().subtract(368, 'days').format('YYYY-MM-DD')}`) {
                result = data.slice(0, i)
            }
        }
        return result
    }

    const fiveYearGraphDataTrimmed = (data) => {
        // console.log(`${moment().subtract(30, 'days').calendar()}`)
        let result;
        for (let i = 0; i < data.length; i++) {
            if (data[i].date === `${moment().subtract(1822, 'days').format('YYYY-MM-DD')}` ||
                data[i].date === `${moment().subtract(1823, 'days').format('YYYY-MM-DD')}` ||
                data[i].date === `${moment().subtract(1824, 'days').format('YYYY-MM-DD')}` ||
                data[i].date === `${moment().subtract(1825, 'days').format('YYYY-MM-DD')}`) {
                result = data.slice(0, i)
            }
        }
        return result
    }

    const addToWatchlist = async (e) => {
        e.preventDefault()
        const response = await fetch(`/api/stocks/watchlist/${id.ticker}`);
        const responseData = await response.json();
        const company_id = responseData.Company_Info.id
        const user_id = user.id
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ option, company_id, user_id, ticker, })
        };
        const post = await fetch('/api/stocks/watchlist/options', requestOptions);
        const data = await post.json();
        setOption("remove")
        setOptionText("Remove from Watchlist")
    };

    const removeFromWatchlist = async (e) => {
        e.preventDefault()
        const response = await fetch(`/api/stocks/watchlist/${id.ticker}`);
        const responseData = await response.json();
        const company_id = responseData.Company_Info.id
        const user_id = user.id
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ option, company_id, user_id, ticker, })
        };
        const post = await fetch('/api/stocks/watchlist/options', requestOptions);
        const data = await post.json();
        setOption("add")
        setOptionText("Add to Watchlist")
    };

    useEffect(() => {
        (async function fetchData() {
            const response = await fetch(`/api/stocks/info/${id.ticker}`);
            const responseData = await response.json();
            setstockdata(responseData);
            setUserId(user.id)
            setBuyingPower(user.buying_power)
            dispatch(getDashboardData(user.id))
            dispatch(get1dayData(ticker))
        })()

    }, [setBuyingPower]);



    useEffect(() => {
        (async function fetchData() {
            const res = await fetch(`/api/stocks/watchlist/setter/${ticker}/${user.id}`);
            const data = await res.json();
            if (data.option === "Add to Watchlist") {
                setOption("add")
                setContainer('add-to')
                setOptionText("Add to Watchlist")
            } else if (data.option === "Remove from Watchlist") {
                setOption("remove")
                setContainer('remove-from')
                setOptionText("Remove from Watchlist")
            }
            dispatch(get1dayData(ticker))
            console.log("line 203==================================");
        })();
    }, []);

    const timePeriodButton = (payload_obj) => {
        dispatch(graphTimePeriodButton(payload_obj))
    }


    const sellButtonFunc = (event) => {
        event.preventDefault()
        dispatch(sellSharesButton({ 'shares': sellShares, 'id': user.id, 'ticker': urlTicker }))
    }

    const min = (data) => {
        let min = Infinity;
        for (let i = 0; i < data.length; i++) {
            let lowData = data[i].low
            if (lowData < min) {
                min = lowData;
            };
        }
        return parseFloat((min * 0.995).toFixed(2));
    };

    const max = (data) => {
        let max = 0;
        for (let i = 0; i < data.length; i++) {
            let highData = data[i].high;
            if (highData > max) {
                max = highData;
            };
        };
        return parseFloat((max * 1.005).toFixed(2));
    };

    const formatXAxis = (tickItem) => {
        const milli = tickItem * 1000;
        return new Date(milli).toString();
    };


    if (!oneDayGraphData  || !companyInfo) {
        return (<>
            <div class="loader">
                <div class="inner one"></div>
                <div class="inner two"></div>
                <div class="inner three"></div>
            </div>
            {/* // credit to: " https://codepen.io/martinvd " */}
        </>
        )
    }


    const findCompanyShare = (array) => {
        let sellButtonArray = []
        const shares = array.forEach((porfolioArray) => {
            if (porfolioArray.company_details.ticker === urlTicker) {
                console.log(porfolioArray.company_details.quantity, '============259==============')
                const result = porfolioArray.company_details.quantity
                sellButtonArray.push(`${result} Shares Owened`)
            } else {
                console.log(sellButtonArray, 'No true values')
                sellButtonArray.push('No Shares Owened')
            }
        })
        console.log(sellButtonArray, '=========================')
        return sellButtonArray
    };

    const buyStock = async (e) => {
        e.preventDefault();
        if (user?.buying_power > totalStocks * stockdata?.latestPrice.toFixed(2)) {
            const user_id = user.id
            const response = await fetch(`/api/stocks/watchlist/${id.ticker}`);
            const responseData = await response.json();
            const company_id = responseData.Company_Info.id
            const stocks = totalStocks
            const stock_price = stockdata?.latestPrice
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ buySell, company_id, user_id, ticker, stocks, stock_price })
            };
            const post = await fetch('/api/stocks/buy', requestOptions);
            const data = await post.json();
            console.log("yay enough buying power", data.Success.toFixed(2))
            setBuyingPower(data.Success.toFixed(2))
            return ["yay enough buying power", data]
        } else {
            console.log("Oh no not working just yet :(")
            return "Oh no not working just yet :("
        }
    }


    return (
        <div className='stocks-background'>
            <div className='stocks-info-container'>
                <div className='stock-details'>
                    <h2 className='stock-title'>{stockdata?.companyName}</h2>
                    <h2 className='stock-price'>${(stockdata?.latestPrice.toFixed(2))}</h2>
                    {/* make dollar change and percent change the value of state and set state on button push for time period */}
                    <h2 className='stock-change'> $ {(stockdata?.change.toFixed(2))} ({(stockdata?.changePercent.toFixed(2))}%) Change Today</h2>
                </div>
                <div className='side-bar-content'>
                    {buySell === "buy" ? (
                        <div className='actions-container'>
                            <form className='buy-form'>
                                <select onClick={(e) => setBuySell(e.target.value)}>
                                    <option value={"buy"} > Buy {stockdata?.symbol}</option>
                                    <option value={"sell"}  > Sell {stockdata?.symbol}</option>
                                    {/* <label className='form-title'> {buySell} {stockdata?.symbol} :</label> */}
                                </select>
                                <div className='form-shares'>
                                    <label className='form-item'>Shares: </label>
                                    <input className='form-shares-input' placeholder={1}
                                        onChange={(e) => setTotalStocks(e.target.value)}
                                        value={totalStocks}
                                    ></input>
                                </div>
                                <div className='form-market-price'>
                                    <label className='form-item'>Market Price :</label>
                                    <h1 className='market-price'>{(stockdata?.latestPrice.toFixed(2))}</h1>
                                </div>
                                <div className='est-cost-container'>
                                    <label className='form-item'>Estimated Cost:</label>
                                    <h1 className='total-price'>${totalStocks * (stockdata?.latestPrice.toFixed(2))}</h1>
                                </div>
                                <div className='buy-btn-container'>
                                    <button className='buy-btn' onClick={buyStock}>Buy</button>
                                </div>
                            </form>
                            <div className='buying-power-container'>
                                <h2>${buyingPower} buying power available</h2>
                            </div>
                        </div>
                    ) : (
                        <div className='actions-container'>
                            <form className='buy-form' onSubmit={sellButtonFunc}>
                                <select className="stock-options" onClick={(e) => setBuySell(e.target.value)}>
                                    <option value={"buy"} > Buy {stockdata?.symbol}</option>
                                    <option value={"sell"}  > Sell {stockdata?.symbol}</option>
                                </select>
                                <div className='form-shares'>
                                    <label className='form-item'>Shares: </label>
                                    <input className='form-shares-input' placeholder={1}
                                        onChange={(e) => setSellShares(e.target.value)}
                                        value={sellShares}
                                    ></input>
                                </div>
                                <div className='form-market-price'>
                                    <label className='form-item'>Market Price :</label>
                                    <h1 className='market-price'>{(stockdata?.latestPrice.toFixed(2))}</h1>
                                </div>
                                <div className='est-cost-container'>
                                    <label className='form-item'>Estimated Value:</label>
                                    <h1 className='total-price'>${sellShares * (stockdata?.latestPrice.toFixed(2))}</h1>
                                </div>
                                <div className='buy-btn-container'>
                                    <button className='buy-btn'>Sell</button>
                                </div>
                            </form>
                            <div className='buying-power-container'>
                                <h2>{companyInfo && findCompanyShare(companyInfo.portfolio)[0]}</h2>
                            </div>
                            {/* <div className='buying-power-container'>
                                <h2>${buyingPower} buying power available</h2>
                            </div> */}
                        </div>
                    )
                    }
                </div>
                <div className='company-graph'>

                    {/* One day graph */}
                    {oneDayGraphData && oneDayGraphData[0] && oneDayGraphData[0]?.oneDay[0] && graphstate === "1D" &&
                        <div>
                            <ResponsiveContainer width="100%" aspect={2}>
                                <LineChart data={oneDayGraphDataTrimmed(oneDayGraphData[0]?.oneDay[0])}>
                                    <Line dataKey="close" stroke="#6afa27"
                                        strokeWidth={2} dot={false} isAnimationActive={false} />
                                    <XAxis hide={true}
                                        dataKey="date"
                                    // domain={[
                                    //     ((new Date(`${moment().format('YYYY-MM-DD')} 09:30:00`).getTime() / 1000) - 25200),
                                    //      ((new Date(`${moment().format('YYYY-MM-DD')} 16:00:00`).getTime() / 1000) - 25200)]}
                                    // tickFormatter={formatXAxis}
                                    />
                                    <YAxis hide={false} domain={[min(oneDayGraphDataTrimmed(oneDayGraphData[0]?.oneDay[0])),
                                    max(oneDayGraphDataTrimmed(oneDayGraphData[0]?.oneDay[0]))]} />
                                    <Tooltip />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>}
                    {/* one week graph */}
                    {timePeriodGraphData && timePeriodGraphData[0] && timePeriodGraphData[0].oneWeek && graphstate === "1W" &&
                        <div>
                            <ResponsiveContainer width="100%" aspect={2}>
                                <LineChart data={oneWeekGraphDataTrimmed(timePeriodGraphData[0]?.oneWeek).reverse()}>
                                    <Line dataKey="close" stroke="#6afa27"
                                        strokeWidth={2} dot={false} isAnimationActive={false} />
                                    <XAxis hide={true}
                                        dataKey="date"
                                    // domain={[
                                    //     ((new Date(`${moment().format('YYYY-MM-DD')} 09:30:00`).getTime() / 1000) - 25200),
                                    //      ((new Date(`${moment().format('YYYY-MM-DD')} 16:00:00`).getTime() / 1000) - 25200)]}
                                    />
                                    <YAxis hide={false} domain={[min(oneWeekGraphDataTrimmed(timePeriodGraphData[0]?.oneWeek)),
                                    max(oneWeekGraphDataTrimmed(timePeriodGraphData[0]?.oneWeek))]} />
                                    <Tooltip />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>}
                    {/* one month graph */}
                    {timePeriodGraphData && timePeriodGraphData[0] && timePeriodGraphData[0].oneMonth && graphstate === "1M" &&
                        <div>
                            <ResponsiveContainer width="100%" aspect={2}>
                                <LineChart data={oneMonthGraphDataTrimmed(timePeriodGraphData[0]?.oneMonth.historical).reverse()}>
                                    <Line dataKey="close" stroke="#6afa27"
                                        strokeWidth={2} dot={false} isAnimationActive={false} />
                                    <XAxis hide={true}
                                        dataKey="date"
                                    // domain={[
                                    //     ((new Date(`${moment().format('YYYY-MM-DD')} 09:30:00`).getTime() / 1000) - 25200),
                                    //      ((new Date(`${moment().format('YYYY-MM-DD')} 16:00:00`).getTime() / 1000) - 25200)]}
                                    />
                                    <YAxis hide={false} domain={[min(oneMonthGraphDataTrimmed(timePeriodGraphData[0]?.oneMonth.historical)),
                                    max(oneMonthGraphDataTrimmed(timePeriodGraphData[0]?.oneMonth.historical))]} />
                                    <Tooltip />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>}
                    {/* three month graph */}
                    {timePeriodGraphData && timePeriodGraphData[0] && timePeriodGraphData[0].threeMonths && graphstate === "3M" &&
                        <div>
                            <ResponsiveContainer width="100%" aspect={2}>
                                <LineChart data={threeMonthGraphDataTrimmed(timePeriodGraphData[0]?.threeMonths.historical).reverse()}>
                                    <Line dataKey="close" stroke="#6afa27"
                                        strokeWidth={2} dot={false} isAnimationActive={false} />
                                    <XAxis hide={true}
                                        dataKey="date"
                                    // domain={[
                                    //     ((new Date(`${moment().format('YYYY-MM-DD')} 09:30:00`).getTime() / 1000) - 25200),
                                    //      ((new Date(`${moment().format('YYYY-MM-DD')} 16:00:00`).getTime() / 1000) - 25200)]}
                                    />
                                    <YAxis hide={false} domain={[min(threeMonthGraphDataTrimmed(timePeriodGraphData[0]?.threeMonths.historical)),
                                    max(threeMonthGraphDataTrimmed(timePeriodGraphData[0]?.threeMonths.historical))]} />
                                    <Tooltip />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>}
                    {/* oneYearGraphDataTrimmed */}
                    {/* one year graph */}
                    {timePeriodGraphData && timePeriodGraphData[0] && timePeriodGraphData[0].oneYear && graphstate === "1Y" &&
                        <div>
                            <ResponsiveContainer width="100%" aspect={2}>
                                <LineChart data={oneYearGraphDataTrimmed(timePeriodGraphData[0]?.oneYear.historical).reverse()}>
                                    <Line dataKey="close" stroke="#6afa27"
                                        strokeWidth={2} dot={false} isAnimationActive={false} />
                                    <XAxis hide={true}
                                        dataKey="date"
                                    // domain={[
                                    //     ((new Date(`${moment().format('YYYY-MM-DD')} 09:30:00`).getTime() / 1000) - 25200),
                                    //      ((new Date(`${moment().format('YYYY-MM-DD')} 16:00:00`).getTime() / 1000) - 25200)]}
                                    />
                                    <YAxis hide={false} domain={[min(oneYearGraphDataTrimmed(timePeriodGraphData[0]?.oneYear.historical)),
                                    max(oneYearGraphDataTrimmed(timePeriodGraphData[0]?.oneYear.historical))]} />
                                    <Tooltip />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>}
                    {/* fiveYearGraphDataTrimmed */}
                    {/* one year graph */}
                    {timePeriodGraphData && timePeriodGraphData[0] && timePeriodGraphData[0].fiveYears && graphstate === "5Y" &&
                        <div>
                            <ResponsiveContainer width="100%" aspect={2}>
                                <LineChart data={fiveYearGraphDataTrimmed(timePeriodGraphData[0]?.fiveYears.historical).reverse()}>
                                    <Line dataKey="close" stroke="#6afa27"
                                        strokeWidth={2} dot={false} isAnimationActive={false} />
                                    <XAxis hide={true}
                                        dataKey="date"
                                    // domain={[
                                    //     ((new Date(`${moment().format('YYYY-MM-DD')} 09:30:00`).getTime() / 1000) - 25200),
                                    //      ((new Date(`${moment().format('YYYY-MM-DD')} 16:00:00`).getTime() / 1000) - 25200)]}
                                    />
                                    <YAxis hide={false} domain={[min(fiveYearGraphDataTrimmed(timePeriodGraphData[0]?.fiveYears.historical)),
                                    max(fiveYearGraphDataTrimmed(timePeriodGraphData[0]?.fiveYears.historical))]} />
                                    <Tooltip />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>}
                    <button className='time-btn' onClick={() => {
                        timePeriodButton({ 'string': 'oneDay', 'ticker': urlTicker })
                        setgraphstate("1D")
                        console.log(graphstate);
                    }}>1D</button>
                    <button className='time-btn' onClick={() => {
                        timePeriodButton({ 'string': 'oneWeek', 'ticker': urlTicker })
                        setgraphstate("1W")
                        console.log(graphstate);
                    }}>1W</button>
                    <button className='time-btn' onClick={() => {
                        timePeriodButton({ 'string': 'oneMonth', 'ticker': urlTicker })
                        setgraphstate("1M")
                        console.log(graphstate);
                    }}>1M</button>
                    <button className='time-btn' onClick={() => {
                        timePeriodButton({ 'string': 'threeMonths', 'ticker': urlTicker })
                        setgraphstate("3M")
                        console.log(graphstate);
                    }}>3M</button>
                    <button className='time-btn' onClick={() => {
                        timePeriodButton({ 'string': 'oneYear', 'ticker': urlTicker })
                        setgraphstate("1Y")
                        console.log(graphstate);
                    }}>1Y</button>
                    <button className='time-btn' onClick={() => {
                        timePeriodButton({ 'string': 'fiveYears', 'ticker': urlTicker })
                        setgraphstate("5Y")
                        console.log(graphstate);
                    }}>5Y</button>
                </div>
                {
                    option === "remove" ? (
                        <div className={"remove-from"}>
                            <button className='watchlist-btn' onClick={removeFromWatchlist}>{optionText}</button>
                        </div>
                    ) : (
                        <div className={"add-to"}>
                            <button className='watchlist-btn' onClick={addToWatchlist}>{optionText}</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}


export default Stocks;

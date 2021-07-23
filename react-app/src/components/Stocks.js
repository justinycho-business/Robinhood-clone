import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { get1dayData } from '../store/stocks';
import { getDashboardData } from '../store/dashboard'
import './styles/Stocks.css';


const Stocks = () => {
    const dispatch = useDispatch()

    const urlString = window.location.href;

    const getTicker = (string) => {
        for (let i = string.length; i >= 0; i--) {
            const slash = '/'
            if (string[i] === slash) {
                return string.substring(i + 1)
            }
        }
    }

    const [stockdata, setstockdata] = useState(null);
    const [totalStocks, setTotalStocks] = useState(1);
    const [ticker, setTicker] = useState(getTicker(urlString))
    const [userId, setUserId] = useState(null)
    const [option, setOption] = useState('add')
    const [watchlistContainer, setContainer] = useState('')
    const [watchlistButton, setWatchlistButton] = useState(null)
    const watchlist = useSelector(state => state?.dashboard)
    const priceData = useSelector(state => state?.priceData?.oneDayDataStocks)
    const user = useSelector(state => state.session.user);
    const oneDayGraphData = useSelector(state => state?.priceData?.oneDayDataStocks)
    const id = useParams();

    const oneDayGraphDataTrimmed = (data) => {
        const result = []
        for (let i = 0; i < data.length; i++) {
            if (data[i].date.startsWith(moment().format('YYYY-MM-DD'))) {
                result.push(data[i])
            }
        }
        return result.reverse()
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
        console.log(data)
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
        console.log(data)
    };

    useEffect(() => {
        (async function fetchData() {
            const response = await fetch(`/api/stocks/info/${id.ticker}`);
            const responseData = await response.json();
            setstockdata(responseData);
        })();
        setUserId(user.id);
        dispatch(getDashboardData(user.id));
        dispatch(get1dayData(ticker));
    }, [user, id, dispatch, get1dayData]);

    useEffect(() => {
        (async function fetchData() {
            const res = await fetch(`/api/stocks/watchlist/setter/${ticker}/${user.id}`);
            const data = await res.json();
            setOption(data.option)
            if (data.option === "Add to Watchlist") {
                setContainer('add-to')
            } else if (data.option === "Remove from Watchlist") {
                setContainer('remove-from')
            }
        })();
    }, []);

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


    if (!oneDayGraphData) {
        return (
            <div class="loader">
                <div class="inner one"></div>
                <div class="inner two"></div>
                <div class="inner three"></div>
            </div>
        )
    }


    return (
        <div className='stocks-background'>
            <div className='stocks-info-container'>
                <div className='stock-details'>
                    <h2 className='stock-title'>{stockdata?.companyName}</h2>
                    <h2 className='stock-price'>${(stockdata?.latestPrice.toFixed(2))}</h2>
                    <h2 className='stock-change'> $+ {stockdata?.change} ({(stockdata?.changePercent.toFixed(2))}%) Today</h2>
                </div>
                <div className='side-bar-content'>
                    <div className='actions-container'>
                        <form className='buy-form'>
                            <label className='form-title'> Buy {stockdata?.symbol} :</label>
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
                                <button className='buy-btn'>Buy</button>
                            </div>
                        </form>
                        <div className='buying-power-container'>
                            <h2>${user?.buying_power} buying power available</h2>
                        </div>
                    </div>
                </div>
                <div className='company-graph'>
                    <div>
                        <ResponsiveContainer width="100%" aspect={2}>
                            <LineChart data={oneDayGraphData && oneDayGraphDataTrimmed(oneDayGraphData[0]?.oneDay[0])}>
                                <Line dataKey="close" stroke="#6afa27"
                                    strokeWidth={2} dot={false} isAnimationActive={false} />
                                <XAxis hide={true} dataKey="date" domain={[`${moment().format('YYYY-MM-DD')} 09:30:00`,
                                `${moment().format('YYYY-MM-DD')} 16:00:00`]} />
                                <YAxis hide={true} domain={[min(oneDayGraphDataTrimmed(oneDayGraphData[0]?.oneDay[0])),
                                max(oneDayGraphDataTrimmed(oneDayGraphData[0]?.oneDay[0]))]} />
                                <Tooltip />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <button className='time-btn'>1D</button>
                    <button className='time-btn'>1W</button>
                    <button className='time-btn'>1M</button>
                    <button className='time-btn'>3M</button>
                    <button className='time-btn'>1Y</button>
                    <button className='time-btn'>5Y</button>
                    <button className='time-btn'>All</button>
                </div>
                {
                    option === "add" &&
                    <div className={"add-to"}>
                        <button className='watchlist-btn' onClick={addToWatchlist}>{option}</button>
                    </div>
                }
                {option === "remove" &&
                    <div className={"remove-from"}>
                        <button className='watchlist-btn' onClick={removeFromWatchlist}>{option}</button>
                    </div>
                }
            </div>
        </div>
    )
}


export default Stocks;

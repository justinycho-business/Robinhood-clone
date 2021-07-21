import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import './styles/Stocks.css';


const Stocks = () => {
    const [stockdata, setstockdata] = useState(null);
    const [totalStocks, setTotalStocks] = useState(1);
    const [ticker, setTicker] = useState('')
    const [userId, setUserId] = useState(null)
    const user = useSelector(state => state.session.user);
    const graphData = [{ uv: 75, time: 10 }, { uv: 20, time: 15 }, { uv: 45, time: 15 }, { uv: 15, time: 25 }, { uv: 35, time: 25 }];
    const id = useParams();
    const dispath = useDispatch();
    // Create a reducer for watchlist if not already done, figure out a way to get company id from backend since info seeded?
    // need to figure out where to sell, maybe on dashboard you can choose the stocks since they're already making calls to the backend I believe.

    useEffect(() => {
        (async function fetchData() {
            const response = await fetch(`/api/stocks/justinpage/${id.ticker}`);
            const responseData = await response.json();
            setstockdata(responseData);
            setTicker(responseData.symbol)
            setUserId(user.id)
        })()
    }, [user, id]);

    const addToWatchlist = (e) => {
        e.preventDefault();
        const watchlistData = { ticker, userId }
        console.log(watchlistData)
    };

    return (
        <div className='stocks-background'>
            <div className='stocks-info-container'>
                <div className='stock-details'>
                    <h2 className='stock-title'>{stockdata?.companyName}</h2>
                    <h2 className='stock-price'>${stockdata?.latestPrice}</h2>
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
                                <h1 className='market-price'>{stockdata?.latestPrice}</h1>
                            </div>
                            <div className='est-cost-container'>
                                <label className='form-item'>Estimated Cost:</label>
                                <h1 className='total-price'>${totalStocks * stockdata?.latestPrice}</h1>
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
                            <LineChart data={graphData}>
                                <Line dataKey="uv" stroke="#8884d8" />
                                <XAxis dataKey="name" />
                                <YAxis />
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
                <div className='watchlist-container'>
                    <button className='watchlist-btn' onClick={addToWatchlist}>Watch {stockdata?.symbol}</button>
                </div>
            </div>
        </div>
    )
};

export default Stocks;

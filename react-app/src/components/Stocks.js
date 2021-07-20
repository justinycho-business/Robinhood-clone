import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import './styles/Stocks.css';


const Stocks = () => {
    const [stockdata, setstockdata] = useState(null);
    const [totalStocks, setTotalStocks] = useState(1)
    const user = useSelector(state => state.session.user)
    const buyingPower = 100.00
    const n = buyingPower.toFixed(2)
    const graphData = [{ uv: 75, time: 10 }, { uv: 20, time: 15 }, { uv: 45, time: 15 }, { uv: 15, time: 25 }, { uv: 35, time: 25 }]
    let graphDataExample;
    const id = useParams()

    useEffect(() => {
        (async function fetchData() {
            const response = await fetch(`/api/stocks/justinpage/${id.ticker}`);
            const responseData = await response.json();
            console.log(responseData);
            graphDataExample = [
                { uv: responseData.previousClose, time: 10 },
                { uv: responseData.previousClose, time: 15 }
            ]
            console.log(graphDataExample)
            setstockdata(responseData);
        })()
    }, [user]);

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
                            <h2>${n} buying power available</h2>
                        </div>
                    </div>
                </div>
                <div className='company-graph'>
                    <div>
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
                <div className='watchlist-container'>
                    <button className='watchlist-btn'>Watch {stockdata?.symbol}</button>
                </div>
            </div>
        </div>
    )
}

export default Stocks;

import { useState, useEffect } from 'react';
import './styles/Stocks.css';


const Stocks = () => {
    const [stockdata, setstockdata] = useState(null);
    const [totalStocks, setTotalStocks] = useState(1)
    const buyingPower = 100.00
    const n = buyingPower.toFixed(2)
    const ticker = 'APLE'


    useEffect(() => {
        (async function fetchData() {
            const response = await fetch('/api/stocks/justinpage');
            const responseData = await response.json();
            console.log(responseData);
            setstockdata(responseData);
        })()
    }, []);



    return (
        <div className='stocks-background'>
            <div className='stocks-info-container'>
                <div className='stock-details'>
                    <h2 className='stock-title'>{stockdata?.companyName}</h2>
                    <h2 className='stock-price'>{stockdata?.iexAskPrice}</h2>
                    <h2 className='stock-change'>( {stockdata?.changePercent * 10}%) Today</h2>
                </div>
                <div className='side-bar-content'>
                    <div className='actions-container'>
                        <form className='buy-form'>
                            <label className='form-title'> Buy {ticker} :</label>
                            <div className='form-shares'>
                                <label className='form-item'>Shares: </label>
                                <input className='form-shares-input' placeholder={1}
                                    onChange={(e) => setTotalStocks(e.target.value)}
                                    value={totalStocks}
                                ></input>
                            </div>
                            <div className='form-market-price'>
                                <label className='form-item'>Market Price :</label>
                                <h1 className='market-price'>{stockdata?.iexAskPrice}</h1>
                            </div>
                            <div className='est-cost-container'>
                                <label className='form-item'>Estimated Cost:</label>
                                <h1 className='total-price'>{totalStocks * stockdata?.iexAskPrice}</h1>
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
                <div className='watchlist-container'>
                    <button className='watchlist-btn'>Watch APLE</button>
                </div>
            </div>
        </div>
    )
}

export default Stocks;

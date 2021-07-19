import { useState } from 'react';
import './styles/Stocks.css';


const Stocks = () => {
    const [totalStocks, setTotalStocks] = useState(1)
    const marketCost = 10;
    const buyingPower = 100.00
    const n = buyingPower.toFixed(2)
    return (
        <div className='stocks-background'>
            <div className='stocks-info-container'>
                <div className='stock-details'>
                    <h2 className='stock-title'>Apple Hospitality REIT</h2>
                    <h2 className='stock-price'>$14.08</h2>
                    <h2 className='stock-change'>-$0.46 (-3.20%) As of 10:59 AM PDT today</h2>
                </div>
                <div className='side-bar-content'>
                    <div className='actions-container'>
                        <form className='buy-form'>
                            <label className='form-title'> Buy APLE :</label>
                            <div className='form-shares'>
                                <label className='form-item'>Shares: </label>
                                <input className='form-shares-input' placeholder={1}
                                    onChange={(e) => setTotalStocks(e.target.value)}
                                    value={totalStocks}
                                ></input>
                            </div>
                            <div className='form-market-price'>
                                <label className='form-item'>Market Price :</label>
                                <h1 className='market-price'>{marketCost}</h1>
                            </div>
                            <div className='est-cost-container'>
                                <label className='form-item'>Estimated Cost:</label>
                                <h1 className='total-price'>{totalStocks * marketCost}</h1>
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

import { useSelector } from 'react-redux'
import './styles/Stocks.css';


const Stocks = () => {
    const user = useSelector(state => state.session.user)
    const removeSignUpFromNavBar = useSelector(state => state.session.user)
    const options = [1, 5, 10, 20]
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
                            <label> Buy AAPL <select>
                                <option value={1}> 1 </option>
                                <option value={5}> 5 </option>
                                <option value={10}> 10 </option>
                            </select> </label>
                            <div>
                                <label>Shares </label>
                            </div>
                            <divv>
                                <label>Market Price</label>
                            </divv>
                            <div>
                                <label>Estimated Cost:</label>
                            </div>
                            <div className='buy-btn-container'>
                                <button className='buy-btn'>Buy</button>
                            </div>
                        </form>
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

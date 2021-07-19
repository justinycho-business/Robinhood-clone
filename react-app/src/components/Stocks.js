import { useSelector } from 'react-redux'
import './styles/Stocks.css';


const Stocks = () => {
    const user = useSelector(state => state.session.user)
    const removeSignUpFromNavBar = useSelector(state => state.session.user)
    return (
        <div className='stocks-background'>
            <div className='stocks-graph-container'>
                <div className='stocks-graph'>

                </div>
                <h2>Hello</h2>
            </div>
        </div>
    )
}

export default Stocks;

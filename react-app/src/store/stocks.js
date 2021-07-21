// Define action types
const ONE_DAY_STOCK_DATA = 'stocks/ONE_DAY_STOCK_DATA';


// Action Creators
const oneDayData = (oneDay) => ({
    type: ONE_DAY_STOCK_DATA,
    payload: oneDay
})


// Define Thunks
export const get1dayData = (ticker) => async (dispatch) => {
    const response = await fetch(`/api/stocks/${ticker}`);

    if (response.ok) {
        const oneDayStockData = await response.json()
        dispatch(oneDayData(oneDayStockData));
    }
};


// Define initial state
const initialState = {}

  // Define reducer
export default function stockReducer(state = initialState, action) {
    let newState = {}
    switch (action.type) {
        case ONE_DAY_STOCK_DATA:
            return {...state, oneDayDataStocks: [action.payload] }
        default:
            return state;
    };
};

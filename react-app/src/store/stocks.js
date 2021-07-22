// Define action types
const ONE_DAY_STOCK_DATA = 'stocks/ONE_DAY_STOCK_DATA';
const TIME_PERIOD_BUTTON = 'stocks/TIME_PERIOD_BUTTON';


// Action Creators
const oneDayData = (oneDay) => ({
    type: ONE_DAY_STOCK_DATA,
    payload: oneDay
})

const timePeriodButton = (timePeriodData) => ({
    type: TIME_PERIOD_BUTTON,
    payload: timePeriodData
})


// Define Thunks
export const get1dayData = (ticker) => async (dispatch) => {
    const response = await fetch(`/api/stocks/${ticker}`);

    if (response.ok) {
        const oneDayStockData = await response.json()
        dispatch(oneDayData(oneDayStockData));
    }
};

export const graphTimePeriodButton = (payload_obj) => async(dispatch) => {
    const response = await fetch('/api/stocks/timePeriod', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload_obj)
    });
    console.log('insdie of the thunk ====================')

    if(response.ok) {
        const updatedGraphData = await response.json()
        dispatch(timePeriodButton(updatedGraphData))
    }
}


// Define initial state
const initialState = {}

  // Define reducer
export default function stockReducer(state = initialState, action) {
    let newState = {}
    switch (action.type) {
        case ONE_DAY_STOCK_DATA:
            return {...state, oneDayDataStocks: [action.payload] }
        case TIME_PERIOD_BUTTON:
            return {...state, timePeriodData: [action.payload]}
        default:
            return state;
    };
};

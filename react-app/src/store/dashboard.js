

// Define action types
const ADD_FUNDS = 'dashboard/ADD_FUNDS';


// Action Creators
const addFunds = (amount) => ({
    type: ADD_FUNDS,
    payload: amount
});


// Define Thunks
export const addFundsToPortfolio = (payload) => async (dispatch) => {
    const response = await fetch('/api/dashboard/addFunds/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const updatedPortfolio = await response.json()
        dispatch(addFunds(updatedPortfolio));
    }
};


// Define initial state
const initialState = {}

  // Define reducer
export default function dashboardReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_FUNDS:
            return {...state, amount: [action.payload] }
        default:
            return state;
    };
};

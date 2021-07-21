

// Define action types
const DASHBOARD_DATA = 'dashboard/DASHBOARD_DATA';
const ADD_FUNDS = 'dashboard/ADD_FUNDS';
const GET_LIL_GRAPHS = 'dashboard/GET_LIL_GRAPHS';


// Action Creators
const dashboardData = (userData) => ({
    type: DASHBOARD_DATA,
    payload: userData
})

const addFunds = (amount) => ({
    type: ADD_FUNDS,
    payload: amount
});

const action_getlilgraphs = (lilgraphdata) => ({
    type: GET_LIL_GRAPHS,
    payload: lilgraphdata
})

// Define Thunks
export const getlilgraphs = (tickerlist) => async (dispatch) => {
    const response = await fetch(`/api/dashboard/lilgraphs`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'hi': tickerlist})
        });

    if(response.ok) {
        const watchlistData = await response.json();
        dispatch(action_getlilgraphs(watchlistData));
    }
}

export const getDashboardData = (id) => async (dispatch) => {
    const response = await fetch(`/api/dashboard/${id}`)

    if(response.ok) {
        const watchlistData = await response.json();
        dispatch(dashboardData(watchlistData));
    }
}

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
        case DASHBOARD_DATA:
            return {...state, userData: [action.payload]}
        case GET_LIL_GRAPHS:
            return {...state, lilgraphs: [action.payload]}
        default:
            return state;
    };
};

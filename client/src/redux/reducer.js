
let initalState = {
    user: [],
    currentPlace: '',
    results: [],
    isSent : ''
};

export default function rootReducer(state = initalState, action) {
    switch (action.type) {

        case 'SAVE_USER':
            return {
                ...state,
                user: [action.payload]
            }

        case 'SAVE_PLACE':
            return {
                ...state,
                currentPlace: [action.payload]
            }

        case 'GET_RESULTS':
            return {
                ...state,
                results: [action.payload]
            }
        case 'LOGOUT_USER':
            return {
                ...state,
                user: []
            }
            
        default:
            return state;
    }
};
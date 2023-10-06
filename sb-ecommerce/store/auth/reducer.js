import { actionTypes } from './action';

const initialState = {
    isLoggedIn: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_USER:
            return { ...state, loading: true, error: '' };
        case actionTypes.LOGIN_USER_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                currentUser: action.payload,
                error: '',
            };
        case actionTypes.LOGIN_USER_ERROR:
            return {
                ...state,
                loading: false,
                currentUser: null,
            };
        case actionTypes.REGISTER:
            return { ...state, loading: true, error: '' };
        case actionTypes.REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: action.payload,
                error: '',
            };
        case actionTypes.REGISTER_USER_ERROR:
            return {
                ...state,
                loading: false,
                currentUser: null,
            };
        case actionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
                currentUser: {},
                error: '',
            };
        default:
            return { ...state };
    }
};

export default reducer;

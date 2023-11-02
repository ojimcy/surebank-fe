import { actionTypes } from './action';

export const initalState = {
    wishlistItems: [],
    compareItems: [],
    cartItems: [],
    orders: [],
    shippingAddress: null,
    paymentMethod: null,
    order: [],
};

function reducer(state = initalState, action) {
    switch (action.type) {
        // new
        case actionTypes.SET_WISHLIST_ITEMS_SUCCESS:
            return {
                ...state,
                wishlistItems: action.payload,
            };
        case actionTypes.SET_CART_ITEMS_SUCCESS:
            return {
                ...state,
                cartItems: action.payload,
            };
        case actionTypes.SET_COMPARE_ITEMS_SUCCESS:
            return {
                ...state,
                compareItems: action.payload,
            };
        case actionTypes.CREATE_ORDER_SUCCESS:
            return {
                ...state,
                order: action.payload,
            };
        case actionTypes.SET_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            };
        case actionTypes.SET_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            };
        case actionTypes.SET_ORDER_DETAILS:
            return {
                ...state,
                order: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;

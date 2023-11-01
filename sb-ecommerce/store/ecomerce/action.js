export const actionTypes = {
           // new

           SET_WISHLIST_ITEMS: 'SET_WISHLIST_ITEMS',
           SET_WISHLIST_ITEMS_SUCCESS: 'SET_WISHLIST_ITEMS_SUCCESS',

           SET_CART_ITEMS: 'SET_CART_ITEMS',
           SET_CART_ITEMS_SUCCESS: 'SET_CART_ITEMS_SUCCESS',

           SET_COMPARE_ITEMS: 'SET_COMPARE_ITEMS',
           SET_COMPARE_ITEMS_SUCCESS: 'SET_COMPARE_ITEMS_SUCCESS',

           CREATE_ORDER: 'CREATE_ORDER',
           CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS',
           SET_SHIPPING_ADDRESS: 'SET_SHIPPING_ADDRESS',
           SET_PAYMENT_METHOD: 'SET_PAYMENT_METHOD',
           SET_ORDER_DETAILS: 'SET_ORDER_DETAILS',
       };

// new
export function setWishlistTtems(payload) {
    return { type: actionTypes.SET_WISHLIST_ITEMS, payload };
}

export function setWishlistTtemsSuccess(payload) {
    return { type: actionTypes.SET_WISHLIST_ITEMS_SUCCESS, payload };
}

export function setCartItems(payload) {
    return { type: actionTypes.SET_CART_ITEMS, payload };
}

export function setCartItemsSuccess(payload) {
    return { type: actionTypes.SET_CART_ITEMS_SUCCESS, payload };
}

export function setCompareItems(payload) {
    return { type: actionTypes.SET_COMPARE_ITEMS, payload };
}

export function setCompareItemsSuccess(payload) {
    return { type: actionTypes.SET_COMPARE_ITEMS_SUCCESS, payload };
}

export function createOrder(orderData) {
    return { type: actionTypes.CREATE_ORDER, payload: orderData };
}

export function createOrderSuccess(order) {
    return { type: actionTypes.CREATE_ORDER_SUCCESS, payload: order };
}

export function setShippingAddress(address) {
    return { type: actionTypes.SET_SHIPPING_ADDRESS, payload: address };
}

export function setPaymentMethod(paymentMethod) {
    return { type: actionTypes.SET_PAYMENT_METHOD, payload: paymentMethod };
}

export function setOrderDetails(order) {
    return { type: actionTypes.SET_ORDER_DETAILS, payload: order };
}
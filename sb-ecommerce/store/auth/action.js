export const actionTypes = {
    LOGIN_USER: 'LOGIN_USER',
    LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS',
    LOGIN_USER_ERROR: 'LOGIN_USER_ERROR',
    REGISTER_USER: 'REGISTER_USER',
    REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS',
    REGISTER_USER_ERROR: 'REGISTER_USER_ERROR',
    LOGOUT: 'LOGOUT',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
};

export function login() {
    return { type: actionTypes.LOGIN_USER };
}

export function loginSuccess() {
    return { type: actionTypes.LOGIN_USER_SUCCESS };
}

export function loginError() {
    return { type: actionTypes.LOGIN_USER_ERROR };
}

export function register() {
    return { type: actionTypes.REGISTER_USER };
}

export function registerSuccess() {
    return { type: actionTypes.REGISTER_USER_SUCCESS };
}

export function registerError() {
    return { type: actionTypes.REGISTER_USER_ERROR };
}

export function logOut() {
    return { type: actionTypes.LOGOUT };
}

export function logOutSuccess() {
    return { type: actionTypes.LOGOUT_SUCCESS };
}


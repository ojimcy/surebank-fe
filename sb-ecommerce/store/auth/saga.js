import { all, put, call, takeEvery } from 'redux-saga/effects';
import { notification } from 'antd';

import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
    FORGOT_PASSWORD,
    RESET_PASSWORD,
    API_CURRENT_ACCOUNT,
    API_LOGIN,
    API_CREATE_ACCOUNT,
    USER_TOKEN_KEY,
    REFRESH_USER_INFO,
    AUTHORIZE_LOGIN,
    API_AUTHORIZE_LOGIN,
} from '../constants';

import {
    actionTypes,
    loginSuccess,
    logOutSuccess,
    registerSuccess,
    loginError,
    registerError,
} from './action';
import { setCurrentUser } from '~/utilities/utils';

const modalSuccess = (type) => {
    notification[type]({
        message: 'Wellcome back',
        description: 'You are login successful!',
    });
};

const modalWarning = (type) => {
    notification[type]({
        message: 'Good bye!',
        description: 'Your account has been logged out!',
    });
};

export function* watchLogin() {
    yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginWithEmailPasswordAsync = async (email, password) => {
    const response = await axios.post(
        API_LOGIN,
        JSON.stringify({ email, password })
    );
    if (response.data.error) {
        return { message: response.data.error };
    }
    return response.data;
};

const getCurrentUserDetail = async (token) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    const curUserResp = await axios.get(API_CURRENT_ACCOUNT, {
        headers,
    });
    if (curUserResp.data.error) {
        return { message: curUserResp.data.error };
    }
    return { user: curUserResp.data.user };
};

function* loginWithEmailPassword({ payload }) {
    const { email, password } = payload.user;
    const { history } = payload;
    try {
        const loginUser = yield call(
            loginWithEmailPasswordAsync,
            email,
            password
        );
        if (loginUser) {
            localStorage.setItem(USER_TOKEN_KEY, loginUser.tokens.access.token);
            setCurrentUser(loginUser.user);
            yield put(loginSuccess(loginUser.user));
            history.push(adminRoot);
        } else {
            yield put(loginError('Login failed'));
        }
    } catch (error) {
        yield put(loginError(error.toString()));
    }
}


export function* watchAuthorizeLogin() {
    // eslint-disable-next-line no-use-before-define
    yield takeEvery(AUTHORIZE_LOGIN, authorizeLogin);
}

function* loginSaga() {
    try {
        yield put(loginSuccess());
        modalSuccess('success');
    } catch (err) {
        console.log(err);
    }
}

const authorizeLoginAsync = async (otp) => {
    const response = await axios.post(
        API_AUTHORIZE_LOGIN,
        JSON.stringify({ otp })
    );
    if (response.data.error) {
        return { message: response.data.error };
    }
    return response.data.user;
};

function* authorizeLogin({ payload }) {
    const { history, otp } = payload;
    try {
        const loginUser = yield call(authorizeLoginAsync, otp);
        if (!loginUser.message) {
            localStorage.setItem(USER_TOKEN_KEY, loginUser.token);
            const curUser = yield call(getCurrentUserDetail, loginUser.token);
            if (curUser.message) {
                yield put(loginError(curUser.message));
            } else {
                setCurrentUser(curUser.user);
                yield put(loginSuccess(curUser.user));
                history.push(adminRoot);
                window.location.reload();
            }
        } else {
            yield put(loginError(loginUser.message));
        }
    } catch (error) {
        yield put(loginError(error.toString()));
    }
}

function* refereshUserInfo() {
    const curUser = yield call(getCurrentUserDetail);
    if (curUser.message) {
        yield put(loginError(curUser.message));
    } else {
        setCurrentUser(curUser.user);
        yield put(loginSuccess(curUser.user));
    }
}

export function* watchRegisterUser() {
    // eslint-disable-next-line no-use-before-define
    yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}


export function* watchRefreshUserInfo() {
    // eslint-disable-next-line no-use-before-define
    yield takeEvery(REFRESH_USER_INFO, refereshUserInfo);
}



function* logOutSaga() {
    try {
        yield put(logOutSuccess());
        modalWarning('warning');
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.LOGIN_USER, loginSaga)]);
    yield all([takeEvery(actionTypes.LOGOUT, logOutSaga)]);
}

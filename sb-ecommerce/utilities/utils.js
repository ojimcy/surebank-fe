export const mapOrder = (array, order, key) => {
    // eslint-disable-next-line func-names
    array.sort(function (a, b) {
        const A = a[key];
        const B = b[key];
        if (order.indexOf(`${A}`) > order.indexOf(`${B}`)) {
            return 1;
        }
        return -1;
    });
    return array;
};

export const getDateWithFormat = () => {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; // January is 0!

    const yyyy = today.getFullYear();
    if (dd < 10) {
        dd = `0${dd}`;
    }
    if (mm < 10) {
        mm = `0${mm}`;
    }
    return `${dd}.${mm}.${yyyy}`;
};

export const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}`;
};

export const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const getCurrentUser = () => {
    let user = null;
    try {
        user =
            localStorage.getItem('gogo_current_user') != null
                ? JSON.parse(localStorage.getItem('gogo_current_user'))
                : null;
    } catch (error) {
        console.log(
            '>>>>: src/helpers/Utils.js  : getCurrentUser -> error',
            error
        );
        user = null;
    }
    return user;
};

export const setCurrentUser = (user) => {
    try {
        if (user) {
            localStorage.setItem('gogo_current_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('gogo_current_user');
        }
    } catch (error) {
        console.log(
            '>>>>: src/helpers/Utils.js : setCurrentUser -> error',
            error
        );
    }
};

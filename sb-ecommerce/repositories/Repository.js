import axios from 'axios';
// const baseURL = 'http://localhost:3000/v1';
const baseURL = 'https://l1uwu6hw65.execute-api.us-east-1.amazonaws.com';

export const customHeaders = {
    Accept: 'application/json',
};

export const baseUrl = `${baseURL}`;

export default axios.create({
    baseUrl,
    headers: customHeaders,
});

export const serializeQuery = (query) => {
    return Object.keys(query)
        .map(
            (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join('&');
};

import axiosService from '~/repositories/axiosService';

export const updateProfile = async (userData) => {
    const response = await axiosService.patch('/users', userData);
    return response.data;
};

export const getBranches = async () => {
    const response = await axiosService.get('/branch');
    return response.data;
};

export const createAccount = async (accountData) => {
    const response = await axiosService.post('/accounts', accountData);
    return response.data;
};



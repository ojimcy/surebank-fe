import axiosService from '~/repositories/axiosService';

export const createOrder = async (orderData) => {
    const response = await axiosService.post('/orders', orderData);
    return response.data;
};

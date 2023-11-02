import axiosService from '~/repositories/axiosService';

export const createOrder = async (orderData) => {
    const response = await axiosService.post('/orders', orderData);
    return response.data;
};

export const getOrderById = async (orderId) => {
    const response = await axiosService.get(`/orders/${orderId}`);
    return response.data;
};

export const updateOrder = async (orderId, orderData) => {
    await axiosService.patch(`/orders/${orderId}`, orderData);
};

export const orderHistory = async (userId) => {
    const response = await axiosService.get(`/orders/user?userId=${userId}`);
    return response.data;
};

export const payOrder = async (orderId, orderData) => {
   const response = await axiosService.post(`/orders/${orderId}/pay`, orderData);
   return response.data;
};

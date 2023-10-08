import axiosService from '~/repositories/axiosService';

export const createMerchant = async (merchantData) => {
    const response = await axiosService.post('/merchant/request', merchantData);
    return response.data;
};

export const getMerchantRequests = async () => {
    const response = await axiosService.get('/merchant/requests');
    return response.data;
};

export const approveMerchantRequests = async (merchantId) => {
    const response = await axiosService.post(`/merchant/${merchantId}/approve`);
    return response.data;
};

export const rejectMerchantRequests = async (merchantId) => {
    const response = await axiosService.post(`/merchant/${merchantId}/reject`);
    return response.data;
};

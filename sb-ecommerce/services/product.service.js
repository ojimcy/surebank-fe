import axiosService from '~/repositories/axiosService';

export const getBrands = async () => {
    const response = await axiosService.get('brands');
    return response.data;
};

export const getCategories = async () => {
    const response = await axiosService.get('/store/category');
    return response.data;
};

export const createProduct = async (productData) => {
    const response = await axiosService.post('/product/request', productData);
    return response.data;
};

export const getProductRequests = async () => {
    const response = await axiosService.get('/product/request');
    return response.data;
};

export const approveProductRequests = async (productId) => {
    const response = await axiosService.post(`/product/${productId}/approve`);
    return response.data;
};

export const rejectProductRequests = async (productId) => {
    const response = await axiosService.post(`/product/${productId}/reject`);
    return response.data;
};

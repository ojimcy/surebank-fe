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
    const response = await axiosService.post('/products/request', productData);
    return response.data;
};

export const getProductRequests = async () => {
    const response = await axiosService.get('/products/request');
    return response.data;
};

export const approveProductRequests = async (productId) => {
    const response = await axiosService.post(`/products/${productId}/approve`);
    return response.data;
};

export const rejectProductRequests = async (productId) => {
    const response = await axiosService.post(`/products/${productId}/reject`);
    return response.data;
};

export const getProducts = async () => {
    const response = await axiosService.get('/products');
    return response.data;
};

export const createProductCatalogue = async (catData) => {
    const response = await axiosService.post(`/products/catalogue`, catData);
    return response.data;
};

export const getProductCatalogue = async () => {
    const response = await axiosService.get(`/products/catalogue`);
    return response.data;
};

export const getMyProductCatalogue = async () => {
    const response = await axiosService.get(`/products/catalogue/my`);
    return response.data;
};

export const deleteProductCatalogue = async (productId) => {
    await axiosService.delete(`/products/catalogue/${productId}`);
};

export const getProductCatById = async (pid) => {
    const response = await axiosService.get(`/products/catalogue/${pid}`);
    return response.data;
};

export const getProductById = async (pid) => {
    const response = await axiosService.get(`/products/${pid}`);
    return response.data;
};

export const getProductBySlug = async (collectionSlug) => {
    const response = await axiosService.get(
        `/products/collections?collectionSlug=${collectionSlug}`
    );
    return response.data;
};

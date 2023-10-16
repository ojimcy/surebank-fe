import Repository, { baseUrl, serializeQuery } from './Repository';
import axiosService from './axiosService';

class ProductRepository {
    async getRecords(params) {
        const response = await axiosService.get(
            `${baseUrl}/products/ids?${serializeQuery(params)}`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return response;
    }

    async getProducts(params) {
        const response = await axiosService.get(
            `${baseUrl}/product?${serializeQuery(params)}`
        )
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    return response.data;
                } else {
                    return null;
                }
            })

            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return response;
    }

    async getBrands() {
        const response = await axiosService.get(`${baseUrl}/brands`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return response;
    }

    async getProductCategories() {
        const response = await axiosService.get(`${baseUrl}/product-categories`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return response;
    }

    async getTotalRecords() {
        const response = await axiosService.get(`${baseUrl}/products/count`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return response;
    }

    async getProductsById(payload) {
        const response = await axiosService.get(`${baseUrl}/products/${payload}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return response;
    }

    async getProductsByCategory(payload) {
        const response = await axiosService.get(
            `${baseUrl}/product-categories?slug=${payload}`
        )
            .then((response) => {
                if (response.data) {
                    if (response.data.length > 0) {
                        return response.data[0];
                    }
                } else {
                    return null;
                }
            })
            .catch(() => {
                return null;
            });
        return response;
    }

    async getProductsByBrand(payload) {
        const response = await axiosService.get(
            `${baseUrl}/brands?slug=${payload}`
        )
            .then((response) => {
                if (response.data) {
                    if (response.data.length > 0) {
                        return response.data[0];
                    }
                } else {
                    return null;
                }
            })
            .catch(() => {
                return null;
            });
        return response;
    }

    async getProductsByIds(payload) {
        const endPoint = `${baseUrl}/products/ids?${payload}`;
        const response = await axiosService.get(endPoint)
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return response;
    }
}

export default new ProductRepository();

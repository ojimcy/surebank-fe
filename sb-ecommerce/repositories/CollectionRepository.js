import Repository, { baseUrl } from './Repository';

class CollectionRepository {

    async getProductsByCollectionSlug(slug) {
        const response = await Repository.get(
            `${baseUrl}/product/collections?collectionSlug=${slug}`
        )
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    return { items: response.data[0].products };
                } else {
                    return null;
                }
                return response.data;
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        console.log(response);

        return response;
    }

    async getProductsByCategorySlug(slug) {
        const reponse = await Repository.get(
            `${baseUrl}/product-categories?collectionSlug=${slug}`
        )
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    return { items: response.data[0].products };
                } else {
                    return null;
                }
                return response.data;
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }
}

export default new CollectionRepository();

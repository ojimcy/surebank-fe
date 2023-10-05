class MediaRepository {
    async getBannersBySlug(payload) {
        // Simulated banner data
        const simulatedBanners = [
            { id: 1, imageUrl: '/static/img/slider/home-1/slide-1.jpg' },
            { id: 2, imageUrl: '/static/img/slider/home-1/slide-2.jpg' },
            { id: 2, imageUrl: '/static/img/slider/home-1/slide-3.jpg' },
        ];

        return simulatedBanners;
    }

    async getPromotionsBySlug(payload) {
        // Simulated promotion data
        const simulatedPromotions = [
            { id: 1, imageUrl: '/static/img/slider/home-1/promotion-1.jpg' },
            { id: 2, imageUrl: '/static/img/slider/home-1/promotion-2.jpg' },
        ];

        return simulatedPromotions;
    }
}

export default new MediaRepository();

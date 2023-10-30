import React from 'react';
import SiteFeatures from '~/components/partials/homepage/home-default/SiteFeatures';
import HomeAdsColumns from '~/components/partials/homepage/home-default/HomeAdsColumns';
import HomeAds from '~/components/partials/homepage/home-default/HomeAds';
import NewArrivals from '~/components/partials/homepage/home-default/NewArrivals';
import HomeDefaultDealOfDay from '~/components/partials/homepage/home-default/HomeDefaultDealOfDay';
import HomeDefaultTopCategories from '~/components/partials/homepage/home-default/HomeDefaultTopCategories';
import HomeDefaultProductListing from '~/components/partials/homepage/home-default/HomeDefaultProductListing';
import HomeDefaultBanner from '~/components/partials/homepage/home-default/HomeDefaultBanner';
import PageContainer from '~/components/layouts/PageContainer';

const HomepageDefaultPage = () => {
    return (
        <PageContainer title="Surebank Stores">
            <main id="homepage-1">
                <HomeDefaultBanner />
                <SiteFeatures />
                <HomeDefaultDealOfDay collectionSlug="deal-of-the-day" />
                <HomeAdsColumns />
                <HomeDefaultTopCategories />
                <HomeDefaultProductListing
                    collectionSlug="consumer-electronics"
                    title="Consumer Electronics"
                />
                <HomeDefaultProductListing
                    collectionSlug="clothing-and-apparel"
                    title="Clothings"
                />
                <HomeDefaultProductListing
                    collectionSlug="garden-and-kitchen"
                    title="Garden & Kitchen"
                />
                <NewArrivals collectionSlug="new-arrivals" />
            </main>
        </PageContainer>
    );
};

export default HomepageDefaultPage;

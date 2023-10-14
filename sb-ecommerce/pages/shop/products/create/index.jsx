import React, { useEffect } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import ProductRequestForm from '../modules/ProductRequestForm';
import { useAuth } from '~/context/authContext';
import { useRouter } from 'next/router';

const CreateProductPage = () => {
    const { currentUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!currentUser) {
            router.push('/account/login');
        }
    }, [currentUser, router]);
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shop',
            url: '/shop',
        },
        {
            text: 'Create',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Become a vendor">
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} />
                <ProductRequestForm />
            </div>
        </PageContainer>
    );
};

export default CreateProductPage;

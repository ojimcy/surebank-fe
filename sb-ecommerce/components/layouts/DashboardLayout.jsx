import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '~/context/authContext';
import { useRouter } from 'next/router';

const DashboardLayout = ({ children }) => {
    const { currentUser, logout } = useAuth();
    const router = useRouter();

    const [activeLink, setActiveLink] = useState('Dashboard');

    const accountLinks = [
        {
            text: 'Dashboard',
            url: '/account/user-dashboard',
            icon: 'icon-home',
            active: true,
        },
        {
            text: 'Account Information',
            url: '/account/user-information',
            icon: 'icon-user',
        },
        {
            text: 'Notifications',
            url: '/account/notifications',
            icon: 'icon-alarm-ringing',
        },
        {
            text: 'Invoices',
            url: '/account/invoices',
            icon: 'icon-papers',
        },
        {
            text: 'Address',
            url: '/account/addresses',
            icon: 'icon-map-marker',
        },
        {
            text: 'Recent Viewed Product',
            url: '/account/recent-viewed-product',
            icon: 'icon-store',
        },
        {
            text: 'Wishlist',
            url: '/account/wishlist',
            icon: 'icon-heart',
        },
        {
            text: 'Products',
            url: '/account/product-catalogue',
            icon: 'icon-store',
        },
    ];

    useEffect(() => {
        // Update active link based on the current route
        const currentPath = router.pathname;
        const activeLink = accountLinks.find(
            (link) => link.url === currentPath
        );
        if (activeLink) {
            setActiveLink(activeLink.text);
        }
    }, [router.pathname, accountLinks]);

    const accountLinkView = accountLinks.map((item) => (
        <li
            key={item.text}
            className={item.text === activeLink ? 'active' : ''}>
            <Link href={item.url}>
                <a>
                    <i className={item.icon}></i>
                    {item.text}
                </a>
            </Link>
        </li>
    ));

    const handleLogout = async () => {
        try {
            await logout();
            notification.success({
                message: 'Logout Successful',
                duration: 300,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="ps-section__left">
                            <aside className="ps-widget--account-dashboard">
                                <div className="ps-widget__header">
                                    <img src="/static/img/users/3.jpg" />
                                    <figure>
                                        <figcaption>Hello</figcaption>
                                        <p>{`${currentUser?.firstName} ${currentUser?.lastName}`}</p>
                                    </figure>
                                </div>
                                <div className="ps-widget__content">
                                    <ul className="ps-list--user-links">
                                        {accountLinkView}
                                        <li>
                                            <Link href="/account/my-account">
                                                <a onClick={handleLogout}>
                                                    <i className="icon-power-switch"></i>
                                                    Logout
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="ps-page__content">{children}</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardLayout;

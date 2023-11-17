import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { useAuth } from '~/context/authContext';
import { notification } from 'antd';
import { useRouter } from 'next/router';

const AccountQuickLinks = (props) => {
    const { logout, currentUser } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
            notification.success({
                message: 'Logout Successful',
                duration: 200,
            });
            router.push('/');
        } catch (error) {
            console.error(error);
        }
    };

    const accountLinks = [
        {
            text: 'Dashboard',
            url: '/account/dashboard',
            icon: 'icon-home',
            active: true,
        },
        {
            text: 'Orders',
            url: '/account/orders/order-history',
            icon: 'icon-map-marker',
        },
        {
            text: 'Wishlist',
            url: '/account/wishlist',
            icon: 'icon-heart',
        },
        {
            text: 'Profile',
            url: '/account/profile',
            icon: 'icon-user',
        },
        {
            text: 'Invoices',
            url: '/account/invoices',
            icon: 'icon-papers',
        },
    ];

    if (currentUser && currentUser.role !== 'user') {
        accountLinks.push({
            text: 'View Products',
            url: '/shop/products/all-requests',
        });
        accountLinks.push({
            text: 'Products',
            url: '/account/products',
        });
    }

    // View
    const linksView = accountLinks.map((item) => (
        <li key={item.text}>
            <Link href={item.url}>
                <a>{item.text}</a>
            </Link>
        </li>
    ));

    if (currentUser) {
        return (
            <div className="ps-block--user-account">
                <i className="icon-user"></i>
                <div className="ps-block__content">
                    <ul className="ps-list--arrow">
                        {linksView}
                        <li className="ps-block__footer">
                            <a href="#" onClick={(e) => handleLogout(e)}>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    } else {
        return (
            <div className="ps-block--user-header">
                <div className="ps-block__left">
                    <i className="icon-user"></i>
                </div>
                <div className="ps-block__right">
                    <Link href="/account/login">
                        <a>Login</a>
                    </Link>
                    <Link href="/account/register">
                        <a>Register</a>
                    </Link>
                </div>
            </div>
        );
    }
};

export default connect((state) => state)(AccountQuickLinks);

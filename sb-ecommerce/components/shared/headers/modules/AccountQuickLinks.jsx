import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { useAuth } from '~/context/authContext';
import { notification } from 'antd';

const AccountQuickLinks = (props) => {
    const { logout, currentUser } = useAuth();

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
    const accountLinks = [
        {
            text: 'Account Information',
            url: '/account/user-information',
        },
        {
            text: 'Notifications',
            url: '/account/notifications',
        },
        {
            text: 'Invoices',
            url: '/account/invoices',
        },
        {
            text: 'Address',
            url: '/account/addresses',
        },
        {
            text: 'Recent Viewed Product',
            url: '/account/recent-viewed-product',
        },
        {
            text: 'Wishlist',
            url: '/account/wishlist',
        },
    ];
    
     if (currentUser && currentUser.role !== 'user') {
         accountLinks.push({
             text: 'View Products',
             url: '/shop/products/all-requests',
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

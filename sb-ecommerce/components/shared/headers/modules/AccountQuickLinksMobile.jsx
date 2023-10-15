import React from 'react';
import { Dropdown, Menu, notification } from 'antd';
import Link from 'next/link';
import { useAuth } from '~/context/authContext';

const AccountQuickLinks = () => {
    const {logout } = useAuth()

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
            text: 'Dashboard',
            url: '/account/user-dashboard',
        },
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

    const menu = (
        <Menu>
            {accountLinks.map((link) => (
                <Menu.Item key={link.url}>
                    <Link href={link.url}>
                        <a>{link.text}</a>
                    </Link>
                </Menu.Item>
            ))}

            <Menu.Item>
                <a href="#" onClick={handleLogout}>
                    Logout
                </a>
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} placement="bottomLeft">
            <a href="#" className="header__extra ps-user--mobile">
                <i className="icon-user"></i>
            </a>
        </Dropdown>
    );
};

export default AccountQuickLinks;

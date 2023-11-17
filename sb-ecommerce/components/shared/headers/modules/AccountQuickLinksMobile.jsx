import React from 'react';
import { Dropdown, Menu, notification } from 'antd';
import Link from 'next/link';
import { useAuth } from '~/context/authContext';
import { useRouter } from 'next/router';

const AccountQuickLinks = () => {
    const router = useRouter();
    const { logout } = useAuth();
    const { currentUser } = useAuth();

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

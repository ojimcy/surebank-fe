import React from 'react';
import Link from 'next/link';

const Logo = ({ type }) => {
    let data;
    data = {
        url: '/',
        img: '/static/img/logo_light.png',
    };
    return (
        <Link href={data.url}>
            <a className="ps-logo">
                Surebank
            </a>
        </Link>
    );
};

export default Logo;

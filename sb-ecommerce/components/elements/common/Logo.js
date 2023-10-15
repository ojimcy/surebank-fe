import React from 'react';
import Link from 'next/link';

const Logo = ({ type }) => {
    let data;
    data = {
        url: '/',
        img: '/static/img/sbLogo.png',
    };
    return (
        <Link href={data.url}>
            <a className="ps-logo">
                <img src={data.img} alt="" width='135px'/>
            </a>
        </Link>
    );
};

export default Logo;

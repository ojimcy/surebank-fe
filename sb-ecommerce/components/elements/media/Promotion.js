import React from 'react';
import Link from 'next/link';

const Promotion = ({ link, image }) => {
    if (image) {
        return (
            <Link href={link}>
                <a className="ps-collection">
                    <img src={`${image}`} alt="surebank" />
                </a>
            </Link>
        );
    } else {
        return (
            <Link href={link ? link : '/shop'}>
                <a className="ps-collection">
                    <img src="/static/img/not-found.jpg" alt="surebank" />
                </a>
            </Link>
        );
    }
};

export default Promotion;

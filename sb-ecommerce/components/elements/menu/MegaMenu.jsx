import React from 'react';
import Link from 'next/link';

const MegaMenu = ({ source }) => {
    let megaContentView;
    if (source) {
        megaContentView = source.megaContent.map((item) => (
            <div className="mega-menu__column" key={item._id}>
                <h4>{item.heading}</h4>
                <ul className="mega-menu__list">
                    {item.megaItems.map((subItem) => (
                        <li key={subItem.name}>
                            <Link
                                href={`/category/${item.slug}`}
                                as={subItem.slug}>
                                <a>{subItem.name}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        ));
    }
    return (
        <li className="menu-item-has-children has-mega-menu">
            <Link href={source.slug !== '' ? source.slug : '/'}>
                <a>
                    {source.icon && <i className={source.icon}></i>}
                    {source.name}
                </a>
            </Link>
            <div className="mega-menu">{megaContentView}</div>
        </li>
    );
};

export default MegaMenu;

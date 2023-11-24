import React, { useEffect, useState } from 'react';
import menuData from '~/public/static/data/menu.json';
import Menu from '~/components/elements/menu/Menu';
import { getCategories } from '~/services/product.service';

const MenuCategoriesDropdown = () => {
    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCategories();
                setMenuData(response);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="menu--product-categories">
            <div className="menu__toggle">
                <i className="icon-menu"></i>
                <span>Shop by Categories</span>
            </div>
            <div className="menu__content">
                <Menu
                    source={menuData}
                    className="menu--dropdown"
                />
            </div>
        </div>
    );
};

export default MenuCategoriesDropdown;

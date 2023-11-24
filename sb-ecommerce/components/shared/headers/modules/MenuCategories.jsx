import React, { useState, useEffect } from 'react';
import Menu from '~/components/elements/menu/Menu';
import { getCategories } from '~/services/product.service';

const MenuCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCategories();
                setCategories(response);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchData();
    }, []);

    return <Menu source={categories} className="menu--dropdown" />;
};

export default MenuCategories;

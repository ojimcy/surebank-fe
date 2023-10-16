import React from 'react';

const PartialDescription = ({ product }) => {
    return (
        <div className="ps-document">
            <p>{product.description}</p>
        </div>
    );
};

export default PartialDescription;

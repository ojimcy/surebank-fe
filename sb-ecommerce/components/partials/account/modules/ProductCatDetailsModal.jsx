import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import Link from 'next/link';
import Rating from '~/components/elements/Rating';

const ProductCatDetailsModal = ({
    selectedProduct,
    confirmModalVisible,
    onOk,
    onCancel,
}) => {
    return (
        <Modal
            title="Confirm Approval"
            visible={confirmModalVisible}
            onOk={onOk}
            onCancel={onCancel}>
            {selectedProduct && (
                <div className="ps-product">
                    <div className="ps-product__thumbnail">
                        <Link
                            href="/product/[pid]"
                            as={`/product/${selectedProduct.productId}`}>
                            <a>
                                <img
                                    src={selectedProduct.featuredImage}
                                    alt={selectedProduct.name}
                                />
                            </a>
                        </Link>
                    </div>
                    <div className="ps-product__container">
                        <Link href="/shop">
                            <a className="ps-product__vendor">
                                {selectedProduct.merchantId?.storeName}
                            </a>
                        </Link>
                        <div className="ps-product__content">
                            {selectedProduct.title}
                            <div className="ps-product__rating">
                                <Rating />
                                <span>02</span>
                            </div>
                            {selectedProduct.price}
                        </div>
                        <div className="ps-product__content hover">
                            {selectedProduct.title}
                            {selectedProduct.price}
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default ProductCatDetailsModal;

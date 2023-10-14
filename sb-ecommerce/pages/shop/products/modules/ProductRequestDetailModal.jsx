import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import Link from 'next/link';
import Rating from '~/components/elements/Rating';

const ProductDetailsModal = ({
    selectedRequest,
    confirmModalVisible,
    onCancel,
    handleConfirmApprove,
}) => {
    return (
        <Modal
            title="Confirm Approval"
            visible={confirmModalVisible}
            onOk={handleConfirmApprove}
            onCancel={onCancel}>
            {selectedRequest && (
                <div className="ps-product">
                    <div className="ps-product__thumbnail">
                        <Link
                            href="/product/[pid]"
                            as={`/product/${selectedRequest.id}`}>
                            <a>
                                <img
                                    src={selectedRequest.images}
                                    alt={selectedRequest.name}
                                />
                            </a>
                        </Link>
                    </div>
                    <div className="ps-product__container">
                        <Link href="/shop">
                            <a className="ps-product__vendor">Young Shop</a>
                        </Link>
                        <div className="ps-product__content">
                            {selectedRequest.name}
                            <div className="ps-product__rating">
                                <Rating />
                                <span>02</span>
                            </div>
                            {selectedRequest.price}
                        </div>
                        <div className="ps-product__content hover">
                            {selectedRequest.name}
                            {selectedRequest.price}
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default ProductDetailsModal;

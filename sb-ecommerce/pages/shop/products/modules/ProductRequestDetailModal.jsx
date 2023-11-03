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
                    <div className="ps-product__container">
                        <Link href="/shop">
                            <a className="ps-product__vendor">
                                {selectedRequest.name}
                            </a>
                        </Link>
                        <div className="ps-product__content">
                            Status: {selectedRequest.status}
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default ProductDetailsModal;

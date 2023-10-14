import React, { useEffect, useState } from 'react';
import { Result, Button, Modal, notification, Form, Input } from 'antd';
import {
    approveProductRequests,
    getProductRequests,
    rejectProductRequests,
} from '~/services/product.service';
import ProductDetailsModal from './ProductRequestDetailModal';

const ProductRequestsLists = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [rejectModalVisible, setRejectModalVisible] = useState(false);
    const [reasons, setReasons] = useState('');
    const [detailsModal, setDetailsModal] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setLoading(true);
                const response = await getProductRequests();
                setRequests(response.results);
            } catch (error) {
                console.error('Error fetching requests:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const handleApprove = (request) => {
        setSelectedRequest(request);
        setConfirmModalVisible(true);
    };

    const handleShowDetails = (request) => {
        setSelectedRequest(request);
        setDetailsModal(true);
    };

    const handleHideDetails = (request) => {
        setSelectedRequest(request);
        setDetailsModal(false);
    };

    const handleConfirmApprove = async () => {
        try {
            if (selectedRequest) {
                await approveProductRequests(selectedRequest.id);
                setRequests(
                    requests.filter(
                        (request) => request.id !== selectedRequest.id
                    )
                );
                notification.success({
                    message: 'Product request approved successfully!!!',
                });
            }
        } catch (error) {
            console.error('Error approving request:', error);

            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                notification.error({
                    message: 'Product Request Failed',
                    description: error.response.data.message,
                });
            } else {
                notification.error({
                    message: 'Product Request Failed',
                    description:
                        'An error occurred while processing your request. Please try again later.',
                });
            }
        } finally {
            setConfirmModalVisible(false);
        }
    };

    const handleReject = (request) => {
        setSelectedRequest(request);
        setRejectModalVisible(true);
    };

    const handleConfirmReject = async () => {
        try {
            if (selectedRequest) {
                await rejectProductRequests(selectedRequest, reasons);
                // You may want to refresh the request list after rejection
                setRequests(
                    requests.filter(
                        (request) => request.id !== selectedRequest.id
                    )
                );
            }
        } catch (error) {
            console.error('Error rejecting request:', error);
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                notification.error({
                    message: 'Product Request Failed',
                    description: error.response.data.message,
                });
            } else {
                notification.error({
                    message: 'Product Request Failed',
                    description:
                        'An error occurred while processing your request. Please try again later.',
                });
            }
        } finally {
            setRejectModalVisible(false);
            setReasons('');
            form.resetFields();
        }
    };

    return (
        <>
            {requests && requests.length > 0 ? (
                <table className="table  ps-table--shopping-cart table-responsive">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th> Merchant</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request.id}>
                                <td>
                                    {request.name}{' '}
                                    <img
                                        style={{ width: '50px' }}
                                        src={request.images}
                                        alt={request.name}
                                    />
                                </td>
                                <td>{request.price}</td>
                                <td>{request.merchantId}</td>
                                <td>{request.status}</td>
                                <td style={{ display: 'flex' }}>
                                    <Button
                                        className="mr-2"
                                        type="primary"
                                        onClick={() =>
                                            handleShowDetails(request)
                                        }>
                                        View Details
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <Result status="warning" title="No product in cart." />
            )}

            <ProductDetailsModal
                confirmModalVisible={detailsModal}
                selectedRequest={selectedRequest}
                handleConfirmApprove={handleApprove}
                onCancel={handleHideDetails}
            />

            <Modal
                title="Confirm Approval"
                visible={confirmModalVisible}
                onOk={handleConfirmApprove}
                onCancel={() => setConfirmModalVisible(false)}>
                Do you want to approve the request for{' '}
                {selectedRequest ? selectedRequest.storeName : ''}?
            </Modal>

            <Modal
                title="Reject Request"
                visible={rejectModalVisible}
                onOk={handleConfirmReject}
                onCancel={() => setRejectModalVisible(false)}>
                <Form form={form}>
                    <Form.Item
                        label="Rejection Reason"
                        name="reasons"
                        rules={[
                            {
                                required: true,
                                message: 'Please provide a rejection reason',
                            },
                        ]}>
                        <Input.TextArea
                            rows={4}
                            value={reasons}
                            onChange={(e) => setReasons(e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Reject Request"
                visible={rejectModalVisible}
                onOk={handleConfirmReject}
                onCancel={() => setRejectModalVisible(false)}>
                <Form form={form}>
                    <Form.Item
                        label="Rejection Reason"
                        name="reasons"
                        rules={[
                            {
                                required: true,
                                message: 'Please provide a rejection reason',
                            },
                        ]}>
                        <Input.TextArea
                            rows={4}
                            value={reasons}
                            onChange={(e) => setReasons(e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ProductRequestsLists;

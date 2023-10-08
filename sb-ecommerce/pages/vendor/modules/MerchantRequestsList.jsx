import React, { useEffect, useState } from 'react';
import { Result, Button, Modal, notification, Form, Input } from 'antd';
import { approveMerchantRequests, getMerchantRequests, rejectMerchantRequests } from '~/services/merchant.service';

const MerchantRequestsLists = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
     const [rejectModalVisible, setRejectModalVisible] = useState(false);
     const [reasons, setReasons] = useState('');
     const [form] = Form.useForm();

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setLoading(true);
                const response = await getMerchantRequests();
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

    const handleConfirmApprove = async () => {
        try {
            if (selectedRequest) {
                await approveMerchantRequests(selectedRequest.id);
                // You may want to refresh the request list after approval
                setRequests(
                    requests.filter(
                        (request) => request.id !== selectedRequest.id
                    )
                );
                notification.success({
                    message: 'Merchant request approved successfully!!!',
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
                    message: 'Merchant Request Failed',
                    description: error.response.data.message,
                });
            } else {
                notification.error({
                    message: 'Merchant Request Failed',
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
              await rejectMerchantRequests(selectedRequest, reasons);
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
                    message: 'Merchant Request Failed',
                    description: error.response.data.message,
                });
            } else {
                notification.error({
                    message: 'Merchant Request Failed',
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
                            <th>Store Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request.id}>
                                <td>
                                    {request.storeName}{' '}
                                    <img
                                        style={{ width: '50px' }}
                                        src={request.logo}
                                        alt={request.storeName}
                                    />
                                </td>
                                <td>{request.email}</td>
                                <td>{request.storePhoneNumber}</td>
                                <td>{request.storeAddress}</td>
                                <td>{request.status}</td>
                                <td style={{ display: 'flex' }}>
                                    <Button
                                        className="mr-2"
                                        type="primary"
                                        onClick={() => handleApprove(request)}>
                                        Approve
                                    </Button>
                                    <Button
                                        danger
                                        onClick={() =>
                                            handleReject(request.id)
                                        }>
                                        Reject
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <Result status="warning" title="No product in cart." />
            )}

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
        </>
    );
};

export default MerchantRequestsLists;

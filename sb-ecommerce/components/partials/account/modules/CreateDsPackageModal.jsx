import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, notification } from 'antd';
import axiosService from '~/repositories/axiosService';

const { Option } = Select;

const CreateDsPackageModal = ({ visible, onCancel, onPackageCreated, customerData }) => {
    const [target, setTarget] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [customTargetInput, setCustomTargetInput] = useState('');

    const [targetOptions, setTargetOptions] = useState([
        'School Fees',
        'House Rent',
        'Building Projects',
        'Shop Rent',
        'Donations',
        'Staff Salaries',
    ]);

    const handleCustomTargetSubmit = () => {
        if (customTargetInput) {
            setTargetOptions([...targetOptions, customTargetInput]);
            setTarget(customTargetInput);
            setCustomTargetInput('');
            setShowModal(false);
        }
    };

    const onFinish = async (values) => {
        try {
            await axiosService.post(`/daily-savings/package`, values);
            notification.open({
                message: 'Package created successfully!',
                duration: 200,
            });
            onPackageCreated();
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                const errorMessage = error.response.data.message;
                notification.error({
                    message: 'Something went wrong. Please try again later.',
                    description: errorMessage,
                    duration: 200,
                });
            } else {
                notification.error({
                    message: 'Something went wrong. Please try again later.',
                    duration: 200,
                });
            }
        }
    };

    return (
        <Modal
            title="Create Package"
            visible={visible}
            onCancel={onCancel}
            footer={null}>
            <Form onFinish={onFinish} layout="vertical">
                <div className="ps-form__content">
                    <Form.Item
                        label="Account Number"
                        name="accountNumber"
                        rules={[
                            {
                                required: true,
                                message: 'Account number is required',
                            },
                        ]}
                        initialValue={customerData?.accountNumber}>
                        <Input
                            type="number"
                            className="form-control"
                            readOnly
                        />
                    </Form.Item>
                    <Form.Item
                        label="Select Target"
                        name="target"
                        rules={[
                            {
                                required: true,
                                message: 'Target is required',
                            },
                        ]}>
                        <Select onChange={(value) => setTarget(value)}>
                            {targetOptions.map((targetOption) => (
                                <Option key={targetOption} value={targetOption}>
                                    {targetOption}
                                </Option>
                            ))}
                            <Option value="custom">Add Custom Target</Option>
                        </Select>
                    </Form.Item>
                    {target === 'custom' && (
                        <Modal
                            visible={showModal}
                            onCancel={() => setShowModal(false)}
                            footer={[
                                <Button
                                    key="cancel"
                                    onClick={() => setShowModal(false)}>
                                    Cancel
                                </Button>,
                                <Button
                                    key="add"
                                    type="primary"
                                    onClick={handleCustomTargetSubmit}>
                                    Add
                                </Button>,
                            ]}>
                            <Input
                                value={customTargetInput}
                                onChange={(e) =>
                                    setCustomTargetInput(e.target.value)
                                }
                            />
                        </Modal>
                    )}
                    <Form.Item
                        label="Amount Per Day"
                        name="amountPerDay"
                        rules={[
                            {
                                required: true,
                                message: 'Amount is required',
                            },
                        ]}>
                        <Input type="number" className="form-control" />
                    </Form.Item>
                    <div className="form-group submit">
                        <button type="submit" className="ps-btn">
                            Save
                        </button>
                    </div>
                </div>
            </Form>
        </Modal>
    );
};

export default CreateDsPackageModal;

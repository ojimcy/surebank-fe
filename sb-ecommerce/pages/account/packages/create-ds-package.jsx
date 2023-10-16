import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Modal, notification } from 'antd';
import { useRouter } from 'next/router';
import axiosService from '~/repositories/axiosService';
import { useAppContext } from '~/context/appContext';
import { useAuth } from '~/context/authContext';
import DashboardLayout from '~/components/layouts/DashboardLayout';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';

const { Option } = Select;

export default function CreatePackage() {
    const { userAccount, setUserAccount } = useAppContext();
    const { currentUser } = useAuth();
    const router = useRouter();
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
    useEffect(() => {
        if (currentUser) {
            const fetchUserAccount = async () => {
                const account = await axiosService.get(
                    `/account/${currentUser.id}`
                );
                setUserAccount(account.data.data);
            };
            fetchUserAccount();
        }
    }, []);

    const onFinish = async (values) => {
        try {
            await axiosService.post(`/daily-savings/package`, values);
            notification.open({
                message: 'Package created successfully!',
                duration: 200,
            });
            router.push(`/account/user-dashboard`);
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

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Create Package',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Create Package">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <DashboardLayout>
                    <Form
                        onFinish={onFinish}
                        className="ps-form--account-setting"
                        layout="vertical">
                        <div className="ps-form__header">
                            <h3>Create Package</h3>
                        </div>
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
                                initialValue={userAccount?.accountNumber}>
                                <Input
                                    type="mumber"
                                    readOnly
                                    className="form-control" placeholder='Account Number'
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
                                <Select
                                    onChange={(value) => setTarget(value)}
                                    className="form-control" placeholder="Select Target">
                                    {targetOptions.map((targetOption) => (
                                        <Option
                                            key={targetOption}
                                            value={targetOption}>
                                            {targetOption}
                                        </Option>
                                    ))}
                                    <Option value="custom">
                                        Add Custom Target
                                    </Option>
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
                                <Input type="number" className="form-control" placeholder='Ampount Per Day'/>
                            </Form.Item>
                            <div className="form-group submit">
                                <button
                                    type="primary"
                                    htmlType="submit"
                                    className="ps-btn">
                                    Save
                                </button>
                            </div>
                        </div>
                    </Form>
                </DashboardLayout>
            </div>
        </PageContainer>
    );
}

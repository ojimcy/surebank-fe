import { Checkbox, Form, Input, notification } from 'antd';
import React, { useState } from 'react';
import { useAuth } from '~/context/authContext';
import { updateProfile } from '~/services/user.service';

const FormChangeUserInformation = () => {
    const [form] = Form.useForm();

    const { currentUser } = useAuth();
    const [changePassword, setChangePassword] = useState(false);

    const handleCheckboxChange = () => {
        setChangePassword(!changePassword);
    };


    const handleSubmit = async (data) => {
        try {
            await updateProfile(data);
            notification.success({
                message: 'Profile updated successfully!',
                duration: 200,
            });
        } catch (error) {
            notification.error({
                message: 'Failed to update profile',
                description: error.message,
                duration: 200,
            });
        }
    };

    return (
        <Form
            className="ps-form--account-setting"
            initialValues={{
                email: currentUser?.email,
                firstName: currentUser?.firstName,
                lastName: currentUser?.lastName,
                phoneNumber: currentUser?.phoneNumber,
                address: currentUser?.address,
            }}
            form={form}
            onFinish={handleSubmit}>
            <div className="ps-form__header">
                <h3>Account Information</h3>
            </div>
            <div className="ps-form__content">
                <div className="form-group">
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}>
                        <Input
                            className="form-control"
                            type="email"
                            placeholder="Email address"
                            defaultValue={currentUser?.email}
                        />
                    </Form.Item>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <Form.Item
                                name="firstName"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input your first name!',
                                    },
                                ]}>
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="First name..."
                                    defaultValue={currentUser?.firstName}
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="form-group">
                            <Form.Item
                                name="lastName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your last name!',
                                    },
                                ]}>
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="Last name..."
                                    defaultValue={currentUser?.lastName}
                                />
                            </Form.Item>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <Form.Item
                                name="phoneNumber"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input your phone number!',
                                    },
                                ]}>
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="Phone number..."
                                    defaultValue={currentUser?.phoneNumber}
                                />
                            </Form.Item>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <Form.Item
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your address!',
                                    },
                                ]}>
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="Address..."
                                    defaultValue={currentUser?.address}
                                />
                            </Form.Item>
                        </div>
                    </div>
                </div>
                {/* Checkbox for changing password */}
                <div className="col-sm-12">
                    <div className="form-group">
                        <Checkbox
                            checked={changePassword}
                            onChange={handleCheckboxChange}>
                            Change Password
                        </Checkbox>
                    </div>
                </div>
                {/* Fields for entering password, new password, and confirm password */}
                {changePassword && (
                    <>
                        <div className="col-sm-12">
                            <div className="form-group">
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your password!',
                                        },
                                    ]}>
                                    <Input.Password
                                        className="form-control"
                                        placeholder="Password..."
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="form-group">
                                <Form.Item
                                    name="newPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please enter new password!',
                                        },
                                    ]}>
                                    <Input.Password
                                        className="form-control"
                                        placeholder="New Password..."
                                    />
                                </Form.Item>
                            </div>
                        </div>
                    </>
                )}

                <div className="form-group submit">
                    <button className="ps-btn">Save</button>
                </div>
            </div>
        </Form>
    );
};

export default FormChangeUserInformation;

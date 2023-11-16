import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Form, Input, notification } from 'antd';
import { useAuth } from '~/context/authContext';
import { useRouter } from 'next/router';

const Register = () => {
    const { currentUser, register } = useAuth();
    const [form] = Form.useForm();

    const router = useRouter();

    useEffect(() => {
        if (currentUser) {
            router.push('/');
        }
    }, [currentUser]);

    const handleSubmit = async (data) => {
        try {
            await register(data);
            notification.success({
                message: 'Signup successfully!',
                duration: 200,
            });
            router.push('/auth/login');
        } catch (error) {
            notification.error({
                message: 'Registeration Failed',
                description: error.message,
                duration: 200,
            });
        }
    };

    return (
        <div className="ps-my-account">
            <div className="container">
                <Form
                    className="ps-form--account"
                    form={form}
                    onFinish={handleSubmit}>
                    <ul className="ps-tab-list">
                        <li>
                            <Link href="/account/login">
                                <a>Login</a>
                            </Link>
                        </li>
                        <li className="active">
                            <Link href="/account/register">
                                <a>Register</a>
                            </Link>
                        </li>
                    </ul>
                    <div className="ps-tab active" id="register">
                        <div className="ps-form__content">
                            <h5>Register An Account</h5>
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
                                    />
                                </Form.Item>
                            </div>
                            <div className="form-group form-forgot">
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
                            <div className="form-group form-forgot">
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
                                    />
                                </Form.Item>
                            </div>
                            <div className="form-group form-forgot">
                                <Form.Item
                                    name="lastName"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your last name!',
                                        },
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        placeholder="Last name..."
                                    />
                                </Form.Item>
                            </div>
                            <div className="form-group form-forgot">
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
                                    />
                                </Form.Item>
                            </div>
                            <div className="form-group form-forgot">
                                <Form.Item
                                    name="address"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your address!',
                                        },
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        placeholder="Address..."
                                    />
                                </Form.Item>
                            </div>
                            <div className="form-group submit">
                                <button
                                    type="submit"
                                    className="ps-btn ps-btn--fullwidth">
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Register;

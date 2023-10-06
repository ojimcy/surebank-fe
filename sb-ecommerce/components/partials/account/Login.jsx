import React, { useEffect, useState } from 'react';
import { Form, Input, notification, Spin } from 'antd';
import Link from 'next/link';
import Router from 'next/router';
import { useAuth } from '~/context/authContext';

const Login = () => {
    const { currentUser, login } = useAuth();
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (currentUser) {
            Router.push('/');
        }
    }, [currentUser]);

    const handleFeatureWillUpdate = (e) => {
        e.preventDefault();
        notification.open({
            message: 'Opp! Something went wrong.',
            description: 'This feature has been updated later!',
            duration: 200,
        });
    };

    const handleLoginSubmit = async (values) => {
        setSubmitting(true);
        try {
            await login(values.username, values.password);
            notification.success({
                message: 'Login Successfull!',
            });
            Router.push('/');
        } catch (error) {
            notification.error({
                message: 'Login Failed',
                description: error.message,
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="ps-my-account">
            <div className="container">
                <Form className="ps-form--account" onFinish={handleLoginSubmit}>
                    <ul className="ps-tab-list">
                        <li className="active">
                            <Link href="/account/login">
                                <a>Login</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/account/register">
                                <a>Register</a>
                            </Link>
                        </li>
                    </ul>
                    <div className="ps-tab active" id="sign-in">
                        <div className="ps-form__content">
                            <h5>Log In Your Account</h5>
                            <div className="form-group">
                                <Form.Item
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your email!',
                                        },
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        placeholder="Username or email address"
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
                                    <Input
                                        className="form-control"
                                        type="password"
                                        placeholder="Password..."
                                    />
                                </Form.Item>
                            </div>
                            <div className="form-group">
                                <div className="ps-checkbox">
                                    <input
                                        className="form-control"
                                        type="checkbox"
                                        id="remember-me"
                                        name="remember-me"
                                    />
                                    <label htmlFor="remember-me">
                                        Rememeber me
                                    </label>
                                </div>
                            </div>
                            <div className="form-group submit">
                                <button
                                    type="submit"
                                    className="ps-btn ps-btn--fullwidth"
                                    disable={submitting}>
                                    {submitting ? (
                                        <Spin tip="Submitting..." />
                                    ) : (
                                        'Login'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;

import React, { useEffect, useState } from 'react';
import { Modal, Form, Select } from 'antd';
import { getBranches } from '~/services/user.service';

const { Option } = Select;

const CreateAccountModal = ({ visible, onCancel, onFinish }) => {
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        const fetchBranches = async () => {
            const response = await getBranches();
            setBranches(response.results);
        };

        fetchBranches();
    }, []);

    return (
        <Modal
            title="Create Account"
            visible={visible}
            onCancel={onCancel}
            footer={null}>
            <Form
                name="createAccount"
                onFinish={onFinish}>
                <div className="form-group">
                    <Form.Item
                        label="Account Type"
                        name="accountType"
                        rules={[
                            {
                                required: true,
                                message: 'Please select an account type!',
                            },
                        ]}>
                        <Select
                            placeholder="Select account type"
                            className="form-control">
                            <Option value="ds">DS Account</Option>
                            <Option value="sb">SB Account</Option>
                        </Select>
                    </Form.Item>
                </div>
                <div className="form-group">
                    <Form.Item
                        label="Branch"
                        name="branchId"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the branch!',
                            },
                        ]}>
                        <Select
                            placeholder="Select account branch"
                            className="form-control">
                            {branches &&
                                branches.map((branch) => (
                                    <Option key={branch.id} value={branch.id}>
                                        {branch.name}
                                    </Option>
                                ))}
                        </Select>
                    </Form.Item>
                </div>
                <div className="form-group submit">
                    <button type="submit" className="ps-btn ps-btn--fullwidth">
                        Create Account
                    </button>
                </div>
            </Form>
        </Modal>
    );
};

export default CreateAccountModal;

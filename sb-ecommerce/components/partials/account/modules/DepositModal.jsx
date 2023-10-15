import React from 'react';
import { Modal, InputNumber } from 'antd';
import { formatNaira } from '~/utilities/formatNaira';

const DepositModal = ({
    visible,
    onCancel,
    dsPackage,
    onDeposit,
}) => {
    return (
        <Modal
            visible={visible}
            title="Deposit"
            onCancel={onCancel}
            onOk={() => onDeposit(dsPackage.amountPerDay)}>
            <div className="d-flex align-items-center flex-column">
                <p>Target: {dsPackage.target}</p>
                <p>Amount Per Day: {formatNaira(dsPackage.amountPerDay)}</p>
                <p>Account Number: {dsPackage.accountNumber}</p>

                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="number"
                                min={dsPackage.amountPerDay}
                                step={dsPackage.amountPerDay}
                                name='amount'
                                placeholder="Amount"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default DepositModal;

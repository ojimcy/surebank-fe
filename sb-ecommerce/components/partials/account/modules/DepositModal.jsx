import React, { useState } from 'react';
import { Modal } from 'antd';
import { formatNaira } from '~/utilities/formatNaira';

const DepositModal = ({ visible, onCancel, dsPackage, onDeposit }) => {
    const [depositAmount, setDepositAmount] = useState('');
    return (
        <Modal
            visible={visible}
            title="Deposit"
            onCancel={onCancel}
            onOk={() => onDeposit(depositAmount)}>
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
                                name="amount"
                                placeholder="Amount"
                                onChange={(e) =>
                                    setDepositAmount(e.target.value)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default DepositModal;

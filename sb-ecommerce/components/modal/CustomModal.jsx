import React from 'react';

const CustomModal = ({ isOpen, onClose, children }) => {
    return (
        <div className={`custom-modal ${isOpen ? 'isOpen' : ''}`}>
            <div className="custom-modal-overlay" onClick={onClose} />
            <div className="custom-modal-content">
                <div className="custom-modal-close" onClick={onClose}>
                    &times;
                </div>
                {children}
            </div>
        </div>
    );
};

export default CustomModal;

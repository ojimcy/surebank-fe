import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

// Custom hook to access the AuthContext
export function useAppContext() {
    return useContext(AppContext);
}

const AppProvider = ({ children }) => {
    const [appError, setAppError] = useState('');
    const [customerData, setCustomerData] = useState({});
    const [packages, setPackages] = useState([]);
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(false);

    return (
        <AppContext.Provider
            value={{
                appError,
                setAppError,
                customerData,
                setCustomerData,
                order,
                setOrder,
                loading,
                setLoading,
                packages,
                setPackages,
            }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };

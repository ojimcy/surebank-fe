import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

// Custom hook to access the AuthContext
export function useAppContext() {
    return useContext(AppContext);
}

const AppProvider = ({ children }) => {
    const [appError, setAppError] = useState('');
    const [userAccount, setUserAccount] = useState({});

    return (
        <AppContext.Provider
            value={{
                appError,
                setAppError,
                userAccount,
                setUserAccount,
            }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };

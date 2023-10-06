import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

// Custom hook to access the AuthContext
export function useAppContext() {
    return useContext(AppContext);
}

const AppProvider = ({ children }) => {
    const [appError, setAppError] = useState('');

    return (
        <AppContext.Provider
            value={{
                setAppError,
            }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };

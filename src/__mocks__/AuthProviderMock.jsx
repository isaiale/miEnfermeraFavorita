import React from 'react';
import { AuthContext } from '../autenticar/AuthProvider';

export const AuthProviderMock = ({ children }) => {
    const mockLogin = jest.fn(); // Mockea la función login
    return (
        <AuthContext.Provider value={{ login: mockLogin }}>
            {children}
        </AuthContext.Provider>
    );
};
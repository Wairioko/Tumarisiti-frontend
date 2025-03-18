import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null); 
    const navigate = useNavigate();
    
    const checkAuthStatus = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_AWS_URL}/api/auth/status`,
                { withCredentials: true }
            );
            
            if (response.data.isAuthenticated) {
                setIsAuthenticated(true);
                // If your API returns user data, you can store it
                if (response.data.user) {
                    setUser(response.data.user);
                }
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (error) {
            console.error("Auth check error:", error);
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const login = async (userData) => {
        try {
            const response = await axios.post(
                "http://localhost:4000/api/company/login",
                userData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            
            if (response.status === 200) {
                await checkAuthStatus(); 
                return true;
            }
            return false;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        }
    };

    const logout = async () => {
        try {
            await axios.post(
                `${process.env.REACT_APP_AWS_URL}/api/auth/logout`, 
                {},
                { withCredentials: true }
            );
            
            setIsAuthenticated(false);
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error("Logout error:", error);
            // Even if the server request fails, clear the local state
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider 
            value={{ 
                isAuthenticated,
                user,
                loading,
                login,
                logout,
                checkAuthStatus,
                setIsAuthenticated
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    
    const checkAuthStatus = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_AWS_URL}/api/auth/status`,
            {
                withCredentials: true
            }
            )
            if (response.data.isAuthenticated) {
                setIsAuthenticated(true)
            } else {
                setIsAuthenticated(false)
            }
            
        } catch (error) {
            console.error(error)
            
            setIsAuthenticated(false)       
        }
    }

    useEffect(() => {
        checkAuthStatus()
    }, [])


    const logout = async () => {

        try {
            await axios.post(`${process.env.REACT_APP_AWS_URL}/api/auth/logout`, {},
            {
                withCredentials: true
            }
            )
            
            setIsAuthenticated(false)
            navigate('/')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <AuthContext.Provider value={{ 
            isAuthenticated,
            logout,
            checkAuthStatus
             }}>
            {children}
        </AuthContext.Provider>
    )
}


import axios from 'axios'
import { useNavigate } from 'react-router-dom';


export const userSignUp = async (userData) => {
    const navigate = useNavigate
    try {
        const response = await axios.post('http://localhost:4000/api/company/registration', userData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,  
        });
        if (response.statusCode === 200) {
            alert('User registered successfully');
            navigate('/login')
            return response.data;
        } else {
            alert('Registration failed');
            return { error: 'Registration failed' };
        }
    } catch (error) {
        alert('An error occurred while registering');
        console.error(error);
        return { error: error.response?.data?.message || 'An unknown error occurred' };
    }
};


const userLogin = async (userData) => {
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

        return response; 
    } catch (error) {
        console.error("Error during user login:", error);
        throw new Error("An error occurred while logging in.");
    }
};

export default userLogin;


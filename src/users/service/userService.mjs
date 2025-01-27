import React from 'react'
import axios from 'axios'


export const userSignUp = async (userData) => {
    try {
        const response = await axios.post('http://localhost:4000/api/company/registration', userData);
        if (response.status === 200) {
            alert('User registered successfully');
            window.location.href = '/login';
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




export const userLogin = async (userData) => {
    try{
        const response = await axios.post('http://localhost:4000/api/company/login', userData)
        if(response.status === 200){
            window.location.href('/')
        }
        else{
            alert('Invalid credentials')
        }
    }catch(error){
        alert('An error occurred while logging in')
        console.error(error)
    }
}

export default userLogin

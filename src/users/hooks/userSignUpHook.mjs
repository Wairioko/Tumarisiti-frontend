import { useState, useEffect} from "react"
import { userSignUp } from '../service/userService.mjs';


const useSignUpHook = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [KRApin, setKRApin] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const userData = { email, password, KRApin, companyName };
        
        const response = await userSignUp(userData);
        
        if (response?.error) {
            setErrorMessage(response.error);
        } else {
            setErrorMessage('');
            window.location.href = '/login';
        }
    };

    return { 
        email, setEmail,
        password, setPassword,
        KRApin, setKRApin,
        companyName, setCompanyName,
        errorMessage, setErrorMessage,
        handleSubmit,
    };
}


 
export default useSignUpHook;


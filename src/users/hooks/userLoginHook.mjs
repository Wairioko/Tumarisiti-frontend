import {useState, useContext} from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../authprovider.mjs";



export const useLoginHook = () => {
    const [KRApin, setKRApin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setIsAuthenticated, login } = useContext(AuthContext);
    const navigate = useNavigate();
    
    
    const LoginUser = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const userData = {
                KRApin: KRApin.trim(),
                password: password.trim(),
            };

            const success = await login(userData);

            if (success) {
                setIsAuthenticated(true);
                navigate("/");
            } else {
                setError("Login failed. Please check your credentials.");
            }
        } catch (err) {
            console.error("Error during login:", err);
            setError("Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return {
        KRApin,
        setKRApin,
        password,
        setPassword,
        error,
        loading,
        LoginUser,
    };
};
import userLogin from "../service/userService.mjs";
import {useState, useEffect} from "react"


export const useLoginHook = () => {
    const [KRApin, setKRApin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const LoginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await userLogin(KRApin, password);
            if (response.statusCode === 200) {
                setError("");
                alert("User registered successfully");
            }
        } catch (err) {
            setError("Login failed. Please check your credentials.");
        }
    };

    return {
        KRApin,
        setKRApin,
        password,
        setPassword,
        error,
        setError,
        LoginUser
    };
};

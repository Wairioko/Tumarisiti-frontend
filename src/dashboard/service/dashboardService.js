import axios from "axios";


export const getInvoices = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_AWS_URL}/api/dashboard`,
            {
            withCredentials: true,
            withXSRFToken: true
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch invoices:", error);
        throw error;
    }
};


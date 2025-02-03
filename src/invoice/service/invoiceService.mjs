import axios from "axios";


export const fileUploadService = async (formData) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_AWS_URL}/api/invoice/upload`, 
            formData, 
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true,
                withXSRFToken: true
            }
        );

        if (response.status === 200) {
            alert("Success, Invoice successfully uploaded");
            return response.data; 
        }
    } catch (error) {
        console.error("Error while uploading invoice", error);
        alert("Error while uploading invoice. Please try again.");
        return { error: error.response?.data?.message || 'An unknown error occurred' };
    }
};

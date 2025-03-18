import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { fileUploadService } from '../service/invoiceService.mjs';


const useUploadInvoiceFile = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [invoicesResult, setInvoicesResult] = useState([])
    const navigate = useNavigate();

    const handleFileUpload = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('file', file);
    
            const response = await fileUploadService(formData); 
    
            if (response && response.batchId) {
                navigate(`/invoices/status?batchId=${response.batchId}`);
            }
        } catch (error) {
            console.error("Error during file upload:", error);
        }
    };
    

    return {
        handleFileUpload,
        file,
        setFile,
        loading,
        setLoading,
        navigate,
    }
}
 
export default useUploadInvoiceFile;


import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { fileUploadService } from '../service/invoiceService.mjs';


const useUploadInvoiceFile = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [invoicesResult, setInvoicesResult] = useState([])
    const navigate = useNavigate();

    const handleFileUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        const response = fileUploadService(formData)
        if( response.status === 200){
            navigate('/check/invoices')
        }
        const batchId = response.data.batchId

        navigate(`/checked/invoices?batchId=${batchId}`)

    }

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


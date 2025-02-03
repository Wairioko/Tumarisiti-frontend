import { useLocation } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';


const CheckedInvoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const batchId = new URLSearchParams(location.search).get("batchId");

    useEffect(() => {
        if (!batchId) return;

        const fetchInvoices = async () => {
            try {
                const response = await axios.get(`/api/invoices?batchId=${batchId}`);
                setInvoices(response.data);

                if (response.data.every(inv => inv.status !== "Pending")) {
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching invoices:", error);
            }
        };

        const interval = setInterval(fetchInvoices, 5000);
        fetchInvoices();
        
        return () => clearInterval(interval);
    }, [batchId]);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Checked Invoices</h2>
            
            {loading && (
                <div className="flex items-center gap-2 text-blue-600 mb-4">
                    <Loader2 className="animate-spin h-5 w-5" />
                    <span>Loading invoices...</span>
                </div>
            )}

            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Invoice Number
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Seller PIN
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {invoices.map((invoice) => (
                            <tr key={invoice.invoiceNumber} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {invoice.invoiceNumber}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {invoice.sellerPin}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {invoice.invoiceAmount}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {invoice.status === "Submitted" ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            ✅ Submitted
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                            ❌ Pending
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CheckedInvoices;
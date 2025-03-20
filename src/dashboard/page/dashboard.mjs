import { Navbar } from "../../home.mjs";
import { useDashboardInvoices } from "../hook/useDashboardInvoices.js";
import { Loader2 } from "lucide-react";
import { useState} from "react"
import dayjs from "dayjs"


const Dashboard = () => {
    const { invoices, loading } = useDashboardInvoices();
    const [selectedBatch, setSelectedBatch] = useState(null);
    const [filter, setFilter] = useState("all");


    // Extract unique batches with creation date
    const uniqueBatches = invoices && invoices.length > 0 
        ? [...new Map(invoices.map(invoice => [invoice.batchId, invoice])).values()]
            .map(invoice => ({
                batchId: invoice.batchId,
                creationDate: dayjs(invoice.creationDate).format("DD-MM-YY")
            }))
        : [];

    // Filter invoices based on selected batch and status
    const filteredInvoices = invoices ? invoices.filter(invoice => {
        // Check batch filter
        if (selectedBatch && invoice.batchId !== selectedBatch) {
            return false;
        }
        
        // Check status filter
        if (filter === "Transmitted" && invoice.invoiceStatus !== "Transmitted") {
            return false;
        }
        if (filter === "Pending" && invoice.invoiceStatus === "Transmitted") {
            return false;
        }
        
        return true;
    }) : [];

    // Calculate overall stats
    const transmittedCount = invoices ? invoices.filter(inv => inv.invoiceStatus === "Transmitted").length : 0;
    const notTransmittedCount = invoices ? invoices.filter(inv => inv.invoiceStatus !== "Transmitted").length : 0;
    const totalCount = transmittedCount + notTransmittedCount;
    
    // Calculate VAT amounts for overall stats
    const transmittedVatAmount = invoices
        ? invoices
            .filter(inv => inv.invoiceStatus === "Transmitted")
            .reduce((acc, inv) => acc + parseFloat(inv.invoiceAmount) * 0.16, 0)
        : 0;

    const notTransmittedVatAmount = invoices
        ? invoices
            .filter(inv => inv.invoiceStatus !== "Transmitted")
            .reduce((acc, inv) => acc + parseFloat(inv.invoiceAmount) * 0.16, 0)
        : 0;

    // Format currency amounts
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'KSH',
            minimumFractionDigits: 2
        }).format(amount);
    };

    // Calculate batch-specific stats when a batch is selected
    const batchStats = selectedBatch && invoices ? (() => {
        const batchInvoices = invoices.filter(inv => inv.batchId === selectedBatch);
        const batchTransmittedCount = batchInvoices.filter(inv => inv.invoiceStatus === "Transmitted").length;
        const batchNotTransmittedCount = batchInvoices.filter(inv => inv.invoiceStatus !== "Transmitted").length;
        const batchTotalCount = batchTransmittedCount + batchNotTransmittedCount;
        
        const batchTransmittedVatAmount = batchInvoices
            .filter(inv => inv.invoiceStatus === "Transmitted")
            .reduce((acc, inv) => acc + parseFloat(inv.invoiceAmount) * 0.16, 0);
        
        const batchNotTransmittedVatAmount = batchInvoices
            .filter(inv => inv.invoiceStatus !== "Transmitted")
            .reduce((acc, inv) => acc + parseFloat(inv.invoiceAmount) * 0.16, 0);
        
        const transmissionPercentage = batchTotalCount > 0 
            ? (batchTransmittedCount / batchTotalCount) * 100 
            : 0;

        return {
            transmittedCount: batchTransmittedCount,
            notTransmittedCount: batchNotTransmittedCount,
            totalCount: batchTotalCount,
            transmittedVatAmount: batchTransmittedVatAmount,
            notTransmittedVatAmount: batchNotTransmittedVatAmount,
            transmissionPercentage: transmissionPercentage
        };
    })() : null;

    // Handle sending emails
    const handleContactSuppliers = async () => {
        const pendingInvoices = invoices ? invoices.filter(inv => inv.invoiceStatus !== "Transmitted") : [];
        // await sendEmailsToSuppliers(pendingInvoices);
        alert("Emails sent to suppliers with pending invoices.");
    };

    // Reset batch selection
    const clearBatchSelection = () => {
        setSelectedBatch(null);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <div className="flex flex-1 p-6 gap-6">
                {/* Left Sidebar - Invoice Uploads */}
                <div className="w-1/4 bg-white p-4 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Invoice Uploads</h3>
                        {selectedBatch && (
                            <button 
                                onClick={clearBatchSelection} 
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                    {uniqueBatches.length > 0 ? (
                        <ul className="space-y-2">
                            {uniqueBatches.map(batch => {
                                // Calculate progress for this batch
                                const batchInvoices = invoices.filter(inv => inv.batchId === batch.batchId);
                                const transmittedCount = batchInvoices.filter(inv => inv.invoiceStatus === "Transmitted").length;
                                const totalCount = batchInvoices.length;
                                const percentage = totalCount > 0 ? (transmittedCount / totalCount) * 100 : 0;
                                
                                return (
                                    <li
                                        key={batch.batchId}
                                        className={`cursor-pointer p-2 rounded text-sm ${
                                            selectedBatch === batch.batchId ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                                        }`}
                                        onClick={() => setSelectedBatch(batch.batchId)}
                                    >
                                        <div className="flex justify-between items-center mb-1">
                                            <span>Batch Upload {batch.creationDate}</span>
                                            <span className="text-xs">{percentage.toFixed(0)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                                            <div 
                                                className={`h-1.5 rounded-full ${selectedBatch === batch.batchId ? "bg-white" : "bg-blue-600"}`}
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500">No batches available</p>
                    )}
                </div>

                {/* Main Content */}
                <div className="w-3/4">
                    {loading ? (
                        <div className="flex items-center gap-2 text-blue-600 mb-4">
                            <Loader2 className="animate-spin h-5 w-5" />
                            <span>Loading invoices...</span>
                        </div>
                    ) : (
                        <>
                            {/* Overall Stats Section */}
                            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                                <h3 className="text-xl font-semibold text-gray-700 mb-4">Overall Invoice Stats</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-gray-100 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500">Invoices Transmitted</p>
                                        <h4 className="text-2xl font-bold text-green-600">{transmittedCount} / {totalCount}</h4>
                                        <p className="text-sm text-gray-500">VAT Transmitted</p>
                                        <h4 className="text-2xl font-bold text-green-600">{formatCurrency(transmittedVatAmount)}</h4>
                                    </div>
                                    <div className="bg-gray-100 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500">Invoices Not Transmitted</p>
                                        <h4 className="text-2xl font-bold text-red-600">{notTransmittedCount} / {totalCount}</h4>
                                        <p className="text-sm text-gray-500">VAT Not Transmitted</p>
                                        <h4 className="text-2xl font-bold text-red-600">{formatCurrency(notTransmittedVatAmount)}</h4>
                                    </div>
                                </div>
                            </div>

                            {/* Batch-specific Stats Section */}
                            {selectedBatch && batchStats && (
                                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                                        Selected Batch Stats - {uniqueBatches.find(b => b.batchId === selectedBatch)?.creationDate}
                                    </h3>
                                    
                                    {/* Progress Bar */}
                                    <div className="mb-4">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-medium text-gray-700">Transmission Progress</span>
                                            <span className="text-sm font-medium text-gray-700">
                                                {batchStats.transmissionPercentage.toFixed(1)}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div 
                                                className="bg-blue-600 h-2.5 rounded-full" 
                                                style={{ width: `${batchStats.transmissionPercentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="bg-gray-100 p-4 rounded-lg">
                                            <p className="text-sm text-gray-500">Invoices Transmitted</p>
                                            <h4 className="text-2xl font-bold text-green-600">
                                                {batchStats.transmittedCount} / {batchStats.totalCount}
                                            </h4>
                                            <p className="text-sm text-gray-500">VAT Transmitted</p>
                                            <h4 className="text-2xl font-bold text-green-600">
                                                {formatCurrency(batchStats.transmittedVatAmount)}
                                            </h4>
                                        </div>
                                        <div className="bg-gray-100 p-4 rounded-lg">
                                            <p className="text-sm text-gray-500">Invoices Not Transmitted</p>
                                            <h4 className="text-2xl font-bold text-red-600">
                                                {batchStats.notTransmittedCount} / {batchStats.totalCount}
                                            </h4>
                                            <p className="text-sm text-gray-500">VAT Not Transmitted</p>
                                            <h4 className="text-2xl font-bold text-red-600">
                                                {formatCurrency(batchStats.notTransmittedVatAmount)}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Filters & Contact Suppliers */}
                            <div className="flex gap-4 mb-4">
                                <button
                                    className={`px-4 py-2 rounded ${filter === "all" ? "bg-gray-600 text-white" : "bg-gray-300"}`}
                                    onClick={() => setFilter("all")}
                                >
                                    All
                                </button>
                                <button
                                    className={`px-4 py-2 rounded ${filter === "Transmitted" ? "bg-green-600 text-white" : "bg-gray-300"}`}
                                    onClick={() => setFilter("Transmitted")}
                                >
                                    ✅ Transmitted
                                </button>
                                <button
                                    className={`px-4 py-2 rounded ${filter === "Pending" ? "bg-red-600 text-white" : "bg-gray-300"}`}
                                    onClick={() => setFilter("Pending")}
                                >
                                    ❌ Pending
                                </button>
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    onClick={handleContactSuppliers}
                                >
                                    📧 Contact Suppliers
                                </button>
                            </div>

                            {/* Invoices Table */}
                            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
                                {filteredInvoices.length > 0 ? (
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Seller Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Seller PIN
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Invoice Number
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
                                            {filteredInvoices.map((invoice) => (
                                                <tr key={invoice.invoiceNumber} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.sellerName}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.sellerPin}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.invoiceNumber}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {formatCurrency(invoice.invoiceAmount)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        {invoice.invoiceStatus === "Transmitted" ? (
                                                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">✅ Transmitted</span>
                                                        ) : (
                                                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded">❌ Pending</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="p-6 text-center text-gray-500">
                                        No invoices found matching the current filters
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;


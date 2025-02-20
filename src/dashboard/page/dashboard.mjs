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
    const uniqueBatches = [...new Map(invoices.map(invoice => [invoice.batchId, invoice])).values()]
        .map(invoice => ({
            batchId: invoice.batchId,
            creationDate: dayjs(invoice.creationDate).format("DD-MM-YY")
        }));

    // Filter invoices based on selected batch and status
    const filteredInvoices = invoices.filter(invoice => {
        if (selectedBatch && invoice.batchId !== selectedBatch) return false;
        if (filter === "Transmitted" && invoice.invoiceStatus !== "Transmitted") return false;
        if (filter === "Pending" && invoice.invoiceStatus === "Transmitted") return false;
        return true;
    });

    // Calculate stats
    const transmittedCount = invoices.filter(inv => inv.invoiceStatus === "Transmitted").length;
    const notTransmittedCount = invoices.filter(inv => inv.invoiceStatus !== "Transmitted").length;
    
    // Calculate VAT amounts correctly (invoiceAmount * 0.16)
    const transmittedVatAmount = invoices
    .filter(inv => inv.invoiceStatus=== "Transmitted")
    .reduce((acc, inv) => acc + inv.invoiceAmount * 0.16, 0);

    const notTransmittedVatAmount = invoices
    .filter(inv => inv.invoiceStatus !== "Transmitted")
    .reduce((acc, inv) => acc + inv.invoiceAmount * 0.16, 0);

    // Handle sending emails
    const handleContactSuppliers = async () => {
        const pendingInvoices = invoices.filter(inv => inv.invoiceStatus !== "Transmitted");
        // await sendEmailsToSuppliers(pendingInvoices);
        alert("Emails sent to suppliers with pending invoices.");
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <div className="flex flex-1 p-6 gap-6">
                {/* Left Sidebar - Invoice Uploads */}
                <div className="w-1/4 bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Invoice Uploads</h3>
                    <ul className="space-y-2">
                        {uniqueBatches.map(batch => (
                            <li
                                key={batch.batchId}
                                className={`cursor-pointer p-2 rounded text-sm ${
                                    selectedBatch === batch.batchId ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                                }`}
                                onClick={() => setSelectedBatch(batch.batchId)}
                            >
                                Batch Upload {batch.creationDate}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Content */}
                <div className="w-3/4">
                    {loading && (
                        <div className="flex items-center gap-2 text-blue-600 mb-4">
                            <Loader2 className="animate-spin h-5 w-5" />
                            <span>Loading invoices...</span>
                        </div>
                    )}

                    {/* Stats Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Invoice Stats</h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">Invoices Transmitted</p>
                                <h4 className="text-2xl font-bold text-green-600">{transmittedCount}</h4>
                                <p className="text-sm text-gray-500">VAT Transmitted</p>
                                <h4 className="text-2xl font-bold text-green-600">{transmittedVatAmount.toFixed(2)}</h4>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">Invoices Not Transmitted</p>
                                <h4 className="text-2xl font-bold text-red-600">{notTransmittedCount}</h4>
                                <p className="text-sm text-gray-500">VAT Not Transmitted</p>
                                <h4 className="text-2xl font-bold text-red-600">{notTransmittedVatAmount.toFixed(2)}</h4>
                            </div>
                        </div>
                    </div>

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
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.invoiceAmount}</td>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

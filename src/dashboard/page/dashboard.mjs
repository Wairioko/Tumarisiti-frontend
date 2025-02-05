import { Navbar } from "../../home.mjs";
import { useDashboardInvoices } from "../hook/useDashboardInvoices.js";
import { Loader2 } from "lucide-react";



const Dashboard = () => {
    const { invoices, loading } = useDashboardInvoices();

   
    const transmittedCount = invoices.filter(invoice => invoice.status === "Transmitted").length;
    const notTransmittedCount = invoices.filter(invoice => invoice.status !== "Transmitted").length;
    
    const transmittedVatAmount = invoices
        .filter(invoice => invoice.status === "Transmitted")
        .reduce((acc, invoice) => acc + invoice.vatAmount, 0);
    
    const notTransmittedVatAmount = invoices
        .filter(invoice => invoice.status !== "Transmitted")
        .reduce((acc, invoice) => acc + invoice.vatAmount, 0);

    return (
        <div className="p-6">
            <Navbar />
            {loading && (
                <div className="flex items-center gap-2 text-blue-600 mb-4">
                    <Loader2 className="animate-spin h-5 w-5" />
                    <span>Loading invoices...</span>
                </div>
            )}

            
            <div className="bg-gray-100 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Invoice Stats</h3>
                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <p className="text-sm text-gray-500">Invoices Transmitted</p>
                        <h4 className="text-2xl font-bold text-green-600">{transmittedCount}</h4>
                        <p className="text-sm text-gray-500">VAT Amount Transmitted</p>
                        <h4 className="text-2xl font-bold text-green-600">{transmittedVatAmount}</h4>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <p className="text-sm text-gray-500">Invoices Not Transmitted</p>
                        <h4 className="text-2xl font-bold text-red-600">{notTransmittedCount}</h4>
                        <p className="text-sm text-gray-500">VAT Amount Pending</p>
                        <h4 className="text-2xl font-bold text-red-600">{notTransmittedVatAmount}</h4>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
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
                        {invoices.map((invoice) => (
                            <tr key={invoice.invoiceNumber} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {invoice.sellerName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {invoice.sellerPin}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {invoice.invoiceNumber}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {invoice.invoiceAmount}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {invoice.status === "Transmitted" ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            ✅ Transmitted
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

export default Dashboard;


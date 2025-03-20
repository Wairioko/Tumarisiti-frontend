import { useState, useEffect } from "react";
import { getInvoices } from "../service/dashboardService";

export const useDashboardInvoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const data = await getInvoices();
                setInvoices(data);
            } catch (error) {
                console.error("Error fetching invoices:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, []);

    return { invoices, loading };
};


// src/InvoiceHistory.js
import React, { useEffect, useState } from 'react';
import { authApi } from '../../../configs/APIs';
import { endpoints } from '../../../configs/APIs';
import { getToken } from '../../../utils/storage';
import SidebarEmployer from '../../../component/SidebarEmployer';

const InvoiceHistory = ({ token }) => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const token = getToken();
                const res = await authApi(token).get(endpoints["invoice_history"]);
                setInvoices(res.data.invoices);
            } catch (error) {
                console.error('Error fetching invoices:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, [token]);

    if (loading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    return (
        <div className="flex h-auto min-h-screen bg-gray-100">
            <SidebarEmployer />
            <div className="container mx-auto p-4">

                <h1 className="text-2xl font-bold mb-10 text-green-700 my-7">LỊCH SỬ HÓA ĐƠN</h1>
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border">Gói Sản Phẩm</th>
                            <th className="py-2 px-4 border">Số Tiền</th>
                            <th className="py-2 px-4 border">Tiền Tệ</th>
                            <th className="py-2 px-4 border">Trạng Thái</th>
                            <th className="py-2 px-4 border">Ngày Thanh Toán</th>
                            <th className="py-2 px-4 border">Email</th>

                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice) => (
                            <tr key={invoice.session_id}>
                                <td className="py-2 px-4 border text-orange-500 text-center">{invoice?.product_item}</td>
                                <td className="py-2 px-4 border text-center">{invoice?.amount_total *100}</td>
                                <td className="py-2 px-4 border text-center">{invoice?.currency}</td>
                                <td className="py-2 px-4 border text-center text-green-700">{invoice.payment_status}</td>
                                <td className="py-2 px-4 border text-center">{new Date(invoice?.payment_date).toLocaleString()}</td>
                                <td className="py-2 px-4 border text-center">{invoice?.customer_email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InvoiceHistory;
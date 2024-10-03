import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '../../../configs/APIs';

const PaymentSuccess = () => {
  const location = useLocation();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchInvoiceDetails = async (sessionId) => {
    const token = localStorage.getItem('authToken');

    try {
      const res = await fetch(`${BASE_URL}/payment_success/?session_id=${sessionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      
      if (res.ok) {
        setInvoice(data);
      } else {
        console.error("Error fetching invoice:", res.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const sessionId = query.get('session_id');

    if (sessionId) {
      fetchInvoiceDetails(sessionId);
    } else {
      setLoading(false);
    }
  }, [location]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-400"></div>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
          <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Cảm ơn bạn đã thanh toán!</h1>
          <p className="text-lg text-center mb-4">
            Giao dịch của bạn đã <span className='text-green-600 font-semibold'>thành công</span>. Bạn sẽ nhận được email xác nhận sớm.
          </p>

          {invoice && (
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4 text-blue-500">Chi tiết hóa đơn</h2>
              <div className="space-y-2">
                <p><strong>Gói:</strong> {invoice.product_item}</p>
                <p><strong>Email khách hàng:</strong> {invoice.customer_email}</p>
                <p><strong>Tổng tiền:</strong> {invoice.amount_total *100} {invoice.currency}</p>
                <p><strong>Trạng thái:</strong> <span className={`font-semibold ${invoice.payment_status === 'Thành công' ? 'text-green-600' : 'text-red-600'}`}>{invoice.payment_status}</span></p>
                <p><strong>Ngày thanh toán:</strong> {new Date(invoice.payment_date).toLocaleString()}</p>


              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;

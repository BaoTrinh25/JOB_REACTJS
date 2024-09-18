import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getToken } from "../../../utils/storage";

const PaymentSuccess = () => {
  const BASE_URL = 'https://baotrinh.pythonanywhere.com';
  const location = useLocation();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchInvoiceDetails = async (sessionId) => {
    const token = getToken();
    try {
      const response = await fetch(`${BASE_URL}/payment_stripe/${sessionId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setInvoice(data);
      } else {
        console.error("Error fetching invoice:", response.statusText);
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
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        invoice && (
          <div className="bg-white p-6 rounded-lg shadow-md m-6">
            <h2 className="text-lg font-bold">Thông tin hóa đơn</h2>
            <p>ID: {invoice.id}</p>
            <p>Người dùng: {invoice.user.username}</p>
            <p>Số tiền: {invoice.amount_total} VNĐ</p>
            <p>Ngày tạo: {invoice.created_at}</p>
          </div>
        )
      )}
    </div>
  );
};

export default PaymentSuccess;
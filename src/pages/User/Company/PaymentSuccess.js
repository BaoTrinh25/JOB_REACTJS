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
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-400"></div>
        </div>
      ) : (
        <div className="flex flex-col mt-20 items-center h-screen">
          <h1 className="text-3xl font-bold mb-4">Thank you for your payment!</h1>
          <p className="text-lg">Your payment was <span className='text-red-600'>successful</span>. You will receive a confirmation email shortly.</p>

          {invoice && (
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4">Invoice Details</h2>
              <p><strong>Invoice ID:</strong> {invoice.id}</p>
              <p><strong>Amount Paid:</strong> {invoice.amount_total} {invoice.currency.toUpperCase()}</p>
              <p><strong>Payment Status:</strong> {invoice.payment_status}</p>
              <p><strong>Payment Date:</strong> {new Date(invoice.payment_date * 1000).toLocaleDateString()}</p>
              <p><strong>Customer Email:</strong> {invoice.customer_email}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
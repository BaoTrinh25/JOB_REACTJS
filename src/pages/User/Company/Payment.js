
import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import QueryString from 'query-string';

const Payment = () => {
    const BASE_URL = 'https://baotrinh.pythonanywhere.com';
    const location = useLocation();
    
    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        // const query = new URLSearchParams(window.location.search);
        const values = QueryString.parse(location.search);
        console.log(values);

        if (values.success) {
            console.log("Order placed! You will receive an email confirmation.");
        }

        if (values.canceled) {
            console.log
            (
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }
    }, []);

    return (
        <section className="flex justify-center flex-col items-center mt-10">
            <div className="product">
                <img
                    src="https://i.imgur.com/EHyR2nP.png"
                    alt="The cover of Stubborn Attachments"
                />
                <div className="description">
                    <h3>Stubborn Attachments</h3>
                    <h5 className="price">đ1,000,000. VNĐ</h5>
                </div>
            </div>
            <form action={`${BASE_URL}/payment-stripe`} method='POST' className="boder-2 bg-green-600 rounded-sm p-1">
                <button type="submit" >
                    Checkout
                </button>
            </form>
        </section>
    );
  
};

export default Payment;


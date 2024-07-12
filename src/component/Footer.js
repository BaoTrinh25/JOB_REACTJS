import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-700 p-4">
      <div className="container mx-auto text-center text-white">
        <div className="mb-4">
          <ul className="flex justify-center space-x-6">
            <li className="hover:text-gray-300">Privacy Policy</li>
            <li className="hover:text-gray-300">Terms of Service</li>
            <li className="hover:text-gray-300">Contact Us</li>
          </ul>
        </div>
        <div>
          <p>&copy; 2024 DTT-JOB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

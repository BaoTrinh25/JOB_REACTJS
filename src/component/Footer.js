import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-teal-900 p-4">
      <div className="container mx-auto text-center text-white">
        <div className="mb-4">
          <ul className="flex justify-center space-x-6">
            <li><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-gray-300">Terms of Service</a></li>
            <li><a href="#" className="hover:text-gray-300">Contact Us</a></li>
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

import React from "react";

const NotificationModal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-auto space-y-4 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800">Thông báo</h2>
        <p className="text-gray-600">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;

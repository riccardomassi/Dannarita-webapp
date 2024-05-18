import React from 'react';

const Popup = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-amber-50 p-10 rounded-lg shadow-lg text-center">
        <p className="text-amber-900 text-2xl">{message}</p>
        <button
          onClick={onClose}
          className="mt-8 px-6 py-2 bg-amber-500 text-white rounded hover:bg-amber-700"
        >
          Chiudi
        </button>
      </div>
    </div>
  );
};

export default Popup;

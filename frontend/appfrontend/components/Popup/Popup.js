import React from 'react';

const Popup = ({ message, onClose, showConferma, handleConferma }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-amber-50 p-10 rounded-lg shadow-lg text-center">
        <p className="text-amber-900 text-2xl">{message}</p>
        <div className='flex flex-row justify-center'>
          {showConferma &&
            <button
              onClick={handleConferma}
              className="mt-8 mr-10 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            >
              Conferma
            </button>}
          <button
            onClick={onClose}
            className="mt-8 px-6 py-2 bg-amber-500 text-white rounded hover:bg-amber-700"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;

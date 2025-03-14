import React from "react";
import { ModalProps } from "../../features/interface";

const Modal: React.FC<ModalProps> = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-gray-900 opacity-50"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between">
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          <button type="button" onClick={onClose}>
            close
          </button>
        </div>

        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

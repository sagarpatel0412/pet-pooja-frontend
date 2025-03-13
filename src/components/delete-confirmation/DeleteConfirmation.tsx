import Modal from "../modal/Modal";

interface DeleteConfirmationProps {
  onConfirm: () => void;
  onClose: () => void;
  isOpen:boolean
}

export default function DeleteConfirmation({
  onConfirm,
  onClose,
  isOpen
}: DeleteConfirmationProps) {
  return (
    <Modal isOpen={isOpen} title={'Delete Expense'} onClose={onClose}>
      <div className="px-6 py-4">
        <p className="text-sm text-gray-600">
          Are you sure you want to delete this expense? This action cannot be
          undone.
        </p>
      </div>

      <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-2">
        <button
          onClick={onClose}
          className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-medium py-2 px-4 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}

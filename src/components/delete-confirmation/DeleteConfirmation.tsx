
interface DeleteConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmation({
  onConfirm,
  onCancel,
}: DeleteConfirmationProps) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">Delete Expense</h3>
        </div>

        <div className="px-6 py-4">
          <p className="text-sm text-gray-600">
            Are you sure you want to delete this expense? This action cannot be
            undone.
          </p>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-2">
          <button
            onClick={onCancel}
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
      </div>
    </div>
  );
}

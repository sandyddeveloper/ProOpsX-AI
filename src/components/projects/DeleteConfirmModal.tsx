import React from "react";

interface DeleteConfirmModalProps {
  projectTitle: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  projectTitle,
  onCancel,
  onConfirm,
}) => (
  <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
    <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 w-full max-w-sm text-center">
      <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
        Delete Project
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
        Are you sure you want to delete <strong>{projectTitle}</strong>?
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default DeleteConfirmModal;

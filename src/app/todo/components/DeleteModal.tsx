import Modal from "@/shared/Modal";
import { Button } from "@/shared/button";

interface DeleteConfirmationModalProps {
  open: boolean;
  close: () => void;
  onConfirm: () => void;
  deleteLoading: boolean;
}

const DeleteConfirmationModal = ({
  open,
  close,
  onConfirm,
  deleteLoading,
}: DeleteConfirmationModalProps) => {
  return (
    <Modal isOpen={open} onClose={close}>
      <h2 className="text-lg">Confirm Deletion</h2>
      <p className="mt-4">
        Are you sure you want to delete this item? This action cannot be undone.
      </p>
      <div className="flex gap-x-4 mt-6">
        <Button
          type="button"
          className="bg-red-600 text-white"
          onClick={onConfirm}
          isLoading={deleteLoading}
          disabled={deleteLoading}
        >
          Confirm
        </Button>
        <Button type="button" className="bg-gray-300" onClick={close}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;

"use client";
import { ConfirmDialogProps } from "@/utils/types";
import * as Dialog from "@radix-ui/react-dialog";

export default function ConfirmDialog({
  isOpen,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onCancel}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <Dialog.Title className="text-lg font-bold text-gray-900">
            Confirm Delete
          </Dialog.Title>
          <Dialog.Description className="text-gray-600 mt-2">
            Are you sure you want to delete this idea? This action cannot be
            undone.
          </Dialog.Description>
          <div className="mt-4 flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Delete
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

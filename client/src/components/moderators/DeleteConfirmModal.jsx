"use client";

import { AlertTriangle, X } from "lucide-react";

export default function DeleteConfirmModal({
  category,
  isOpen,
  onClose,
  onConfirm,
}) {
  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

        {/* Icon + Close */}
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
            <AlertTriangle size={24} />
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#607169] transition hover:bg-[#F5F8F6] hover:text-[#17211D]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="mt-5">
          <h2 className="text-xl font-semibold text-[#17211D]">
            Delete Category?
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#607169]">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-[#17211D]">
              {category.title}
            </span>
            ? This action cannot be undone.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#DCE9E3] px-5 py-2.5 text-sm font-semibold text-[#607169] transition hover:bg-[#F5F8F6]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}
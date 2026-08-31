"use client";

import { CheckCircle, X, AlertCircle } from "lucide-react";

export default function Toast({
  message,
  type = "success",
  onClose,
}) {
  if (!message) return null;

  const isSuccess = type === "success";

  return (
    <div className="fixed right-5 top-5 z-[200] w-[calc(100%-40px)] max-w-sm">
      <div
        className={`flex items-start gap-3 rounded-xl border bg-white p-4 shadow-[0_12px_35px_rgba(0,0,0,0.12)] ${
          isSuccess
            ? "border-[#BFE4D5]"
            : "border-red-200"
        }`}
      >
        <div
          className={`mt-0.5 ${
            isSuccess ? "text-[#087F5B]" : "text-red-600"
          }`}
        >
          {isSuccess ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
        </div>

        <div className="flex-1">
          <p className="text-sm font-semibold text-[#17211D]">
            {isSuccess ? "Success" : "Error"}
          </p>

          <p className="mt-1 text-xs leading-5 text-[#607169]">
            {message}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-[#9AA9A2] transition hover:text-[#17211D]"
        >
          <X size={17} />
        </button>
      </div>
    </div>
  );
}
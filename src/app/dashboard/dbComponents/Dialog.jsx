"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";

function Dialog({ title, onClose, onOk, children }) {
  const [isOpen, setIsOpen] = useState(true);
  const searchParams = useSearchParams();
  const dialogRef = useRef(null);
  const showDialog = searchParams.get("showDialog");
  const router = useRouter();

  useEffect(() => {
    if (isOpen === true) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();

      // Update the search parameter `showDialog` to `n`
      // searchParams.set("showDialog", "n");

      router.push("/dashboard/products");
    }
  }, [showDialog]);

  const closeDialog = () => {
    setIsOpen(false);
    onClose();
  };

  const clickOk = () => {
    onOk();
    closeDialog();
  };

  const dialog = isOpen ? (
    <dialog
      ref={dialogRef}
      className="fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10  rounded-xl backdrop:bg-gray-800/50"
    >
      <div className="w-[500px] max-w-fullbg-gray-200 flex flex-col">
        <div className="flex flex-row justify-between mb-4 pt-2 px-5 bg-yellow-400">
          <h1 className="text-2xl">{title}</h1>
          <button
            onClick={closeDialog}
            className="mb-2 py-1 px-2 cursor-pointer rounded border-none w-8 h-8 font-bold bg-red-600 text-white"
          >
            x
          </button>
        </div>
        <div className="px-5 pb-6">
          {children}
          <div className="flex flex-row justify-end mt-2">
            <button
              onClick={clickOk}
              className="bg-green-500 py-1 px-2 rounded border-none"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </dialog>
  ) : null;

  return dialog;
}

export default Dialog;

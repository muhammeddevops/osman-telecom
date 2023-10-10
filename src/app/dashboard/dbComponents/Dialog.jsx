"use client";

import { Button, Modal } from "flowbite-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useRef, useEffect } from "react";

function Dialog({ title, onClose, onOk, children }) {
  const searchParams = useSearchParams();
  const dialogRef = useRef(null);
  const showDialog = searchParams.get("showDialog");
  const router = useRouter();

  const openStatus = searchParams.get("open");

  useEffect(() => {
    if (openStatus === "true") {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();

      router.push("/dashboard/products");
    }
  }, [showDialog, openStatus]);

  const closeDialog = () => {
    router.push("/dashboard/products");
    onClose();
  };

  const clickOk = () => {
    onOk();
    closeDialog();
  };

  return (
    <Modal
      show={openStatus === "true"}
      onClose={() => router.push("/dashboard/products")}
      ref={dialogRef}
      className="
      fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10  rounded-xl backdrop:bg-gray-800/50
      "
    >
      <div className="w-[500px] max-w-md">
        <Modal.Header className="flex flex-row mb-4 pr-5 pt-5 rounded-xl bg-gray-100">
          <h1 className="text-2xl font-extrabold ml-3 mb-3 text-red-600">
            {title}
          </h1>
        </Modal.Header>
        <Modal.Body className="px-5 pb-6">
          {children}
          <div className="flex flex-row justify-end mt-2">
            <Button
              onClick={clickOk}
              className="bg-green-500 py-1 px-3 rounded border-none mt-2"
            >
              Add Product
            </Button>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default Dialog;

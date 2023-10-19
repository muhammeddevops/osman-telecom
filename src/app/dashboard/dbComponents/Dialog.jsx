"use client";

import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSearchParams, useRouter } from "next/navigation";
import { useRef, useEffect } from "react";

function Dialog({ title, opened, close, children }) {
  const searchParams = useSearchParams();
  const dialogRef = useRef(null);
  const showDialog = searchParams.get("showDialog");
  const router = useRouter();
  // const [opened, { open, close }] = useDisclosure(false);

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
    <div className="flex">
      <Modal opened={opened} onClose={close} title="Add a product" size={"lg"}>
        <Modal.Body className="px-5 pb-6">
          {children}
          <div className="flex flex-row justify-end mt-2">
            <Button
              onClick={clickOk}
              color="green"
              className="py-1 px-3 rounded border-none mt-2"
            >
              Add Product
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Dialog;

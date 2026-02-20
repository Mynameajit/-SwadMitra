import { useState } from "react";

const useAddressDialog = () => {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const openAdd = () => {
    setEditData(null);
    setOpen(true);
  };

  const openEdit = (address) => {
    setEditData(address);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setEditData(null);
  };

  return { open, editData, openAdd, openEdit, closeDialog };
};

export default useAddressDialog;

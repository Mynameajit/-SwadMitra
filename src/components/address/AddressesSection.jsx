import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { AddressCard } from "./AddressCard";
import { useEffect, useState } from "react";
import AddressDialog from "./AddressDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  deleteAddress,
  fetchAddress,
  updateAddress,
  updateDefaultAddress,
} from "../../features/address/addressService";
import { FaStoreAltSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const AddressesSection = ({ isShowDelete = true }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addresses, loading } = useSelector((state) => state.address);

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectAddressData, setSelectAddressData] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    dispatch(fetchAddress());
  }, [dispatch]);

  const openDialog = () => {
    setIsEdit(false);
    setSelectAddressData(null);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setSelectAddressData(null);
    setIsEdit(false);
  };

  const onEdit = (address) => {
    setSelectAddressData(address);
    setIsEdit(true);
    setOpen(true);
  };

  const onDelate = async (address) => {
    setDeletingId(address._id);
    await dispatch(deleteAddress({ addressId: address._id })).unwrap();
    dispatch(fetchAddress());
    setDeletingId(null);
  };

  const onSubmitAddress = async (formData) => {
    try {
      if (isEdit) {
        await dispatch(
          updateAddress({
            addressId: selectAddressData._id,
            addressData: formData,
          }),
        ).unwrap();
      } else {
        await dispatch(addAddress(formData)).unwrap();
      }

      onClose();
      dispatch(fetchAddress());
      setSelectAddressData(null);
    } catch (error) {
      console.log("Address submit error:", error);
    }
  };

  const onSelectedDefaultAdd = async (addressId) => {
    try {
      await dispatch(updateDefaultAddress({ addressId })).unwrap();
      dispatch(fetchAddress());
      setSelectAddressData(null);
    } catch (error) {
      console.log("Default address update failed:", error);
    }
  };

  return (
    <Stack
      marginX="auto"
      width={{ xs: "100%", md: isShowDelete? "90%":"100%" }}
      gap={2}
      sx={{
        py: 3,
        borderRadius: 4,
        textAlign: "center",
        px: { xs: 0, md:isShowDelete?8:1},
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        mb={2}
        gap={2}
      >
        <Typography variant="h5" sx={{ fontWeight: "800" }} color="#FF1100">
          
          🏠 Addresses
        </Typography>

        {isShowDelete ? (
          <Button
            onClick={openDialog}
            sx={{
              bgcolor: "#FF1100",
              color: "white",
              fontSize: ".75rem",
              textTransform: "capitalize",
              borderRadius: ".7rem",
              "&:hover": { bgcolor: "#E01000" },
            }}
          >
            + Add Address
          </Button>
        ) : (
          <Button
            onClick={() => navigate("/profile")}
            
            sx={{
              bgcolor: "#FF1100",
              color: "white",
              fontSize: ".85rem",
              textTransform: "capitalize",
              mr:{xs:0,md:"9%"},
              borderRadius: ".7rem",
              "&:hover": { bgcolor: "#E01000" },
            }}
          >
            Manage Address
          </Button>
        )}
      </Stack>

      {/* Content */}
      {loading?.get ? (
        <Stack py={6} alignItems="center" spacing={1}>
          <CircularProgress />
          <Typography>Loading addresses...</Typography>
        </Stack>
      ) : Array.isArray(addresses) && addresses.length > 0 ? (
        <Stack
          direction={{ xs: "column", md: "row" }}
          gap={4}
          sx={{ flexWrap: "wrap" }}
        >
          {addresses?.filter((addr)=>{
            if (!isShowDelete) {
              return addr.isDefault===true
            }
            return true
          })
          .map((address, i) => (
            <AddressCard
              key={address?._id || i}
              address={address}
              onEdit={onEdit}
              loading={loading}
              onselectend={onSelectedDefaultAdd}
              onDelate={onDelate}
              deletingId={deletingId}
              isShowDelete={isShowDelete}
              
            />
          ))}
        </Stack>
      ) : (
        <NotFoundUI />
      )}

      {/* Dialog */}
      {open && (
        <AddressDialog
          open={open}
          onClose={onClose}
          editData={selectAddressData}
          loading={isEdit ? loading?.edit : loading?.add}
          onSubmit={onSubmitAddress}
          isEdit={isEdit}
        />
      )}
    </Stack>
  );
};

const NotFoundUI = () => (
  <Stack
    py={8}
    alignItems="center"
    spacing={1.5}
    sx={{
      borderRadius: 3,
      border: "1px dashed rgba(255,17,0,0.35)",
      background: "rgba(255,17,0,0.04)",
    }}
  >
    <FaStoreAltSlash size={42} />
    <Typography fontWeight={900}>No Address Found</Typography>
    <Typography sx={{ opacity: 0.7 }} variant="body2">
      Please add a new address to continue.
    </Typography>
  </Stack>
);

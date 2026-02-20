import { Dialog, Stack, useMediaQuery, useTheme } from "@mui/material";
import AddressForm from "./AddressForm";

const AddressDialog = ({
  open,
  onClose,
  editData,
  loading,
  onSubmit,
  isEdit,
}) => {
  const theme = useTheme();
 const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      fullWidth={!isMobile}
      maxWidth="md"
      BackdropProps={{
        sx: {
          backdropFilter: "blur(8px)",
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(0,0,0,0.6)"
              : "rgba(0,0,0,0.3)",
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: "1rem",
          background:
            theme.palette.mode === "dark"
              ? "rgba(0,0,0,0.85)"
              : "rgba(255,255,255,0.85)",
               width: isMobile ? "100%" : "100%",
                height: isMobile ? "100%" : "auto",
                margin: isMobile ? 0 : "auto"
        },
      }}
    >
      <Stack >
        <AddressForm
          onSubmit={onSubmit}
          editData={editData}
          onClose={onClose}
          loading={loading}
          isEdit={isEdit}
        />
      </Stack>
    </Dialog>
  );
};

export default AddressDialog;

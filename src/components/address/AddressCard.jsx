import { Delete, Edit } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect } from "react";
import { CiStar } from "react-icons/ci";
import { deliveryAddress } from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";

export const AddressCard = ({
  address,
  onEdit,
  onDelate,
  onselectend,
  loading,
  deletingId,
  isShowDelete = true,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const isDefault = Boolean(address?.isDefault);
  const isDeletingThisCard = Boolean(
    loading?.delate && deletingId === address?._id,
  );

  useEffect(() => {
    if (!isShowDelete) {
      dispatch(deliveryAddress(address));
    }
  }, []);

  return (
    <Stack
      direction="column"
      sx={{
        p: 2,
        width: { xs: "100%", sm: isShowDelete ? "26rem" : "91%" },
        borderRadius: 3,
        position: "relative",
        background:
          theme.palette.mode === "light"
            ? "rgba(255,255,255,0.05)"
            : "rgba(0,0,0,0.05)",
        backdropFilter: "blur(6px)",
        boxShadow: { xs: 1, md: 2 },
        justifyContent: "start",
        alignItems: "start",

        border: isDefault ? "1px solid #FF1100" : "1px solid transparent",
        transition: "0.2s ease",
      }}
    >
      {/* Title Row */}
      <Stack direction="row" gap={1} sx={{ width: "100%" }}>
        <Typography
          fontWeight={900}
          noWrap
          sx={{
            textTransform: "capitalize",
            color: "#FF1100",
            fontSize: "1.2rem",
          }}
        >
          {address?.name || "No Name"}
        </Typography>

        <Typography
          sx={{
            backgroundColor: "rgba(255,17,0,0.1)",
            padding: "0px 6px",
            fontSize: 12,
            borderRadius: 1,
            color: "#FF1100",
            fontWeight: 700,
            textTransform: "capitalize",
            display: "flex",
            alignItems: "center",
          }}
        >
          {address?.isLocation || "Home"}
        </Typography>

        {/* ✅ Default Badge */}
        {isDefault && (
          <Typography
            sx={{
              ml: "auto",
              fontSize: 12,
              fontWeight: 800,
              padding: "2px 8px",
              borderRadius: 999,
              background: "rgba(34,197,94,0.15)",
              color: "#22c55e",
            }}
          >
            ✅ Default
          </Typography>
        )}
      </Stack>

      {/* Address */}
      <Typography sx={{ fontSize: 14, color: "gray", mt: 1 }}>
        {address?.buildingName || "Building"}, {address?.landmark || "Landmark"}
      </Typography>

      <Typography sx={{ fontSize: 14, color: "gray" }}>
        {address?.city || "City"}, {address?.state || "State"} -{" "}
        {address?.pinCode || "000000"}
      </Typography>

      <Typography sx={{ fontSize: 14, mt: 0.5 }}>
        📞 {address?.mobile || "0000000000"}
      </Typography>

      {/* Buttons */}
      <Stack direction="row" mt={2} gap={2}>
        <Button
          onClick={() => onEdit?.(address)}
          sx={{
            border: "1px solid #FF1100",
            color: "#FF1100",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: "600",
            padding: "3px 10px",
            textTransform: "none",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            "&:hover": { boxShadow: "1px 1px 10px 1px rgba(255,17,0,0.5)" },
          }}
        >
          <Edit sx={{ fontSize: 20 }} />
          Edit
        </Button>

        {isShowDelete && (
          <Button
            onClick={() => onselectend?.(address?._id)}
            disabled={isDefault}
            sx={{
              border: "1px solid #FF1100",
              color: isDefault ? "#fff" : "#FF1100",
              borderRadius: "10px",
              fontSize: "15px",
              padding: "3px 10px",
              textTransform: "none",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              "&:hover": {
                boxShadow: isDefault
                  ? "none"
                  : "1px 1px 10px 1px rgba(255,17,0,0.5)",
              },

              "&.Mui-disabled": {
                color: "#fff",
                borderColor: "#FF1100",
                backgroundColor: "#FF1100",
                opacity: 0.75,
                cursor: "not-allowed",
              },
            }}
          >
            <CiStar size={22} />
            {isDefault ? "Default" : "Set Default"}
          </Button>
        )}
      </Stack>

      {/* Delete Icon Button */}
      {isShowDelete && (
        <IconButton
          onClick={() => onDelate?.(address)}
          size="small"
          disabled={isDeletingThisCard} // ✅ no double click
          sx={{
            color: "#FF1100",
            height: "2.5rem",
            width: "2.5rem",
            position: "absolute",
            bottom: 3,
            right: 3,
            background: "rgba(255,17,0,0.08)",
            "&:hover": {
              background: "rgba(255,17,0,0.14)",
            },
          }}
        >
          {isDeletingThisCard ? (
            <CircularProgress size={20} sx={{ color: "#FF1100" }} />
          ) : (
            <Delete />
          )}
        </IconButton>
      )}
    </Stack>
  );
};

import { Chip } from "@mui/material";

const statusColor = (status) => {
  switch (status) {
    case "Pending":
      return "warning";
    case "Accepted":
      return "info";
    case "Preparing":
      return "secondary";
    case "Out For Delivery":
      return "primary";
    case "Delivered":
      return "success";
    case "Cancelled":
      return "error";
    default:
      return "default";
  }
};

const OrderStatusChip = ({ status }) => {
  return (
    <Chip
      label={status}
      color={statusColor(status)}
      sx={{ fontWeight: 600 }}
    />
  );
};

export default OrderStatusChip;

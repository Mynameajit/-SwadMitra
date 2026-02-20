import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../features/address/addressService";
import AddressForm from "../../components/address/AddressForm";
import { useNavigate } from "react-router-dom";

const ShippingAddressPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.address);

  const handleSubmit = async (formData) => {
    try {
      await dispatch(addAddress(formData)).unwrap();
      navigate("/checkout");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AddressForm
      onSubmit={handleSubmit}
      loading={loading.add}
      isDialog={false}
      showBack
    />
  );
};

export default ShippingAddressPage;

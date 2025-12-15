import React, { useState } from 'react'
import { Button, CircularProgress, IconButton, Input, Stack, Typography, useTheme } from '@mui/material'
import { Fastfood, Restaurant, Save } from '@mui/icons-material'
import AddShopInput from './Input'
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';
import { backendURL } from '../../App';
import { setMyShopData } from '../../redux/ownerSlice';


const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay },
    }),
};

const MotionSaveButton = motion(Button);
const MotionLogo = motion(Stack);

const AddShop = () => {
    const theme = useTheme()
    const { currentCity, currentState, currentAddress } = useSelector(state => state.user)
    const { myShopData } = useSelector(state => state.owner)
    const dispatch = useDispatch()

    const [name, setName] = useState(myShopData?.name || "")
    const [mobile, setMobile] = useState(null)
    const [state, setState] = useState(myShopData?.city || currentCity)
    const [city, setCity] = useState(myShopData?.state || currentState)
    const [pinCode, setPinCode] = useState(myShopData?.pinCode || "")
    const [image, setImage] = useState(myShopData?.image || null)
    const [address, setAddress] = useState(myShopData?.address || currentAddress)

    const [frontendImage, setFrontendImage] = useState(null)
    const [loading, setLoading] = useState(false)


    const handleImage = (e) => {
        const file = e.target.files[0]
        setImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }

    const handleSaveShop = async () => {
        if (!name || !mobile || !city || !state || !pinCode || !image || !address) {
            return toast.error("All fields are required");
        }

        try {
            setLoading(true)
            const formData = new FormData();
            formData.append("name", name);
            formData.append("mobile", mobile);
            formData.append("city", city);
            formData.append("state", state);
            formData.append("pinCode", pinCode);
            formData.append("address", address);
            formData.append("image", image); // ✅ no need for if check, already validated above

            const res = await axios.post(`${backendURL}/shop/create`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data", // ✅ this line is important!
                },
            });
            toast.success(res.data.message);
            dispatch(setMyShopData(res.data.shop));
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log("shop create error", error);
            toast.error(error.response?.data?.message || "Internal server error");
        }
    };


    return (
        <Stack minHeight={"100vh"} width={"100%"} justifyContent={"center"} alignItems={"center"}>

            <Stack
                width={{ xs: "100%", md: "450px" }}
                height={"100%"}
                minHeight={"600px"}
                borderRadius={"1rem"}
                p={4}
                sx={{
                    background: theme.palette.mode === "dark"
                        ? "rgba(0,0,0,0.2)"
                        : "rgba(255,255,255,0.2)",
                    boxShadow: "0 8px 32px 0 rgba(31,38,125,0.4)",

                }}
            >
                {/* logo */}
                <MotionLogo
                    initial="hidden"
                    animate="visible"
                    custom={.2}
                    variants={containerVariants}
                    gap={1} direction={"column"} width={"100%"} alignItems={"center"}>
                    <Stack sx={{ bgcolor: "rgba(255, 17, 0, .05)", height: "4.2rem", width: "4.4rem", padding: 1, borderRadius: "100%", alignItems: "center", justifyContent: "center" }}>
                        <Restaurant sx={{
                            fontSize: "3.2rem",
                            color: "#FF1100"
                        }} />
                    </Stack>
                    <Typography sx={{ fontWeight: "700", color: "#FF1100" }}
                        textAlign={"center"} variant='h5'>Add Shop</Typography>

                </MotionLogo>

                <Stack gap={2} direction={"column"} width={"100%"} alignItems={"center"}>

                    <Stack width={"100%"} gap={1} sx={{}}>
                        <AddShopInput
                            label={"Name:"}
                            placeholder={"Enter your name"}
                            type={"text"}
                            width='100%'
                            custom={0.3}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Stack>

                    <Stack width={"100%"} gap={1} sx={{}}>
                        <AddShopInput
                            label={"Mobile No:"}
                            placeholder={"Enter your Mobile no"}
                            type={"number"}
                            width='100%'
                            custom={0.4}
                            value={mobile}
                            isMobileNo={true}
                            onChange={(e) => setMobile(e.target.value)}
                        />
                    </Stack>

                    <Stack direction={"row"} width={"100%"} gap={1} sx={{}}>
                        <AddShopInput
                            label={"City:"}
                            placeholder={"Enter your City"}
                            type={"text"}
                            width='50%'
                            custom={0.6}
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <AddShopInput
                            label={"State:"}
                            placeholder={"Enter your State"}
                            type={"text"}
                            width='50%'
                            custom={0.6}
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </Stack>

                    <Stack direction={"row"} alignItems={"flex-end"} width={"100%"} gap={1} sx={{}}>
                        <AddShopInput
                            label={"Pin Code:"}
                            placeholder={"Enter Pin Code"}
                            type={"text"}
                            width='50%'
                            custom={0.8}
                            value={pinCode}
                            onChange={(e) => setPinCode(e.target.value)}
                        />

                        <InputFileUpload
                            onChange={handleImage}
                            custom={0.8} 
                            label='Shop Image'
                            />

                    </Stack>

                    {
                        frontendImage && (
                            <Stack width={"100%"} gap={1} borderRadius={"8px"}>
                                Your shop image:
                                <img style={{
                                    borderRadius: "8px",
                                    opacity:"1"
                                }} src={frontendImage} width={"100%"} alt="" />
                            </Stack>
                        )
                    }


                    <Stack width={"100%"} gap={1} sx={{}}>
                        <AddShopInput
                            label={"Address:"}
                            placeholder={"Enter your Address"}
                            type={"text"}
                            width='100%'
                            custom={1}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Stack>

                    <Stack mt={2} width={"100%"} gap={1} sx={{}}>

                        <MotionSaveButton
                            onClick={handleSaveShop}
                            initial="hidden"
                            animate="visible"
                            custom={1.2}
                            variants={containerVariants}
                            variant="contained"
                            disabled={loading}
                            sx={{
                                height: "100%",
                                padding: 1.3,
                                width: "100%",
                                bgcolor: "#FF1100",
                                color: "white",
                                fontSize: "12px",
                                borderRadius: "8px",
                                gap: 2

                            }}
                        >
                            {
                                loading ? <CircularProgress size={22} sx={{color:'#FF1100'}}/> : ""
                            }
                            {
                                loading ? <Typography
                                    sx={{
                                        color: "#FF1100",
                                        textTransform: "none",
                                        fontSize: "16px",
                                        fontWeight: "600"
                                    }} >
                                    Shop Creating....
                                </Typography> : "Create Shop"
                            }
                        </MotionSaveButton>
                    </Stack>


                </Stack>



            </Stack>

        </Stack>
    )
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
const MotionButton = motion(Button);
const MotionTypography = motion(Typography);

export const InputFileUpload = ({ custom = 0.3, label = "Image", onChange }) => {
  return (
    <Stack width="50%" spacing={"2px"}>
      {/* Label */}
      <MotionTypography
        initial="hidden"
        animate="visible"
        custom={custom - 0.05}
        variants={containerVariants}
        variant="body2"
        fontWeight={500}
      >
        {label}
      </MotionTypography>

      {/* Upload Button */}
      <MotionButton
        initial="hidden"
        animate="visible"
        custom={custom}
        variants={containerVariants}
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        sx={{
          height: "100%",
          padding: 1,
          width: "100%",
          bgcolor: "#FF1100",
          color: "white",
          fontSize: "12px",
          textTransform: "none",
          borderRadius: "8px",
          "&:hover": { bgcolor: "#e00e00" },
        }}
      >
        Upload Image
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          onChange={onChange}
          multiple
        />
      </MotionButton>
    </Stack>
  );
};
export default AddShop




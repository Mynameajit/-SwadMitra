import React, { useState } from 'react'
import { Button, CircularProgress, IconButton, Input, Stack, Typography, useTheme } from '@mui/material'
import { Close, Restaurant, Save } from '@mui/icons-material'
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
const MotionIcon = motion(IconButton);

const EditShop = ({ isEdit, setIsEdit }) => {
    const theme = useTheme()
    const { userData, currentCity, currentState, currentAddress } = useSelector(state => state.user)
    const { myShopData } = useSelector(state => state.owner)
    const dispatch = useDispatch()

    const [name, setName] = useState(myShopData?.name || "")
    const [mobile, setMobile] = useState(myShopData?.mobile || null)
    const [state, setState] = useState(myShopData?.city || currentCity)
    const [city, setCity] = useState(myShopData?.state || currentState)
    const [pinCode, setPinCode] = useState(myShopData?.pinCode || "")
    const [image, setImage] = useState(myShopData?.image || null)
    const [address, setAddress] = useState(myShopData?.address || currentAddress)

    const [frontendImage, setFrontendImage] = useState(myShopData?.image || null)
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

        <Stack
            width={{ xs: "100%", md: "100%" }}
            height={{ xs: "150%", md: "37rem" }}
            p={"1rem 3rem"}
            paddingBottom={{ xs: "5rem", md: ".5rem" }}
            sx={{
                background: theme.palette.mode === "dark"
                    ? "rgba(0,0,0,0.02)"
                    : "rgba(255,255,255,0.4)",
                overflowY: "scroll",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                    display: "none"
                }

            }}

        >

            {/* close btn */}
            <MotionIcon
                onClick={() => setIsEdit(false)}
                initial="hidden"
                animate="visible"
                custom={.2}
                variants={containerVariants}
                sx={{
                    position: "absolute",
                    top: 3,
                    right: 3,
                    boxShadow: "0px 0px 1px .5px #FF1100"

                }}
            >
                <Close sx={{ color: "#FF1100", fontWeight: "bold" }} />

            </MotionIcon>




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
                    textAlign={"center"} variant='h5'>Edit Shop Details</Typography>

            </MotionLogo>

            <Stack gap={2} direction={"column"} width={"100%"} alignItems={"center"}>

                <Stack direction={"row"} width={"100%"} gap={1} sx={{}}>
                    <AddShopInput
                        label={"UserName:"}
                        placeholder={"Enter your UserName"}
                        type={"text"}
                        width='50%'
                        custom={0.2}
                        value={userData?.fullName}
                        onlyRed={true}

                    // onChange={(e) => setCity(e.target.value)}
                    />
                    <AddShopInput
                        label={"Email:"}
                        placeholder={"Enter your Email"}
                        type={"text"}
                        width='50%'
                        custom={0.2}
                        value={userData?.email}
                        onlyRed={true}

                    // onChange={(e) => setState(e.target.value)}
                    />
                </Stack>


                <Stack width={"100%"} gap={1} sx={{}}>
                    <AddShopInput
                        label={"Shop Name:"}
                        placeholder={"Enter your Shop Name"}
                        type={"text"}
                        width='100%'
                        custom={0.3}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Stack>

                <Stack width={"100%"} gap={1} sx={{}}>
                    <AddShopInput
                        onlyRed={true}
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
                                opacity: "1"
                            }} src={frontendImage} width={"100%"} height={"280px"} alt="" />
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

                <Stack mt={2} width={"100%"} gap={1} sx={{paddingBottom:4}}>

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
                            loading ? <CircularProgress size={22} sx={{ color: '#FF1100' }} /> : ""
                        }
                        {
                            loading ? <Typography
                                sx={{
                                    color: "#FF1100",
                                    textTransform: "none",
                                    fontSize: "16px",
                                    fontWeight: "600"
                                }} >
                                Shop Details Updating....
                            </Typography> : "Update Shop Details"
                        }
                    </MotionSaveButton>
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
export default EditShop




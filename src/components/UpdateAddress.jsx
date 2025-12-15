import { Button, CircularProgress, IconButton, Input, Stack, Typography, useTheme } from '@mui/material'
import { ArrowBack, Business, Close, Fastfood, Home, Restaurant, Save } from '@mui/icons-material'
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';
import AddShopInput from '../components/owner/Input';
import { backendURL } from '../App';
import { useState } from 'react';
import { setMyShopData } from '../redux/ownerSlice';
import { FaAddressBook } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../redux/userSlice';


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
const MotionIconButton = motion(IconButton);
const MotionStack = motion(Stack);

const UpdateAddress = ({ address, isEdit, setIsEdit }) => {
    const theme = useTheme()
    const Navigate = useNavigate()
    const dispatch = useDispatch()

    const [name, setName] = useState(address?.name || "")
    const [mobile, setMobile] = useState(address?.mobile || null)
    const [state, setState] = useState(address?.state || "")
    const [city, setCity] = useState(address?.city || "")
    const [pinCode, setPinCode] = useState(address?.pinCode || "")
    const [buildingName, setBuildingName] = useState(address?.buildingName || "")
    const [landMark, setLandMark] = useState(address?.landmark || "")
    const [isLocation, setIsLocation] = useState(address?.isLocation || "home")

    const [loading, setLoading] = useState(false)



    const handleUpdateAddress = async () => {
        if (!name || !mobile || !city || !state || !pinCode || !isLocation || !buildingName) {
            return toast.error("All fields are required");
        }

        try {
            setLoading(true)
            const formData = {
                name,
                mobile,
                city,
                state,
                buildingName,
                pinCode,
                landMark,
                isLocation
            }

            const res = await axios.post(`${backendURL}/user/address/update/${address?._id}`, formData, {
                withCredentials: true,

            });
            toast.success(res.data.message);
            dispatch(setUserData(res.data.user));            
            setLoading(false)
            setIsEdit(false)
        } catch (error) {
            setLoading(false)
            console.log("Add Address error", error);
            toast.error(error.response?.data?.message || "Internal server error");
        }
    };


    return (
        <Stack overflow={"hidden"} width={"100%"} justifyContent={"center"} alignItems={"center"}>

            <Stack
                width={{ xs: "100%", md: "550px" }}
                height={"100%"}
                borderRadius={"1rem"}
                px={4}
                py={4}
                sx={{
                    background: theme.palette.mode === "dark"
                        ? "rgba(0,0,0,0.2)"
                        : "rgba(255,255,255,0.2)",
                    boxShadow: "0 8px 32px 0 rgba(31,38,125,0.4)",
                    position: "relative"

                }}
            >

                <MotionIconButton
                    initial="hidden"
                    animate="visible"
                    custom={.1}
                    variants={containerVariants}
                    sx={{
                        position: "absolute",
                        top: 20,
                        right: 15
                    }}
                    onClick={() => setIsEdit(false)}
                >
                    <Close sx={{ fontSize: "3rem,", color: "#FF1100" }} />
                </MotionIconButton>

                {/* logo */}
                <MotionLogo
                    initial="hidden"
                    animate="visible"
                    custom={.2}
                    variants={containerVariants}
                    gap={.5} direction={"column"} width={"100%"} alignItems={"center"}>
                    <Stack sx={{ bgcolor: "rgba(255, 17, 0, .05)", height: "4.2rem", width: "4.4rem", padding: 1, borderRadius: "100%", alignItems: "center", justifyContent: "center" }}>
                        <FaAddressBook style={{
                            fontSize: "2.2rem",
                            color: "#FF1100"
                        }} />
                    </Stack>
                    <Typography sx={{ fontWeight: "700", color: "#FF1100" }}
                        textAlign={"center"} variant='h5'> Update Shipping Address</Typography>

                </MotionLogo>

                <Stack gap={1} direction={"column"} width={"100%"} alignItems={"center"}>

                    <Stack width={"100%"} gap={1} sx={{}}>
                        <AddShopInput
                            label={"Full Name:"}
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

                    <Stack direction={{ xs: "column", md: "row" }} alignItems={"flex-end"} width={"100%"} gap={1} sx={{}}>
                        <AddShopInput
                            label={"Pin Code:"}
                            placeholder={"Enter Pin Code"}
                            type={"text"}
                            width={{ xs: "100%", md: '50%' }}
                            custom={0.8}
                            value={pinCode}
                            onChange={(e) => setPinCode(e.target.value)}
                        />

                        <AddShopInput
                            label={"Building Name or Number:"}
                            placeholder={"Enter your House No"}
                            type={"text"}
                            width={{ xs: "100%", md: '50%' }}
                            custom={0.8}
                            value={buildingName}
                            onChange={(e) => setBuildingName(e.target.value)}
                        />


                    </Stack>



                    <Stack width={"100%"} gap={1} sx={{}}>
                        <AddShopInput
                            label={"LandMark:"}
                            placeholder={"Enter your LandMark"}
                            type={"text"}
                            width='100%'
                            custom={1}
                            value={landMark}
                            onChange={(e) => setLandMark(e.target.value)}
                        />
                    </Stack>

                    <MotionStack
                        initial="hidden"
                        animate="visible"
                        custom={.9}
                        variants={containerVariants}
                        width={"100%"} direction={"row"} gap={2} justifyContent={"start"}>

                        <Stack width={"6.5rem"}
                            direction={"row"}
                            gap={.5}
                            padding={"5px 10px"}
                            bgcolor={isLocation == "home" ? "#FF1100" : "gray"}
                            borderRadius={"8px"}
                            color={"white"}
                            justifyContent={"center"}
                            onClick={() => setIsLocation("home")}
                            sx={{ cursor: "pointer" }}

                        >
                            <Home />
                            Home
                        </Stack>

                        <Stack width={"6.5rem"}
                            direction={"row"}
                            gap={.5}
                            padding={"5px 10px"}
                            bgcolor={isLocation == "work" ? "#FF1100" : "gray"}
                            borderRadius={"8px"}
                            color={"white"}
                            justifyContent={"center"}
                            onClick={() => setIsLocation("work")}
                            sx={{ cursor: "pointer" }}
                        >
                            <Business />
                            Work
                        </Stack>

                    </MotionStack>
                    <Stack mt={2} width={"100%"} gap={1} sx={{}}>

                        <MotionSaveButton
                            onClick={handleUpdateAddress}
                            initial="hidden"
                            animate="visible"
                            custom={1}
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
                                    Address Updating....
                                </Typography> : "Update shipping Address"
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
export default UpdateAddress




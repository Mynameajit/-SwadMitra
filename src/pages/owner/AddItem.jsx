import React, { useState } from 'react'
import { Button, CircularProgress, IconButton, Input, Stack, Typography, useTheme } from '@mui/material'
import { AddPhotoAlternate, Fastfood, Restaurant, Save } from '@mui/icons-material'
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';
import { backendURL } from '../../App';
import { setMyShopData } from '../../redux/ownerSlice';
import AddShopInput from '../../components/owner/Input';


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

const foodCategoryOptions = [
    { label: "Snacks", value: "Snacks" },
    { label: "Sandwich", value: "Sandwich" },
    { label: "Desserts", value: "Desserts" },
    { label: "Drinks", value: "Drinks" },
    { label: "Fast Food", value: "Fast Food" },
    { label: "Cake", value: "Cake" },
    { label: "Pasta", value: "Pasta" },
    { label: "Noodles", value: "Noodles" },
    { label: "Pizza", value: "Pizza" },
    { label: "Burgers", value: "Burgers" },
];

const AddItem = () => {
    const theme = useTheme()
    const { currentCity, currentState, currentAddress } = useSelector(state => state.user)
    const { myShopData } = useSelector(state => state.owner)
    const dispatch = useDispatch()


    const [itemName, setItemName] = useState("")
    const [price, setPrice] = useState(null)
    const [description, setDescription] = useState("")
    const [stock, setStock] = useState(1)
    const [discount, setDiscount] = useState(0)
    const [foodType, setFoodType] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState("")

    const [frontendImage, setFrontendImage] = useState(null)
    const [loading, setLoading] = useState(false)



    const handleImage = (e) => {
        const file = e.target.files[0]
        setImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }

    const handleCreateItem = async () => {
        if (!itemName || !price || !description || !stock  || !image || !foodType || !category) {
            return toast.error("All fields are required");
        }

        if (stock < !0) {
            return toast.error("Stock must be greater than 0")
        }
        if (price < !0) {
            return toast.error("minimum Price 1")
        }

        
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append("name", itemName);
            formData.append("price", price);
            formData.append("description", description);
            formData.append("stock", stock);
            formData.append("discount", discount);
            formData.append("foodType", foodType);
            formData.append("category", category);
            formData.append("image", image); 

            const res = await axios.post(`${backendURL}/item/create`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data", // ✅ this line is important!
                },
            });
            toast.success(res.data.message);
            dispatch(setMyShopData(res.data.shop));
            setLoading(false)
            if (res.status === 200) {
                setItemName("");
                setPrice("");
                setDescription("");
                setStock(1);
                setDiscount("");
                setFoodType("");
                setCategory("");
                setImage(null);
                setFrontendImage(null)
            }
        } catch (error) {
            setLoading(false)
            console.log("shop create error", error);
            toast.error(error.response?.data?.message || "Internal server error");
        }
    };



    return (
        <Stack p={{ xs: 0, md: 1.5 }} height={"100vh"} width={"100%"} justifyContent={"center"} alignItems={"center"}>

            <Stack
                width={{ xs: "100%", md: "100%" }}
                height={"100%"}
                overflow={"auto"}
                borderRadius={"1rem"}
                p={"1rem 3rem"}
                paddingBottom={{ xs: "5rem", md: ".5rem" }}
                sx={{
                    background: theme.palette.mode === "dark"
                        ? "rgba(0,0,0,0.02)"
                        : "rgba(255,255,255,0.02)",
                    boxShadow: "0 8px 32px 0 rgba(31,38,125,0.2)",

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
                        textAlign={"center"} variant='h5'>Create New Item</Typography>

                </MotionLogo>

                <Stack gap={2} mt={2} direction={"column"} width={"100%"} >

                    <Stack width={"100%"} direction={{ xs: "column", md: "row" }} justifyContent={"space-between"} gap={1} sx={{}}>
                        <AddShopInput
                            label={"Item Name:"}
                            placeholder={"Enter Item name"}
                            type={"text"}
                            width='100%'
                            custom={0.4}
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                        />

                        <AddShopInput
                            label={"Price:"}
                            placeholder={"Enter Item Price"}
                            type={"number"}
                            width='100%'
                            custom={0.4}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />

                    </Stack>

                    {/* {
                        price < 1 && (
                            <Stack direction={"row"} width={"100%"} justifyContent={"end"}>

                                <Typography sx={{ color: "red", width: "50%" }} variant='body2'>Price must be greater than 0</Typography>
                            </Stack>
                        )
                    } */}

                    <Stack width={"100%"} gap={1} sx={{}}>
                        <AddShopInput
                            label={"Description:"}
                            placeholder={"Enter Item Description"}
                            type={"text"}
                            width='100%'
                            custom={0.6}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Stack>

                    <Stack direction={"row"} width={"100%"} gap={1} sx={{}}>
                        <AddShopInput
                            label={"Stock:"}
                            placeholder={"Enter Item Stock"}
                            type={"number"}
                            width='50%'
                            custom={0.8}
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                        <AddShopInput
                            label={"Discount:"}
                            placeholder={"0%"}
                            type={"number"}
                            width='50%'
                            custom={0.8}
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                        />

                    </Stack>
                    {
                        stock < 1 && (
                            <Typography justifyContent={"flex-start"} sx={{ color: "red" }} variant='body2'>Stock must be greater than 0</Typography>
                        )
                    }



                    <Stack width={"100%"} direction={{ xs: "column", md: "row" }} gap={1} sx={{}}>

                        <Stack direction={{ md: "column", xs: "row" }} width={{ xs: "100%", md: "50%" }} gap={1} sx={{}}>
                            <AddShopInput
                                select={true}
                                options={[
                                    { label: "Veg", value: "Veg" },
                                    { label: "Non Veg", value: "Non-Veg" },]}
                                defaultValue="Veg   "
                                label={"Food Type:"}
                                placeholder={"Select foodType"}
                                type={"text"}
                                width={{ xs: "50%", md: '100%' }}
                                custom={0.8}
                                value={foodType}
                                onChange={(e) => setFoodType(e.target.value)}
                            />


                            <AddShopInput
                                label={"Category:"}
                                placeholder={"Select Food Category"}
                                select={true}
                                defaultValue="Snacks"
                                options={foodCategoryOptions}
                                type={"text"}
                                width={{ xs: "50%", md: '100%' }}
                                custom={0.8}
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />


                        </Stack>
                      
                        <Stack direction={{ xs: "column", md: "row" }} p={1} width={{ xs: "100%", md: "50%" }} gap={{ xs: 1, md: 3 }} alignItems={"center"}>


                            <InputFileUpload
                                onChange={handleImage}
                                custom={0.8}
                                label={"Item Image"}
                                height='8rem'
                                width={{ xs: "15rem", md: '15rem' }}
                            />
                            {
                                frontendImage && (
                                    <img style={{
                                        borderRadius: "8px",
                                        opacity: "1",
                                        width: "15rem",
                                        height: "8rem"
                                    }} src={frontendImage} alt="" />
                                )
                            }
                        </Stack>

                    </Stack>

                    <Stack mt={2} width={"100%"} gap={1} sx={{}}>

                        <MotionSaveButton
                            onClick={handleCreateItem}
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
                                    Item Creating....
                                </Typography> : "Create Item"
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
const MotionStack = motion(Stack);
const MotionButton = motion(Button);

export const InputFileUpload = ({ custom = 0.3, label = "Image", onChange, height = "8rem", width = "12rem" }) => {
    return (
        <MotionStack
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            custom={custom}
            sx={{
                width: width,
                height: height,
                border: " 2px dashed #FF1100",
                borderRadius: " 8px"
            }}

        >

            <Button
                initial="hidden"
                animate="visible"
                custom={custom}
                variants={containerVariants}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}

                sx={{
                    height: "100%",
                    padding: 1,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    textTransform: "none",
                    borderRadius: "8px",
                    color: "#FF1100",
                    bgcolor: "transparent",
                    "&:hover": { color: "#e00e00" },
                }}
            >
                <AddPhotoAlternate sx={{ fontSize: "3rem" }} />
                Upload Image
                <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={onChange}
                    multiple
                />
            </Button>

        </MotionStack>
    );
};
export default AddItem




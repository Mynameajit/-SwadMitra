import React, { lazy, Suspense, useCallback } from 'react';
import { Skeleton, Stack, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';

import { setCartItems } from '../redux/userSlice';
import { backendURL } from '../App';
import { burger, cake, dessert, drink, fastFood, noodles, pasta, pizza, sandwich, snacks } from '../utils/imageData';
import Loader from '../components/Loader';
import MenuLoader from '../components/MenuLoader';

// Lazy load heavy UI components to reduce initial bundle size
const Category = lazy(() => import('../components/Category'));
const ItemCard = lazy(() => import('../components/ItemCard'));
const ShopCard = lazy(() => import('../components/ShopCard'));

// Categories - kept same as before
export const categories = [
    { id: 1, name: 'Snacks', image: snacks },
    { id: 2, name: 'Sandwich', image: sandwich },
    { id: 3, name: 'Desserts', image: dessert },
    { id: 4, name: 'Drinks', image: drink },
    { id: 5, name: 'Fast Food', image: fastFood },
    { id: 6, name: 'Cake', image: cake },
    { id: 7, name: 'Pasta', image: pasta },
    { id: 8, name: 'Noodles', image: noodles },
    { id: 9, name: 'Pizza', image: pizza },
    { id: 10, name: 'Burgers', image: burger },
];

// Reusable hidden-scrollbar style
const HIDDEN_SCROLLBAR = {
    '&::-webkit-scrollbar': { display: 'none' },
    '-ms-overflow-style': 'none',
    'scrollbarWidth': 'none',
    // Smooth touch scrolling on iOS
    '-webkit-overflow-scrolling': 'touch',
};

const headingVariant = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const Items = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const { itemsData } = useSelector((state) => state.items);
    const { shopInCity, currentCity, userData } = useSelector((state) => state.user);

    // Stable handler for adding to cart
    const handelAddCart = useCallback(async (item, qty) => {

        if (!userData) return toast.error("Please log in to add items to your cart");
        if (!item) return;

        const cartData = {
            name: item.name,
            price: item.price,
            image: item.image,
            qty,
            shop: item.shop,
            productId: item._id,
            foodType: item.foodType,
            rating: item.rating,
            discount: item.discount,
            stock: item.stock
        };

        try {
            const res = await axios.post(`${backendURL}/cart/add`, cartData, { withCredentials: true });

            if (res?.data?.success) {
                toast.success(res.data.message || 'Added to cart');
            } else {
                toast.error(res?.data?.message || 'Could not add to cart');
            }

            // update redux cart state (if backend returns cart)
            if (res?.data?.cart) {
                dispatch(setCartItems(res.data.cart));
            }
        } catch (error) {
            console.error('Add cart error:', error);
            toast.error('Server error. Try again.');
        }
    }, [dispatch]);

    return (
        <Stack width="100%" minHeight="100vh" pt={{ xs: 4, md: 5 }}
            style={{
                background:
                    theme.palette.mode === "light"
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.05)",
                backdropFilter: "blur(6px)",

            }}
        >

            {/* Categories heading with motion */}
            <motion.div initial="hidden" animate="visible" variants={headingVariant}>
                <Typography
                    textAlign="center"
                    sx={{
                        fontWeight: { xs: 700, md: 900 },
                        color: '#FF1100',
                        fontSize: { xs: '1.4rem', md: '2rem' },
                        mt: 4,
                        mb: 1,
                    }}
                >
                    Explore Delicious Categories
                </Typography>
            </motion.div>

            {/* Category horizontal scroll */}
            <Stack
                width={{ xs: '100%', md: '90%' }}
                margin="auto"
                direction="row"
                gap={1}
                alignItems="center"
                justifyContent={{ xs: 'start', md: 'center' }}
                px={{ xs: 1, md: 2 }}
                py={2}
                sx={{ overflowX: 'auto', ...HIDDEN_SCROLLBAR }}
            >
                {categories.map((cat) => (
                    <Category key={cat.id} items={cat} i={cat.id} />
                ))}
            </Stack>


            <Suspense fallback={<MenuLoader />}>


                {/* Shops heading with motion */}
                <motion.div initial="hidden" whileInView="visible" variants={headingVariant} viewport={{ once: true }}>
                    <Typography
                        textAlign="center"
                        sx={{
                            fontWeight: { xs: 700, md: 900 },
                            color: '#FF1100',
                            fontSize: { xs: '1.4rem', md: '2rem' },
                            mt: 0,
                        }}
                    >
                        Best Food Shop for {currentCity || 'your city'}
                    </Typography>
                </motion.div>

                {/* Shops horizontal scroll */}
                <Stack
                    width={{ xs: '100%', md: '80%' }}
                    margin="auto"
                    direction="row"
                    gap={{ xs: 1.7, md: 2.5 }}
                    alignItems="center"
                    px={{ xs: 1, md: 2 }}
                    py={3}
                    sx={{ overflowX: 'auto', ...HIDDEN_SCROLLBAR }}
                >
                    {Array.isArray(shopInCity) && shopInCity.map((shop, idx) => (
                        <ShopCard key={shop._id || shop.id || idx} shop={shop} i={idx} />
                    ))}
                </Stack>

                {/* Items grid */}
                <Stack
                    width="94%"
                    marginX="auto"
                    borderRadius="1rem"
                    display="grid"
                    padding={{ xs: 1, md: 1 }}
                    gap={3}
                    mt={1}
                    marginBottom={6}
                    sx={{
                        gridTemplateColumns: {
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(3, 1fr)',
                            lg: 'repeat(4, 1fr)',
                        },
                        overflow: 'hidden',
                    }}
                >
                    {Array.isArray(itemsData) && itemsData.map((item, idx) => {
                        // fix for previous buggy index logic
                        const propIndex = idx < 4 ? 1 : idx + 1;
                        return (
                            <ItemCard
                                key={item._id || idx}
                                handelAddCart={handelAddCart}
                                item={item}
                                i={propIndex}
                            />
                        );
                    })}
                </Stack>
                
            </Suspense>

        </Stack>
    );
};

export default Items;

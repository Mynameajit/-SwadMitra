import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { backendURL } from '../App'
import { useDispatch } from 'react-redux'
import { setCartItems } from '../redux/userSlice'

const useGetCartItems = () => {
    const dispatch=useDispatch()

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const res = await axios.get(`${backendURL}/cart/get`, { withCredentials: true })
                dispatch(setCartItems(res?.data.cart[0]))
            } catch (error) {
                console.log(error);
            }
        }
        fetchCartItems()
    }, [])

}

export default useGetCartItems
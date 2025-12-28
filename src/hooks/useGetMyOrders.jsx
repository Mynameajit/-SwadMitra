import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { backendURL } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setMyOrders } from '../redux/userSlice'
import { setMyShopOrders } from '../redux/ownerSlice'

const useGetMyOrders = () => {
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.user)
    useEffect(() => {
        const fetchMyOrders = async () => {
            const res = await axios.get(`${backendURL}/order/get-myOrders`, {
                withCredentials: true
            })
            if (userData.role === "user") {

                dispatch(setMyOrders(res?.data?.orders))
            }
            if (userData.role === "owner") {

                dispatch(setMyShopOrders(res?.data?.orders))
            }
        }

        if (userData) {
            fetchMyOrders()
        }
    }, [userData])

}

export default useGetMyOrders
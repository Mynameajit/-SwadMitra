import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { backendURL } from '../App'
import { setShopInCity } from '../redux/userSlice'

const useGetShopByCity = () => {
    const { currentCity } = useSelector(state => state.user)
    const { userData } = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchShop = async () => {
            const res = await axios.get(`${backendURL}/shop/getShop-by-city/${"deoghar"}`)
            dispatch(setShopInCity(res.data.shop))
        }
        fetchShop()
    }, [currentCity, userData])
}

export default useGetShopByCity
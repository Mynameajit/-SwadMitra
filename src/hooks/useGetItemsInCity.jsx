import axios from 'axios'
import React, { useEffect } from 'react'
import { backendURL } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setItemsInCity } from '../redux/itemSlice'

const useGetItemsInCity = () => {
    const { currentCity, userData } = useSelector(state => state.user)
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchItems = async () => {
            const res = await axios.get(`${backendURL}/item/getItems-by-city/${"deoghar"}`)
            dispatch(setItemsInCity(res.data.items))

        }
        fetchItems()
    }, [currentCity, userData])

}

export default useGetItemsInCity
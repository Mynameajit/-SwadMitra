import axios from "axios"
import { backendURL } from "../App"
import { useSelector } from "react-redux"

export const handlePlaceOrder = async ({ user, paymentMethod, deliveryAddress, totalAmount, cartItems, setIsLoading }) => {

    try {
        setIsLoading(true)
        const res = await axios.post(`${backendURL}/order/create`, {
            paymentMethod,
            deliveryAddress,
            totalAmount,
            cartItems
        }, {
            withCredentials: true
        })
        setIsLoading(false)

        return res
    } catch (error) {
        setIsLoading(false)
        console.log("error creating Order", error);

    }
    finally {
        setIsLoading(false)

    }
}

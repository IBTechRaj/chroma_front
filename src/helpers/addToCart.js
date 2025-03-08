// import SummaryApi from "../common"
import { toast } from 'react-toastify'
import axios from 'axios'

const addToCart = async (e, id) => {
    e?.stopPropagation()
    e?.preventDefault()

    // const response = await fetch(SummaryApi.addToCartProduct.url, {
    //     method: SummaryApi.addToCartProduct.method,
    //     credentials: 'include',
    //     headers: {
    //         "content-type": 'application/json'
    //     },
    //     body: JSON.stringify(
    //         { productId: id }
    //     )
    // })

    try {
        const token = localStorage.getItem('token')
        const quantity = 1
        const addToCartUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/carts/add_item` : `http://localhost:3001/carts/add_item`

        const responseData = await axios.post(addToCartUrl, { product_id: id, quantity }, {

            headers: {
                "content-type": 'application/json',
                'Authorization': `Bearer ${token}`
            }

        }
        )

        // const responseData = await response.json()
        console.log('addtocart', responseData)
        if (responseData.status === 200) {
            toast.success(responseData.data.message)
        }
    }
    catch (error) {
        if (error.response && error.response.status === 401) {
            alert("Session expired. Please log in again.");
            console.log("Session expired. Please log in again.");
            // dispatch(logoutUser()); // Clears Redux state and redirects to login
        }
        // console.error('Error fetching user details:', error);
    }
    // if (responseData.data.error) {
    //     toast.error(responseData.data.message)
    // }


    // return responseData

}


export default addToCart
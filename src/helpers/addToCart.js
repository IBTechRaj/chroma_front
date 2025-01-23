import SummaryApi from "../common"
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
    const token = localStorage.getItem('token')
    const responseData = await axios.post(SummaryApi.addToCartProduct.url, { productId: id }, {

        headers: {
            "content-type": 'application/json',
            'Authorization': `Bearer ${token}`
        }

    }
    )

    // const responseData = await response.json()
    console.log('addtocart', responseData)
    if (responseData.data.success) {
        toast.success(responseData.data.message)
    }

    if (responseData.data.error) {
        toast.error(responseData.data.message)
    }


    return responseData

}


export default addToCart
import React, { useContext, useEffect, useState } from 'react'
// import SummaryApi from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-toastify';

const Cart = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(4).fill(null)
    const token = localStorage.getItem('token')
    const fetchData = async () => {

        // const response = await fetch(SummaryApi.addToCartProductView.url,{
        //     method : SummaryApi.addToCartProductView.method,
        //     credentials : 'include',
        //     headers : {
        //         "content-type" : 'application/json'
        //     },
        // })


        const cartCountUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/carts/get_user_cart` : `http://localhost:3001/carts/get_user_cart`
        if (token) {
            const responseData = await axios.get(cartCountUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            // setData(response?.data)
            // console.log('cart det', responseData)
            // console.log('daaaal', responseData.data)
            if (responseData.status === 200) {
                setData(responseData.data.cart_items)
            }
        }
        else {
            alert('Please login to view cart')
        }


        // const responseData = await response.json()




    }

    const handleLoading = async () => {
        await fetchData()
    }

    useEffect(() => {
        setLoading(true)
        handleLoading()
        setLoading(false)
    }, [])


    // const increaseQty = async (id, qty) => {
    //     const response = await fetch(SummaryApi.updateCartProduct.url, {
    //         method: SummaryApi.updateCartProduct.method,
    //         credentials: 'include',
    //         headers: {
    //             "content-type": 'application/json'
    //         },
    //         body: JSON.stringify(
    //             {
    //                 _id: id,
    //                 quantity: qty + 1
    //             }
    //         )
    //     })

    //     const responseData = await response.json()

    // const increaseQty = async (id, qty) => {
    //            const responseData = await axios.post(SummaryApi.updateCartProduct.url, {
    //         id: id,
    //         quantity: qty + 1
    //     }, {
    //         headers: {
    //             "content-type": 'application/json',
    //             'Authorization': `Bearer ${token}`
    //         },
    //     })
    //     // const responseData = await response.json()
    //     console.log('cart incr qty', responseData.data.data)
    //     if (responseData.data.success) {
    //         fetchData()
    //     }
    // }

    const increaseQty = async (cart_item_id, qty) => {
        const cartUpdateUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/carts/update_cart_item` : `http://localhost:3001/carts/update_cart_item`
        const responseData = await axios.patch(cartUpdateUrl, {
            cart_item_id: cart_item_id,
            quantity: qty + 1
        }, {
            headers: {
                "content-type": 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        // const responseData = await response.json()
        console.log('cart incr qty', responseData.data)
        if (responseData.data) {
            fetchData()
        }
    }

    // const decraseQty = async (id, qty) => {
    //     if (qty >= 2) {
    //         const response = await fetch(SummaryApi.updateCartProduct.url, {
    //             method: SummaryApi.updateCartProduct.method,
    //             credentials: 'include',
    //             headers: {
    //                 "content-type": 'application/json'
    //             },
    //             body: JSON.stringify(
    //                 {
    //                     _id: id,
    //                     quantity: qty - 1
    //                 }
    //             )
    //         })

    //         const responseData = await response.json()


    //         if (responseData.success) {
    //             fetchData()
    //         }
    //     }
    // }

    // const decraseQty = async (id, qty) => {
    //     if (qty >= 2) {
    //         const responseData = await axios.post(SummaryApi.updateCartProduct.url,
    //             {
    //                 _id: id,
    //                 quantity: qty - 1
    //             },
    //             {
    //                 headers: {
    //                     "content-type": 'application/json',
    //                     'Authorization': `Bearer ${token}`
    //                 },
    //             })
    //         // const responseData = await response.json()
    //         if (responseData.data.success) {
    //             fetchData()
    //         }
    //     }
    // }

    const decreaseQty = async (cart_item_id, qty) => {
        const cartUpdateUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/carts/update_cart_item` : `http://localhost:3001/carts/update_cart_item`
        const responseData = await axios.patch(cartUpdateUrl, {
            cart_item_id: cart_item_id,
            quantity: qty - 1
        }, {
            headers: {
                "content-type": 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        // const responseData = await response.json()
        console.log('cart decr qty', responseData.data)
        if (responseData.data) {
            fetchData()
        }
    }

    // const deleteCartProduct = async (id) => {
    //     const response = await fetch(SummaryApi.deleteCartProduct.url, {
    //         method: SummaryApi.deleteCartProduct.method,
    //         credentials: 'include',
    //         headers: {
    //             "content-type": 'application/json'
    //         },
    //         body: JSON.stringify(
    //             {
    //                 _id: id,
    //             }
    //         )
    //     })

    //     const responseData = await response.json()

    //     if (responseData.success) {
    //         fetchData()
    //         context.fetchUserAddToCart()
    //     }
    // }

    const deleteCartProduct = async (id) => {
        const cartDeleteUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/carts/remove_item/${id}` : `http://localhost:3001/carts/remove_item/${id}`
        const responseData = await axios.delete(cartDeleteUrl,
            {
                headers: {
                    "content-type": 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }

        )

        // const responseData = await response.json()
        console.log('del', responseData)
        if (responseData.status === 200) {
            // alert('Product deleted from the cart')
            fetchData()
            toast.success('Product deleted from the cart')
            context.fetchUserAddToCart()
        }
    }

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
    const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr?.product?.selling_price), 0)
    return (
        <div className='container mx-auto'>
            {/* {console.log('daaat', data)} */}
            <div className='text-center text-lg my-3'>
                {

                    data.length === 0 && !loading && (
                        <p className='bg-white py-5'>No Data</p>
                    )
                }
            </div>

            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                {/***view product */}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingCart?.map((el, index) => {
                                return (
                                    <div key={el + "Add To Cart Loading" + index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                    </div>
                                )
                            })

                        ) : (
                            data.map((product, index) => {
                                return (
                                    <div key={product?.id + "Add To Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]'>
                                        <div className='w-32 h-32 bg-slate-200'>
                                            <img src={product?.product.product_image[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                                        </div>
                                        {/* {console.log('pppp', product)} */}
                                        <div className='px-4 py-2 relative'>
                                            {/**delete product */}
                                            <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={() => deleteCartProduct(product?.id)}>
                                                <MdDelete />
                                            </div>

                                            <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.product_name}</h2>
                                            <p className='capitalize text-slate-500'>{product?.product.category}</p>
                                            <div className='flex items-center justify-between'>
                                                <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.product.selling_price)}</p>
                                                <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product?.product?.selling_price * product?.quantity)}</p>
                                            </div>
                                            <div className='flex items-center gap-3 mt-1'>
                                                <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={() => decreaseQty(product?.id, product?.quantity)}>-</button>
                                                <span>{product?.quantity}</span>
                                                <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={() => increaseQty(product?.id, product?.quantity)}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
                </div>


                {/***summary  */}
                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                    {
                        loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>

                            </div>
                        ) : (
                            <div className='h-36 bg-white'>
                                <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                    <p>Quantity</p>
                                    <p>{totalQty}</p>
                                </div>

                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                    <p>Total Price</p>
                                    <p>{displayINRCurrency(totalPrice)}</p>
                                </div>

                                <button className='bg-blue-600 p-2 text-white w-full mt-2'>Payment</button>

                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Cart
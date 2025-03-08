import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
// import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'
import axios from 'axios'

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async () => {
    const allProductsUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/products` : `http://localhost:3001/products`

    const response = await axios.get(allProductsUrl, {
      headers: {
        "Content-Type": "application/json",
        // If authentication is required, include the Authorization header
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
    )
    // console.log('response', response.data)
    // const dataResponse = await response.json()

    // console.log("product data",dataResponse)

    setAllProduct(response.data)
    // if (response.data && response.data.data) {
    //   setAllProduct(response.data.data.map(item => item.attributes)); // ✅ Extracts array correctly
    // } else {
    //   setAllProduct([]); // Fallback to empty array
    // }
    // console.log('allProduct', allProduct)
  }

  useEffect(() => {
    fetchAllProduct()
  }, [])

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Product</h2>
        <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full ' onClick={() => setOpenUploadProduct(true)}>Upload Product</button>
      </div>
      {console.log('all attr', allProduct)}
      {/**all product */}

      {/* {allProduct.map((product, index) => (
        <div key={index}>{product.attributes} - {product.price}</div>
      ))} */}

      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {
          allProduct.map((product, index) => {
            return (

              <AdminProductCard data={product} key={index + "allProduct"} fetchdata={fetchAllProduct} />

            )
          })
        }
      </div>





      {/**upload prouct component */}
      {
        openUploadProduct && (
          <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
        )
      }


    </div>
  )
}

export default AllProducts
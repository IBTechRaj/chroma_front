import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
// import SummaryApi from '../common';
import { toast } from 'react-toastify'
import axios from 'axios'

const AdminEditProduct = ({
  onClose,
  productData,
  fetchdata
}) => {
  console.log('prd', productData)
  const [data, setData] = useState({
    ...productData,
    product_name: productData?.product_name,
    brand_name: productData?.brand_name,
    category: productData?.category,
    product_image: productData?.product_image || [],
    description: productData?.description,
    price: productData?.price,
    selling_price: productData?.selling_price
  })
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
  const [fullScreenImage, setFullScreenImage] = useState("")

  const [productImages, setProductImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {

      return {
        ...preve,
        [name]: value
      }
    })
    // console.log('pddd', productData)
  }

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0]
    const uploadImageCloudinary = await uploadImage(file)

    setData((preve) => {
      { console.log('prev', preve) }
      return {
        ...preve,

        product_image: [...preve.product_image, uploadImageCloudinary.url]

      }
    })
  }

  const handleDeleteProductImage = async (index) => {
    // console.log("image index", index)

    const newProductImage = [...data.product_image]
    newProductImage.splice(index, 1)

    setData((preve) => {
      return {
        ...preve,
        product_image: [...newProductImage]
      }
    })

  }

  const formData = new FormData();
  {/**upload product */ }
  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  // const response = await axios.put(
  //   `http://localhost:3001/api/v1/products/${productId}`,
  //   formData,
  //   {
  //     headers: {
  //       'Authorization': `Bearer ${localStorage.getItem("token")}`, // Assuming auth token
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   }
  // );

  const handleSubmit = async (e) => {
    e.preventDefault()
    // { console.log('sp', data.sellingPrice) }
    const token = localStorage.getItem('token')
    const updateProductUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/products/${productData.id}` : `http://localhost:3001/products/${productData.id}`
    // const formData = new FormData();
    formData.append("product[product_name]", data.product_name);
    formData.append("product[brand_name]", data.brand_name);
    formData.append("product[category]", data.category);
    formData.append("product[description]", data.description);
    formData.append("product[price]", data.price);
    formData.append("product[selling_price]", data.selling_price);
    // formData.append("product[product_image][]", productData.productImage);

    // console.log('pre ges', productData.productImage)
    // productData.productImage.forEach((image, index) => {
    //   formData.append("product[product_image][]", image);
    // });
    console.log('pre ges', productData.product_image)
    data.product_image.forEach((image, index) => {
      formData.append(`product[product_image][]`, image);
    });


    // console.log('productData', productData)
    // console.log('formData', formData)
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    const response = await axios.put(updateProductUrl, formData, {

      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "multipart/form-data"

      },

    })

    console.log('response', response)

    if (response.status === 200) {
      toast.success("Product updated successfully")
      onClose()
      // fetchData()
    }

    if (response.error) {
      toast.error(response?.message)
    }

  }



  // const response = await fetch(SummaryApi.updateProduct.url, {
  //   method: SummaryApi.updateProduct.method,
  //   credentials: 'include',
  //   headers: {
  //     "content-type": "application/json"
  //   },
  //   body: JSON.stringify(data)
  // })

  // try {
  //   const response = await axios.put(
  //     `http://localhost:3001/api/v1/products/${productId}`,
  //     formData,
  //     {
  //       headers: {
  //         'Authorization': `Bearer ${localStorage.getItem("token")}`, // Assuming auth token
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     }
  //   );
  //   console.log("Product updated:", response.data);
  // } catch (error) {
  //   console.error("Update failed:", error.response?.data || error.message);
  // }

  // const responseData = await response.json()

  // if (responseData.success) {
  //   toast.success(responseData?.message)
  //   onClose()
  //   fetchdata()
  // }


  // if (responseData.error) {
  //   toast.error(responseData?.message)
  // }


  // }

  return (
    <div className='fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg'>Edit Product</h2>
          <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
            <CgClose />
          </div>
        </div>

        <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
          <label htmlFor='productName'>Product Name :</label>
          {/* {console.log('pd', data, productData)} */}
          <input
            type='text'
            id='productName'
            placeholder='enter product name'
            name='productName'
            value={data.product_name}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />


          <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
          <input
            type='text'
            id='brandName'
            placeholder='enter brand name'
            value={data.brand_name}
            name='brandName'
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='category' className='mt-3'>Category :</label>
          <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
            <option value={""}>Select Category</option>
            {
              productCategory.map((el, index) => {
                return (
                  <option value={el.value} key={el.value + index}>{el.label}</option>
                )
              })
            }
          </select>

          <label htmlFor='productImage' className='mt-3'>Product Image :</label>
          <label htmlFor='uploadImageInput'>
            <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
              <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                <span className='text-4xl'><FaCloudUploadAlt /></span>
                <p className='text-sm'>Upload Product Image</p>
                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
              </div>
            </div>
          </label>
          <div>
            {
              data?.product_image.toString().split(",")[0] ? (

                <div className='flex items-center gap-2'>
                  {
                    data.product_image.map((el, index) => {
                      return (
                        <div className='relative group' key={index}>
                          {console.log('pi', data.product_image)}
                          <img
                            src={el.toString().split(",")[0]}
                            alt={el}
                            width={80}
                            height={80}
                            className='bg-slate-100 border cursor-pointer'
                            onClick={() => {
                              setOpenFullScreenImage(true)
                              setFullScreenImage(el)
                            }} />

                          <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
                            <MdDelete />
                          </div>
                        </div>

                      )
                    })
                  }
                </div>
              ) : (
                <p className='text-red-600 text-xs'>*Please upload product image</p>
              )
            }

          </div>

          <label htmlFor='price' className='mt-3'>Price :</label>
          <input
            type='number'
            id='price'
            placeholder='enter price'
            value={data.price}
            name='price'
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />
          {/* {console.log('p', productData.price)} */}

          <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
          <input
            type='number'
            id='sellingPrice'
            placeholder='enter selling price'
            value={data.selling_price}
            name='selling_price'
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />
          {/* {console.log('sp', productData.selling_price)} */}
          <label htmlFor='description' className='mt-3'>Description :</label>
          <textarea
            className='h-28 bg-slate-100 border resize-none p-1'
            placeholder='enter product description'
            rows={3}
            name='description'
            value={data.description}
            onChange={handleOnChange}
          >
          </textarea>





          <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Update Product</button>
        </form>




      </div>



      {/***display image full screen */}
      {
        openFullScreenImage && (
          <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
        )
      }


    </div>
  )
}

export default AdminEditProduct
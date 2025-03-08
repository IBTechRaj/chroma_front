import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({
  data,
  fetchdata
}) => {
  let parsedImageUrls = []
  const [editProduct, setEditProduct] = useState(false)

  return (
    <div className='bg-white p-4 rounded '>
      {/* {console.log('allp', data)} */}
      <div className='w-40'>
        <div className='w-32 h-32 flex justify-center items-center'>
          {/* {console.log('arr', data.product_image) //.split(",")
          } */}

          <img src={data.product_image.toString().split(",")[0]} className='mx-auto object-fill h-full' />
        </div>
        <h1 className='text-ellipsis line-clamp-2'>{data.product_name}</h1>

        <div>

          <p className='font-semibold'>
            {
              displayINRCurrency(data.selling_price)
            }

          </p>

          <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={() => setEditProduct(true)}>
            <MdModeEditOutline />
          </div>

        </div>


      </div>

      {
        editProduct && (
          <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
        )
      }

    </div>
  )
}

export default AdminProductCard
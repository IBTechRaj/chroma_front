import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
// import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'
import axios from 'axios'
// import SearchProducts from "./searchProducts";

const SearchProduct = () => {
  const query = useLocation()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  console.log("query", query.search.split('=')[1])

  const qstring = query.search.split('=')[1]
  const fetchProduct = async (query) => {
    setLoading(true)
    // const response = await fetch(SummaryApi.searchProduct.url+query.search)
    // const response = await SearchProducts(query);
    // const dataResponse = await response.json()

    const searchProductUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/products/search?qstring=${qstring}` : `http://localhost:3001/products/search?qstring=${qstring}`

    try {
      const response = await axios.get(searchProductUrl
        // , {
        //   params: { qstring },
        // }
      );
      console.log('search res', response.data)
      setData(response.data)
      // return response.data;
    } catch (error) {
      console.error("Error searching products:", error.response?.data || error);
      return [];
    }
    setLoading(false)


  }

  useEffect(() => {
    fetchProduct()
  }, [query])

  return (
    <div className='container mx-auto p-4'>
      {
        loading && (
          <p className='text-lg text-center'>Loading ...</p>
        )
      }

      <p className='text-lg font-semibold my-3'>Search Results : {data.length}</p>

      {
        data.length === 0 && !loading && (
          <p className='bg-white text-lg text-center p-4'>No Data Found....</p>
        )
      }


      {
        data.length !== 0 && !loading && (
          <VerticalCard loading={loading} data={data} />
        )
      }

    </div>
  )
}

export default SearchProduct
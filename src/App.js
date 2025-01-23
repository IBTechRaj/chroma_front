
import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

import axios from 'axios'

function App() {
  const dispatch = useDispatch()
  const [cartProductCount, setCartProductCount] = useState(0)


  const token = localStorage.getItem('token')
  console.log('tooook', token)
  const fetchUserDetails = async () => {
    try {
      const dataResponse = await axios.get(SummaryApi.users.url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      )
      // const dataApi = await dataResponse.json()
      console.log('fetch u d dataapi', dataResponse.data.data)

      if (dataResponse.data.success) {
        dispatch(setUserDetails(dataResponse.data.data))
      }
    }
    catch (error) {
      console.error('Error fetching user details:', error);
    }


  }



  const fetchUserAddToCart = async () => {
    const dataResponse = await axios.get(SummaryApi.addToCartProductCount.url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    // const dataApi = await dataResponse.json()

    setCartProductCount(dataResponse?.data?.data?.count)
    console.log('app.us prod cnt', dataResponse)
  }

  useEffect(() => {
    /**user Details */
    // fetchUserDetails()
    /**user Details cart product */
    // fetchUserAddToCart()

  }, [])
  return (
    <>
      <Context.Provider value={{
        fetchUserDetails, // user detail fetch 
        cartProductCount, // current user add to cart product count,
        fetchUserAddToCart
      }}>
        <ToastContainer
          position='top-center'
        />

        <Header />
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;


import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
// import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

import axios from 'axios'

function App() {
  const dispatch = useDispatch()
  // const [userId, setUserId] = useState(0)
  const [cartProductCount, setCartProductCount] = useState(0)

  const token = localStorage.getItem('token')


  const fetchUserDetails = async () => {
    const token = localStorage.getItem('token')
    console.log('tooook', token)
    if (token) {
      try {
        const currentUserUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/users/current_user` : `http://localhost:3001/users/current_user`

        const dataResponse = await axios.get(currentUserUrl, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
        )
        // const dataApi = await dataResponse.json()
        console.log('fetch u d dataapi', dataResponse)

        if (dataResponse.status === 200) {
          // setUserId(dataResponse.data.id)
          // console.log('uid', userId)
          dispatch(setUserDetails(dataResponse.data))


        }
      }
      catch (error) {
        if (error.response && error.response.status === 401) {
          alert("Session expired. Please log in again.");
          // dispatch(logoutUser()); // Clears Redux state and redirects to login
        }
        // console.error('Error fetching user details:', error);
      }
    }

  }



  const fetchUserAddToCart = async () => {
    const token = localStorage.getItem('token')
    const cartCountUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/carts/get_user_cart` : `http://localhost:3001/carts/get_user_cart`
    if (token) {
      try {
        const response = await axios.get(cartCountUrl, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        setCartProductCount(response?.data?.cart_items.length)
        console.log('prod cnt', response)
      }
      catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("Session expired. Please log in again.");
          // dispatch(logoutUser()); // Clears Redux state and redirects to login
        }
        // console.error('Error fetching user details:', error);
      }
      // const dataResponse = await axios.get(SummaryApi.addToCartProductCount.url, {
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // })
      // setCartProductCount(dataResponse?.data?.data?.count)
      // console.log('app.us prod cnt', dataResponse)
    }
  }

  useEffect(() => {
    /**user Details */
    fetchUserDetails()
    /**user Details cart product */
    fetchUserAddToCart()

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

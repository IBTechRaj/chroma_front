import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import SummaryApi from '../common';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';
import axios from 'axios'

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  console.log("user in hdr", user)
  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search, setSearch] = useState(searchQuery)

  const token = localStorage.getItem('token')

  // const handleLogout = async () => {
  //   const fetchData = await fetch(SummaryApi.logout_user.url, {
  //     method: SummaryApi.logout_user.method,
  //     credentials: 'include'
  //   })

  //   const data = await fetchData.json()

  //   if (data.success) {
  //     toast.success(data.message)
  //     dispatch(setUserDetails(null))
  //     navigate("/")
  //   }

  //   if (data.error) {
  //     toast.error(data.message)
  //   }

  // }

  const handleLogout = async () => {
    console.log('in logout')
    try {
      const logoutUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/users/logout` : `http://localhost:3001/users/logout`
      const response = await axios.post(logoutUrl, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      if (response.status === 200) {
        toast.success(response.data.message)
        dispatch(setUserDetails(null))
        navigate("/")
      }
      console.log('Logout response:', response);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear the token and redirect
      localStorage.removeItem('token');
      // window.location.href = '/login';
    }

    // const fetchData = await axios.get(SummaryApi.logout_user.url, {
    //   headers: {
    //     'Authorization': `Bearer ${token}`
    //   }
    // })

    // // const data = await fetchData.json()

    // if (fetchData.data.success) {
    //   toast.success(fetchData.data.message)
    //   dispatch(setUserDetails(null))
    //   navigate("/")
    // }

    // if (fetchData.data.error) {
    //   toast.error(fetchData.data.message)
    // }

  }

  const handleSearch = (e) => {
    const { value } = e.target
    setSearch(value)

    if (value) {
      navigate(`/search?q=${value}`)
    } else {
      navigate("/search")
    }
  }
  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className=' h-full container mx-auto flex items-center px-4 justify-between'>
        <div className=''>
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input type='text' placeholder='search product here...' className='w-full outline-none' onChange={handleSearch} value={search} />
          <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
            <GrSearch />
          </div>
        </div>


        <div className='flex items-center gap-7'>

          <div className='relative flex justify-center'>

            {
              user?.id && (
                <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(preve => !preve)}>
                  {
                    user?.get_profile_pic_url ? (
                      <img src={user?.get_profile_pic_url} className='w-10 h-10 rounded-full' alt={user?.name} />
                    ) : (
                      <FaRegCircleUser />
                    )
                  }
                </div>
              )
            }


            {
              menuDisplay && (
                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded' >
                  <nav>
                    {
                      // user?.role === ROLE.ADMIN && (
                      user?.role === 'admin' && (
                        <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                      )
                    }

                  </nav>
                </div>
              )
            }

          </div>

          {
            user?.id && (
              <Link to={"/cart"} className='text-2xl relative'>
                <span><FaShoppingCart /></span>

                <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                  <p className='text-sm'>{context?.cartProductCount}</p>
                  {console.log('cnt cpc', context, context?.cartProductCount)}
                </div>
              </Link>
            )
          }

          {/* {console.log('uid', user)} */}

          <div>
            {

              user?.id ? (
                <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</button>
              )
                : (
                  <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Login</Link>
                )
            }

          </div>

        </div>

      </div>
    </header>
  )
}

export default Header
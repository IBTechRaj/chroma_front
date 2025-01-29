import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';
import axios from 'axios'

const AllUsers = () => {
    const [allUser, setAllUsers] = useState([])
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        role: "",
        id: "",
    })

    const fetchAllUsers = async () => {
        console.log('au')
        const token = localStorage.getItem('token')
        const allUsersUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/users` : `http://localhost:3001/users`
        try {
            const response = await axios.get(allUsersUrl);

            // Manually parse JSON if necessary
            console.log('response', response.data)
            const users = response.data || (await response.json());

            setAllUsers(users);
        } catch (err) {
            console.error("Error fetching users:", err);
            // setError("Error fetching users.");
        }



        // try {
        //     console.log('au')
        //     const dataResponse = await axios.get(allUsersUrl, {
        //         headers: {
        //             'Authorization': `Bearer ${token}`,
        //             "Content-Type": "application/json",
        //         }
        //     }
        //     )
        // const fetchData = await fetch(SummaryApi.allUser.url, {
        //     method: SummaryApi.allUser.method,
        //     credentials: 'include'
        // })

        // const dataResponse = await fetchData.json()
        // console.log('dr', dataResponse)
        // if (dataResponse.success) {
        //     setAllUsers(dataResponse.data)
        // }

        // if (dataResponse.error) {
        //     toast.error(dataResponse.message)
        // }
        // }
        // catch (error) {
        //     console.error('Error fetching user details:', error);
        // }
    }

    useEffect(() => {
        fetchAllUsers()
    }, [])

    return (
        <div className='bg-white pb-4'>
            <table className='w-full userTable'>
                <thead>
                    <tr className='bg-black text-white'>
                        <th>Sr.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {
                        allUser.map((el, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{el?.name}</td>
                                    <td>{el?.email}</td>
                                    <td>{el?.role}</td>
                                    <td>{moment(el?.createdAt).format('LL')}</td>
                                    <td>
                                        <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                                            onClick={() => {
                                                setUpdateUserDetails(el)
                                                setOpenUpdateRole(true)

                                            }}
                                        >
                                            <MdModeEdit />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            {
                openUpdateRole && (
                    <ChangeUserRole
                        onClose={() => setOpenUpdateRole(false)}
                        name={updateUserDetails.name}
                        email={updateUserDetails.email}
                        role={updateUserDetails.role}
                        userId={updateUserDetails._id}
                    // callFunc={fetchAllUsers}
                    />
                )
            }
        </div>
    )
}

export default AllUsers
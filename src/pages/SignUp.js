import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import { toast } from 'react-toastify';
import axios from 'axios';

const SignUp = () => {
    const [image, setImage] = useState({ preview: '', raw: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const onImageChange = (event) => {
        setImage({
            preview: URL.createObjectURL(event.target.files[0]),
            raw: event.target.files[0]
        })
    }

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        profilePic: "",
    })
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    // const onImageChange = (event) => {
    //     setImage({
    //         preview: URL.createObjectURL(event.target.files[0]),
    //         raw: event.target.files[0]
    //     })
    // }

    // const handleUploadPic = async (e) => {
    //     const file = e.target.files[0]

    //     const imagePic = await imageTobase64(file)

    //     setData((preve) => {
    //         return {
    //             ...preve,
    //             profilePic: imagePic
    //         }
    //     })

    // }

    const user = {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
        profile_pic: data.profilePic
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const signUpUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/users` : `http://localhost:3001/users`

        if (data.password === data.password_confirmation) {



            const formData = new FormData();
            formData.append('name', data.name)
            formData.append('email', data.email)
            formData.append('role', 'customer')
            formData.append('password', data.password)
            formData.append('password_confirmation', data.password_confirmation)
            // if (image.raw)
            formData.append('profile_pic', image.raw)
            console.log('dat', formData)
            for (let pair of formData.entries()) {
                console.log(pair[0] + ": " + pair[1]);
            }

            // fetch(signUpUrl, {
            //     headers: {
            //         "Accept": "application/json"
            //     },
            //     method: 'POST',
            //     body: formData
            // })
            //     .then((res) => res.json())
            //     .then((res) => {
            //         console.log('res', res)
            //         alert("Your profile created successfully! View the email we sent you")
            //     })
            //     .catch((err) => alert(err));


            try {
                const response = await axios.post(signUpUrl, formData,
                    {
                        headers: {
                            // "content-type": "application/json"
                            "Content-Type": "multipart/form-data",
                        }
                    })
                console.log('da', response)
                if (response.status === 200) {
                    toast.success(response.data.message)
                    navigate("/login")
                }
            } catch (error) {
                if (error.status === 422) {
                    console.log('err', error)
                    toast.error(error.response.data.errors)
                }

            }
        } else {
            toast.error("Please check password and confirm password")
        }

    }

    return (
        <section id='signup'>
            <div className='mx-auto container p-4'>

                <div className='bg-white p-5 w-full max-w-sm mx-auto'>

                    <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                        <div>
                            {/* <img src={data.profilePic || loginIcons} alt='login icons' /> */}
                            <img src={image.preview || loginIcons} alt="login icons" />
                        </div>
                        <form>
                            <label>
                                <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                                    Upload  Photo
                                </div>
                                {/* <input type='file' className='hidden' onChange={handleUploadPic} /> */}
                                <input type="file"
                                    accept="image/*"
                                    multiple={false}
                                    onChange={onImageChange}
                                />
                            </label>
                        </form>
                    </div>

                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Name : </label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='text'
                                    placeholder='enter your name'
                                    name='name'
                                    value={data.name}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>
                        <div className='grid'>
                            <label>Email : </label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='email'
                                    placeholder='enter email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>

                        <div>
                            <label>Password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder='enter password'
                                    value={data.password}
                                    name='password'
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent' />
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve) => !preve)}>
                                    <span>
                                        {
                                            showPassword ? (
                                                <FaEyeSlash />
                                            )
                                                :
                                                (
                                                    <FaEye />
                                                )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label>Confirm Password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder='enter confirm password'
                                    value={data.password_confirmation}
                                    name='password_confirmation'
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent' />

                                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((preve) => !preve)}>
                                    <span>
                                        {
                                            showConfirmPassword ? (
                                                <FaEyeSlash />
                                            )
                                                :
                                                (
                                                    <FaEye />
                                                )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign Up</button>

                    </form>

                    <p className='my-5'>Already have account ? <Link to={"/login"} className=' text-red-600 hover:text-red-700 hover:underline'>Login</Link></p>
                </div>


            </div>
        </section>
    )
}

export default SignUp
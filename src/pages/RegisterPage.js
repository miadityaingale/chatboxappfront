import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios';
import toast from 'react-hot-toast';

const RegisterPage = () => {

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: ""
  })

  const navigate = useNavigate();

  const [uploadPhoto, setUploadPhoto] = useState("")

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0]
    const uploadPhoto = await uploadFile(file)
    setUploadPhoto(file)

    setData((preve) => {
      return {
        ...preve,
        profile_pic: uploadPhoto?.url
      }
    })
  }

  const haldleClearUploadPhoto = (e) => {
    setUploadPhoto(null)
    e.stopPropagation()
    e.preventDefault()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`

    try {
      const response = await axios.post(URL, data)
      toast.success(response.data.message)

      if (response.data.success) {
        setData({
          name: "",
          email: "",
          password: "",
          profile_pic: ""
        })

        navigate('/email')
      }

    } catch (error) {
      toast.error(error?.response?.data?.message)
    }

  }

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  return (
    <div className='mt-5'>

      <div className='bg-white w-full max-w-md mx:2 rounded overflow-hidden p-4 md:mx-auto'>
        <h3 className='text-center'>Welcome to Chat Box</h3>

        <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>

          <div className='flex flex-col gap-1'>
            <label htmlFor='name'>Name </label>
            <input type='text' id='name' name='name' placeholder='Enter your name'
              value={data.name} onChange={handleOnChange}
              className='bg-slate-100 px-2 py-1 focus:outline-primary' required />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='email'>Email </label>
            <input type='email' id='email' name='email' placeholder='Enter your email'
              value={data.email} onChange={handleOnChange}
              className='bg-slate-100 px-2 py-1 focus:outline-primary' required />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='password'>Password </label>
            <input type='password' id='password' name='password' placeholder='Enter your password'
              value={data.password} onChange={handleOnChange}
              className='bg-slate-100 px-2 py-1 focus:outline-primary' required />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='profile_pic'>Profile Picture
              <div className='h-10 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer'>
                <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                  {
                    uploadPhoto?.name ? uploadPhoto?.name : 'Upload Profile photo'
                  }
                </p>
                {
                  uploadPhoto?.name && (
                    <button className='text-lg ml-2 hover:text-red-600' onClick={haldleClearUploadPhoto}>
                      <IoClose />
                    </button>
                  )
                }

              </div>
            </label>
            <input type='file' id='profile_pic' name='profile_pic'
              onChange={handleUploadPhoto}
              className='bg-slate-100 px-2 py-1 focus:outline-primary hidden'
            />
          </div>

          <button className='bg-primary text-lg px-4 py-1 rounded mt-4 font-bold text-white hover:bg-secondary'>Register</button>

        </form>

        <p className='my-3 text-center'>Already have Account? <Link to={"/email"} className='hover:text-primary'>Login</Link></p>

      </div>

    </div>

  )
}

export default RegisterPage
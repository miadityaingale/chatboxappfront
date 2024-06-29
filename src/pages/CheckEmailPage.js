import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { LuUserCircle2 } from "react-icons/lu";

const CheckEmailPage = () => {

    const [data, setData] = useState({
      email: ""
    })
  
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      e.stopPropagation()
  
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`
  
      try {
        const response = await axios.post(URL, data)
        toast.success(response.data.message)
        if (response.data.success) {
          setData({
            email: ""
          })
  
          navigate('/password',{
            state : response?.data?.data
          })
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

      <div className='w-fit mx-auto mb-2'>
        <LuUserCircle2 size={50}/>
      </div>

        <h3 className='text-center'>Welcome to Chat Box</h3>

        <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>


          <div className='flex flex-col gap-1'>
            <label htmlFor='email'>Email </label>
            <input type='email' id='email' name='email' placeholder='Enter your email'
              value={data.email} onChange={handleOnChange}
              className='bg-slate-100 px-2 py-1 focus:outline-primary' required />
          </div>

          <button className='bg-primary text-lg px-4 py-1 rounded mt-4 font-bold text-white hover:bg-secondary'>Login</button>

        </form>

        <p className='my-3 text-center'>Not having Account? <Link to={"/register"} className='hover:text-primary'>Register</Link></p>

      </div>

    </div>
  )
}

export default CheckEmailPage
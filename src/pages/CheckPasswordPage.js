import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Avatar from '../components/Avatar';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../redux/userSlice';

const CheckPasswordPage = () => {

    const [data, setData] = useState({
      password : ""
    })
  
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // console.log("location", location.state)

    useEffect(()=>{
      if(!location?.state?.name){
        navigate('/email')
      }
    },[])
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      e.stopPropagation()
  
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`
  
      try {
        const response = await axios({
          method : 'post',
          url: URL,
          data: {
            userId: location?.state?._id,
            password: data.password
          },
          withCredentials : true
        })
        toast.success(response.data.message)

        if (response.data.success) {
          dispatch(setToken(response?.data?.token))
          localStorage.setItem('token',response?.data?.token)
          setData({
            password: ""
          })
  
          navigate('/')
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

      <div className='w-fit mx-auto mb-2 flex justify-center items-center flex-col'>
        {/* <LuUserCircle2 size={50}/> */}
        <Avatar width={70} height={70} name={location?.state?.name} imageUrl={location?.state?.profile_pic} />
        <h2 className='font-semibold mt-1 text-lg'>{location?.state?.name}</h2>
      </div>

        <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>


          <div className='flex flex-col gap-1'>
            <label htmlFor='password'>Password </label>
            <input type='password' id='password' name='password' placeholder='Enter your password'
              value={data.password} onChange={handleOnChange}
              className='bg-slate-100 px-2 py-1 focus:outline-primary' required/>
          </div>

          <button className='bg-primary text-lg px-4 py-1 rounded mt-4 font-bold text-white hover:bg-secondary'>Authenticate</button>

        </form>

        <p className='my-3 text-center'><Link to={"/forgot-password"} className='hover:text-primary'>Forgot Password</Link></p>

      </div>

    </div>
  )
}


export default CheckPasswordPage
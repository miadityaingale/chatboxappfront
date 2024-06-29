import React, { useEffect, useRef, useState } from 'react'
import Avatar from './Avatar'
import uploadFile from '../helpers/uploadFile'
import Divder from './Divider'
import { TbCameraPlus } from "react-icons/tb";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

const EditUserDetails = ({ onClose, user }) => {

    const dispatch = useDispatch()

    const uploafPhotoRef = useRef()

    const [data, setData] = useState({
        name: user.name,
        profile_pic: user.profile_pic

    })

    useEffect(() => {
        setData((preve) => {
            return {
                ...preve,
                ...user
            }
        })
    },[user])

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleOpenUploadPhoto = (e) => {
         e.preventDefault()
        e.stopPropagation()
        uploafPhotoRef.current.click()
    }

    const handleUploadPhoto = async (e) => {
        const file = e.target.files[0]
        const uploadPhoto = await uploadFile(file)

        setData((preve) => {
            return {
                ...preve,
                profile_pic: uploadPhoto?.url
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        try{
            const URL = `${process.env.REACT_APP_BACKEND_URL}/api/update-user`
            const response = await axios({
                method : 'post',
                url : URL,
                data : data,
                withCredentials : true
            })
            toast.success(response?.data?.message)

            if(response.data.success){
                dispatch(setUser(response.data.data))
                onClose()
            }

        }catch(error){
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center z-10'>
            <div className='bg-white p-5 m-1 py-4 rounded w-full max-w-sm'>
            <p className='text-xs text-center text-red-700'>Profile update is under construction. Name & Profile Picture can't Updated</p>
                <h2 className='font-semibold text-center'>Profile</h2>

                <form className='grid gap-4 mt-2' onSubmit={handleSubmit}>

                    <div>
                        <div className='my-1 flex justify-center items-center gap-5'>
                            <Avatar width={60} height={60} name={data?.name} imageUrl={data?.profile_pic} />
                            <label htmlFor='profile_pic'>
                                <button className='font-semibold' onClick={handleOpenUploadPhoto}><TbCameraPlus size={20} /></button>
                                <input type='file' id='profile_pic' className='hidden' onChange={handleUploadPhoto} ref={uploafPhotoRef} />
                            </label>
                        </div>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <input type='text' id='name' name='name' placeholder='Enter your name'
                            value={data.name} onChange={handleOnChange}
                            className='bg-slate-100 px-2 py-1 focus:outline-primary' required />
                    </div>

                    <Divder />

                    <div className='flex gap-2 w-fit ml-auto'>
                        <button onClick={onClose} className='rounded border-primary text-color-primary border px-4 py-1 hover:bg-primary hover:text-color-white'>Cancle</button>
                        <button disabled onClick={handleSubmit} className='rounded border-primary text-color-white bg-primary border px-4 py-1 hover:bg-slate-100 hover:text-color-black'>Save</button>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default EditUserDetails
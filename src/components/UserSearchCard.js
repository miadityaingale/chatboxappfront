import React from 'react'
import Avatar from './Avatar'
import { Link } from 'react-router-dom'

const UserSearchCard = ({user, onClose}) => {
  return (
    <Link onClick={onClose} to={"/"+user?._id} className='flex items-center gap-3 p-2 hover:border hover:border-primary rounded cursor-pointer'> 
        <div>
            <Avatar
                width={40}
                height={40}
                name={user?.name}
                userId={user?._id}
                imageUrl={user?.profile_pic}
            />
        </div>
        <div>
            <div className='font-semibold text-ellipsis line-clamp-1'>
                {user?.name}
            </div>
            <p className='text-sm text-ellipsis line-clamp-1'>{user?.email}</p>
        </div>
    </Link>
  )
}

export default UserSearchCard

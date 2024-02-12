import React from 'react'
import service from '../appwrite/conf'
import { Link } from 'react-router-dom'

function PostCard({$id, title, image, authorName}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full card-hover rounded-xl p-4  bg-gray-700'>
            <div className='w-full justify-center mb-4 h-[80%]'>
                <img src={service.getFilePreview(image)} alt={title} className='rounded-xl object-cover' />
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
            <h2 className='text-xl font-bold'>{authorName}</h2>

        </div>
    </Link>
  )
}

export default PostCard
import React, { useState } from 'react';
import service from '../appwrite/conf';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authService from '../appwrite/auth';

function PostCard({$id, title, image, authorName, likes: initialLikes}) {

  const [likes, setLikes] = useState(initialLikes);
  const [canlike, onCanLike] = useState(true);
  const [hasLiked, setHasLiked] = useState(false);
  const userDetails = useSelector((state) => state.auth.userData);


  const handleLike = async () => {
    if(!hasLiked) {
    try {
      await service.likePost($id, userDetails.$id);
      setLikes(likes + 1);
      setHasLiked(true);
    
    } catch (error) {
      console.error('Error liking the post', error);
       }

     } else {
      try {
        await service.likePost($id, userDetails.$id);
        setLikes(likes - 1);
        setHasLiked(false);

      } catch (error) {
        console.error('Error unliking post', error);
      }
      
     }
   }

  return (
    <>
      <div className='w-full h-96 card-hover rounded-xl p-4  bg-gray-700'>
        <Link to={`/post/${$id}`}>
            <div className='w-full justify-center mb-4 h-[68%]'>
                <img src={service.getFilePreview(image)} alt={title} className='rounded-xl h-full w-full object-cover' />
            </div>
            <h2 className='text-xl font-bold text-white'>{title}</h2>
            <h2 className=' text-base font-bold text-white'>Auhtor: {authorName}</h2> 
         </Link>    
         <i class="fa fa-thumbs-up text-2xl mr-2 text-gray-300 hover:text-blue-500" onClick={handleLike}></i>
         <span className="text-gray-300 hover:text-blue-500">{likes}</span>
      </div>
    </>
  )
}

export default PostCard
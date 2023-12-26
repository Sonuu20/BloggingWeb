import React, {useState, useEffect} from 'react'
import service from '../appwrite/conf'
import { Container, PostCard } from '../compoents'


function AllPost() {

    const [posts, setPost] = useState([])
    useEffect(() => {

    },[])

    service.getPost([])
    .then((posts) => {
        if(posts) {
            setPost(posts.documents) //agr error aaya toh post kr dena
        }
    })

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
            {posts.map((post) => (
                <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard post={post} />
                </div>
        
            ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPost
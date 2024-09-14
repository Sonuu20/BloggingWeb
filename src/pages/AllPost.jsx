import React, {useState, useEffect, Suspense} from 'react'
import service from '../appwrite/conf'
// import { Container, PostCard } from '../compoents'
 
const Container = React.lazy(() => import("../compoents/Container/Container"))
const PostCard = React.lazy(() => import("../compoents/PostCard"))
function AllPost() {

    const [posts, setPost] = useState([])

    useEffect(() => {
        service.getPost([])
    .then((posts) => {
        if(posts) {
            setPost(posts.documents) //agr error aaya toh post kr dena
        }
    })
    },[])


  return (
    <div className='w-full sm:py-8 py-0'>
        <div><h1 className='text-[2rem] md:text-[2.5rem] text-center text-white font-semibold'>All Posts</h1></div>
       <Suspense fallback={<p>This is loading...</p>}>
       <Container>
            {
                posts.length>0 ? (
                <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4'>
                        <PostCard {...post} />
                    </div>
            
                ))}
                </div> ): (
                 <div className='text-center' >Nothing to Show</div>
                )
            }
           
        </Container>
       </Suspense>
    </div>
  )
}

export default AllPost
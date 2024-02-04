import React, {useEffect, useState} from 'react'
import service from '../appwrite/conf'
import { Container, PostCard } from '../compoents/index'

function Home() {
    const [posts, setPost] = useState([])

    useEffect(() => {
        service.getPosts()
        .then((posts) => {
            if(posts){
                setPost(posts.documents)
            }
        })
    },[])

    if(posts.length === 0){
        return (
            <div className='w-full py-8 mt-4 text-center'>
            <Container>
                <div className='flex flex-wrap'>
                    <div className='p-2 w-full'>
                        <h1 className='text-2xl font-bold hover:text-gray-500'>
                            Login to read posts
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
        )
    }

    //post ke jagha posts bhi ho sakta h..
    return (
        <div className=' w-full py-8 '>
             <div><h1 className='text-[2rem] md:text-[2.5rem] text-center font-semibold'>All Posts</h1></div>
            <Container>
                <div className=' flex-root sm:flex flex-wrap justify-center items-center  bg-slate-800 '>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'>
                            <PostCard {...post}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
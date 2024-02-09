import React, {useEffect, useState} from 'react'
import service from '../appwrite/conf'
import { Button, Container } from '../compoents/index'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Home() {
    const status = useSelector(state => state.auth.status)

    const navigate = useNavigate()
    const navigateHome = () => {
        if(status){
            navigate('/all-posts')
        }else{
            navigate('/signup')
        }
    }
   

    //post ke jagha posts bhi ho sakta h..
    return (
        <div className=' w-full md:py-8 mt-4 mb-8 text-center '>
            <Container>
                <div className='flex flex-col md:flex-row md:my-14 items-center justify-around'>
                    <div className='md:w-[40%] flex flex-col items-center md:items-start'>
                        <h1 className='text-3xl md:text-[52px] lg:text-[72px] md:text-left text-center hero-heading'>Welcome to the<span className='py-2 gradient-text'>BlogApp!</span></h1>
                        <p className='md:texxt-left mt-6 text-center px-5 md:px-0 text-white'>Your hub for itnteresting reads, insights, & more. Start your journey into the world of our blog app.Happy reading!</p>
                        <Button
                        onClick={() => navigateHome()}
                        className='my-4 mx-auto py-2 px-5 text-[#33BBCF] border-2 bg-inherit border-[#33BBCF] rounded-xl shadow-lg duration-200 hover:cursor-pointer  hover:bg-[#33BBCF] hover:text-white hover:scale-105 md:mx-2 md:my-6 '
                        >
                            {status? "See Posts": "Get Started"}
                        </Button>
                    </div>

                    <div className='md:w-[45%] mt-10 md:mt-0 flex justify-center'>
                        <div className='border-[5px] w-full max-w-[500px] rounded-xl overflow-hidden border-white shadow-2xl shadow-white/30'>
                            <img src="https://www.shutterstock.com/image-vector/content-writer-blog-articles-creation-600nw-2141979401.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Home
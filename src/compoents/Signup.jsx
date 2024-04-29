import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import {useForm} from 'react-hook-form'
import GoogleOAuth from './GoogleOAuth'


function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState("") //null nahi toh empty string bhi de sakte h
    const {register, handleSubmit} = useForm()
    const [isLoading, setIsLoading] = useState(false)

    //account signup
    const create = async(data) => {
        setError("")
        setIsLoading(true);
        try {
            const signup = await authService.createAccount(data)
            if(signup) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }finally {
            setIsLoading(false)
        }
    };    

  return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-2 w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
             <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/SignUp"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
            </p>
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

            
            <form onSubmit={handleSubmit(create) }>
            <div className='space-y-5 text-black'>
                {/* Input for name */}
                  <Input 
                  label="Name:"
                  placeholder="Enter your name"
                  type="text"
                  {...register("name",{
                      required: true,
                      maxLength: 30,
                   })}
                   />
                   {/* Input for email */}
                    <Input  
                     label="Email:"
                     placeholder="Enter your email.."
                     type="email"
                     {...register("email", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                        }
                      })}
                     />
                    {/* Input for password */}
                    <Input 
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    {...register("password", {
                        required: true,
                        minLength:  {
                            value: 5,
                            message: 'Password is too short',
                        },
                        maxLength: 20,
                        //minlength & maxlength can be added for it
                    })}
                    />
                    
                    <Button children={"Sign in"}
                    type='submit'
                    className='w-full'
                    />

            </div>
            </form>
            
            <GoogleOAuth />
        </div>
    </div>
  )
}

export default Signup
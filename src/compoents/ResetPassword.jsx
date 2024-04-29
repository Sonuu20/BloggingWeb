import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Navigate } from 'react-router-dom'
import Input from './Input'
import { useForm } from 'react-hook-form'
import Button from './Button'
import Container from './Container/Container'

const ResetPassword = () => {
    
    const [error, setError] = useState('')
    const {register, handleSubmit} = useForm({
      defaultValues: {
        firstName: "",
        confirmpassword: "",
        resetpassword: "",
      }
    })

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("userId");
    const secret = urlParams.get("secret");

    const login = async (data) => {
        if(data.newpassword !== data.confirmpassword){
            alert('Password do not match. Please try again');
            return;
        }
        try {
        
          const resetPassword =  await authService.resetPassword(userId, secret, data.newpassword);
          console.log(data.newpassword);
            alert('NewPassword set succesfully');
          if(resetPassword) {
            Navigate('/login');
          }

        } catch (error) {
            setError(JSON.stringify(error));
        }
        
    }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4 bg-gray-200">Reset Password</h1>
      <form onSubmit={handleSubmit(login)} className="w-full max-w-md space-y-4">
        <div className="flex flex-col">
          <label htmlFor="newPassword" className="text-sm font-medium mb-2 text-gray-200">
            New Password :
          </label>
          <Container>
          <Input
            id="resetpassword"
            type="password"
            {...register("newpassword", {
              required: true,
              minLength:  {
                  value: 5,
                  message: 'Password is too short',
              },
              maxLength: 20,
          })}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full px-3 py-2 text-base leading-loose border-gray-300 outline-none"
            required
          />
          </Container>      
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirmpassword" className="text-sm font-medium mb-2 text-gray-200">
            Confirm Password :
          </label>
          <Container>
           <Input
            id="confirmpassword"
            type="password"
            required
            // value={confirmPassword}
            // onChange={(e) => setConfirmPassword(e.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full px-3 py-2 text-base leading-loose border-gray"
            {...register("confirmpassword", {
              required: true,
              minLength:  {
                  value: 5,
                  message: 'Password is too short',
              },
              maxLength: 20,
          })}
            />
          </Container>
         </div>
         
         <Button
         type='submit'
         className='inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 select-none'
         >
            Reset Password
         </Button>
        </form>
    </div>
  )
}

export default ResetPassword
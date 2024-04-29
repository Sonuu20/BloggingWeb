import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth';
import Button from './Button';


function GoogleOAuth() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()

      //for google account creation
      const handleGoogleSignup = async () => {
        setIsLoading(true)
        try {
            const response = await authService.createOAccount();
            if(response) {
                const userData = await authService.getCurrentUser();
                // console.log(userData);
                if(userData || response.user) dispatch(authLogin(userData || response.user))
                navigate('/');
            }
        } catch (error) {

            setError(error.message);
            
        }finally {
            setIsLoading(false);
        }
    }

  return (
    <div>
        <h3>Or </h3>
                <Button
                 className='w-full flex bg-slate-900 hover:bg-slate-800 text-gray-200 items-center justify-center gap-2 outline-red-700'
                 onClick={handleGoogleSignup}
                //  disabled={isLoading}
                >
                 {isLoading ? (
                <div className="loading-indicator">Signing in with Google...</div>
           )  : (
                <>
                 <img src="https://e7.pngegg.com/pngimages/168/533/png-clipart-google-logo-google-logo-google-home-google-now-google-plus-company-text.png" loading='eager' alt="Google logo" width="40" height="20" className=' bg-inherit' />
                 <span>Sign in with Google</span>
                </>
                )}
             </Button>
    </div>
  )
}

export default GoogleOAuth
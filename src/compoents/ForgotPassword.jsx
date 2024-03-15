import React, {useState} from 'react'
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';
import Input from './Input';
import Container from './Container/Container';
import Button from './Button';

const ForgotPassword = () => {
    // const [email, setEmail] = useState('');
    const {register, handleSubmit} = useForm()

    const login = async ({email}) => {
        try {
            await authService.forgotPassword(email);
            alert("Email sent successfully.");
            setEmail('');
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-3xl font-bold mb-4 bg-gray-200">Forgot Password</h1>
    <form onSubmit={handleSubmit(login)} className="w-full max-w-md space-y-4">
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-medium mb-2 text-gray-200">
          Enter your Email Address:
        </label>
        <Container>
        <Input
          id="email"
          type="email"
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          {...register("email", {
            required: true,
            validate: {
                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
            "Email address must be a valid address",
            }
        })}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full px-3 py-2 text-base leading-loose border-gray-300 outline-none"
          required
        />
        </Container>
      </div>
      <Button
        type="submit"
        className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700"
      >
        Send Reset Link
      </Button>
    </form>
  </div>
  )
}

export default ForgotPassword
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";
import GoogleOAuth from "./GoogleOAuth";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [passVisible, setPassVisible] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handlePassVisibility = () => {
    setPassVisible(!passVisible);
  };

  const login = async (data) => {
    setError("");
    setIsSigningIn(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSigningIn(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 md:p-4 p-2"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="w-full md:max-w-xl max-w-lg bg-white rounded-2xl shadow-2xl p-8 space-y-6"
        variants={childVariants}
      >
        <motion.div className="text-center" variants={childVariants}>
          <Logo width="100" className="mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
            >
              Sign Up
            </Link>
          </p>
        </motion.div>

        {error && (
          <motion.p
            className="text-red-600 text-center bg-red-100 p-3 rounded-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}

        <motion.form
          onSubmit={handleSubmit(login)}
          className="space-y-6"
          variants={childVariants}
        >
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            error={errors.email}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          <div className="relative">
            <Input
              label="Password"
              placeholder="Enter your password"
              type={passVisible ? "text" : "password"}
              error={errors.password}
              {...register("password", {
                required: "Password is required",
              })}
            />
            <button
              type="button"
              onClick={handlePassVisibility}
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
            >
              {passVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <Link
              to="/forgotPassword"
              className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
            >
              Forgot Password?
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full py-3 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
            disabled={isSigningIn}
          >
            {isSigningIn ? "Signing in..." : "Sign in"}
          </Button>
        </motion.form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <GoogleOAuth />
      </motion.div>
    </motion.div>
  );
}

export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";
import GoogleOAuth from "./GoogleOAuth";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const create = async (data) => {
    setError("");
    setIsLoading(true);
    try {
      const signup = await authService.createAccount(data);
      if (signup) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
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
      className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 md:p-5 p-2"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="w-full md:max-w-xl max-w-lg bg-white rounded-2xl shadow-2xl p-8 space-y-8"
        variants={childVariants}
      >
        <motion.div className="text-center" variants={childVariants}>
          <Logo width="100" className="mx-auto mb-2" />
          <h2 className="text-3xl font-bold text-gray-900">
            Create an account
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
            >
              Log in
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
          onSubmit={handleSubmit(create)}
          className="space-y-4"
          variants={childVariants}
        >
          <Input
            label="Name"
            placeholder="Enter your name"
            type="text"
            error={errors.name}
            {...register("name", {
              required: "Name is required",
              maxLength: { value: 30, message: "Name is too long" },
            })}
          />
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
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            forPassword={true}
            error={errors.password}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              maxLength: { value: 20, message: "Password is too long" },
            })}
          />
          <Button
            type="submit"
            className="w-full py-3 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign up"}
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

export default Signup;

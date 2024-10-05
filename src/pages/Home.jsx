import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Container } from "../compoents/index";

export default function Home() {
  const status = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navigateHome = () => {
    if (status) {
      navigate("/all-posts");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="w-full md:py-8 mt-4 mb-8 text-center overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row md:my-14 items-center justify-around">
          <motion.div
            className="md:w-[40%] flex flex-col items-center md:items-start"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-3xl md:text-[52px] lg:text-[72px] md:text-left text-center hero-heading"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            >
              Welcome to the{" "}
              <motion.span
                className="py-2 gradient-text"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
              >
                BlogApp!
              </motion.span>
            </motion.h1>
            <motion.p
              className="md:text-left mt-6 text-center px-5 md:px-0 text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            >
              Your hub for interesting reads, insights, & more. Start your
              journey into the world of our blog app. Happy reading!
            </motion.p>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
            >
              <Button
                onClick={navigateHome}
                className="my-4 mx-auto py-2 px-5 text-[#33BBCF] border-2 bg-inherit border-[#33BBCF] rounded-xl shadow-lg duration-200 hover:cursor-pointer hover:bg-[#33BBCF] hover:text-white hover:scale-105 md:mx-2 md:my-6"
              >
                {status ? "See Posts" : "Get Started"}
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="md:w-[45%] mt-10 md:mt-0 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="border-[5px] w-full max-w-[500px] rounded-xl overflow-hidden border-white shadow-2xl shadow-white/30"
              initial={{ scale: 0.9, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <motion.img
                src="https://www.shutterstock.com/image-vector/content-writer-blog-articles-creation-600nw-2141979401.jpg"
                alt="Blog content creation illustration"
                initial={{ filter: "blur(10px)" }}
                animate={{ filter: "blur(0px)" }}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}

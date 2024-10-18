import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Service from "../appwrite/conf";
import { Button, Container } from "../compoents/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userid === userData.$id : false;

  useEffect(() => {
    if (slug) {
      Service.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    Service.deletePost(post.$id).then((status) => {
      if (status) {
        Service.deleteFile(post.image);
        navigate("/");
      }
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return post ? (
    <motion.div
      className="min-h-screen bg-gray-900 py-6 sm:py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Container>
        <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
          <Link
            to="/all-posts"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to All Posts
          </Link>
        </motion.div>
        <motion.div
          className="w-full flex justify-center mb-6 sm:mb-8 relative rounded-xl overflow-hidden shadow-2xl"
          variants={itemVariants}
        >
          <motion.img
            src={Service.getFilePreview(post.image)}
            alt={post.title}
            className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
        <motion.div className="w-full mb-4 sm:mb-6" variants={itemVariants}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            {post.title}
          </h1>
        </motion.div>
        <motion.div
          className="browser-css text-white prose prose-sm sm:prose-base md:prose-lg prose-invert max-w-none"
          variants={itemVariants}
        >
          {parse(String(post.content))}
        </motion.div>

        {isAuthor && (
          <motion.div
            className="flex flex-col sm:flex-row justify-end mt-6 sm:mt-8 space-y-3 sm:space-y-0 sm:space-x-3"
            variants={itemVariants}
          >
            <Link to={`/edit-post/${post.$id}`} className="w-full sm:w-auto">
              <Button
                bgColor="bg-green-500"
                className="w-full sm:w-auto px-4 py-2 rounded-xl hover:bg-green-600 transition-colors duration-300"
              >
                Edit
              </Button>
            </Link>
            <Button
              bgColor="bg-red-600"
              className="w-full sm:w-auto px-4 py-2 rounded-xl hover:bg-red-700 transition-colors duration-300"
              onClick={deletePost}
            >
              Delete
            </Button>
          </motion.div>
        )}
      </Container>
    </motion.div>
  ) : null;
}

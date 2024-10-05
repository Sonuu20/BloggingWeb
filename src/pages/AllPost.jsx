import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import service from "../appwrite/conf";
import Container from "../compoents/Container/Container";
import PostCard from "../compoents/PostCard";

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await service.getPost([]);
        if (fetchedPosts) {
          setPosts(fetchedPosts.documents || []);
          console.log("Fetched posts:", fetchedPosts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="w-full sm:py-8 py-0"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-[2rem] md:text-[2.5rem] text-center text-white font-semibold mb-8"
        variants={itemVariants}
      >
        All Posts
      </motion.h1>
      <Suspense fallback={<p className="text-gray-200">This is loading...</p>}>
        <Container>
          <AnimatePresence>
            {loading ? (
              <motion.div
                className="text-center text-white text-xl"
                variants={itemVariants}
              >
                Loading posts...
              </motion.div>
            ) : posts.length > 0 ? (
              <div className="flex flex-wrap">
                {posts.map((post) => (
                  <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4'>
                    <PostCard {...post} />
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                className="text-center text-white text-xl"
                variants={itemVariants}
              >
                No posts to show
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </Suspense>
    </motion.div>
  );
}

export default AllPost;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ThumbsUp } from "lucide-react";
import service from "../appwrite/conf";
import { Share2 } from "lucide-react";

function PostCard({ $id, title, image, authorName, likes: initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const userDetails = useSelector((state) => state.auth.userData);

  const handleLike = async () => {
    if (!hasLiked) {
      try {
        await service.likePost($id, userDetails.$id);
        setLikes(likes + 1);
        setHasLiked(true);
      } catch (error) {
        console.error("Error liking the post", error);
      }
    } else {
      try {
        await service.likePost($id, userDetails.$id); // Use `unlikePost` for unlike
        setLikes(likes - 1);
        setHasLiked(false);
      } catch (error) {
        console.error("Error unliking the post", error);
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this post: ${title}`,
          url: window.location.origin + "/post/" + $id,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Web Share API is not supported in your browser");
    }
  };

  return (
    <motion.div
      className="w-full h-98 card-hover rounded-xl p-4 bg-gray-700 shadow-lg "
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <Link to={`/post/${$id}`}>
        <motion.div
          className="w-full justify-center mb-4 h-[68%] overflow-hidden rounded-xl"
          whileHover={{ scale: 1.05 }}
        >
          <motion.img
            src={service.getFilePreview(image)}
            alt={title}
            className="h-full w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
        <motion.h2
          className="text-xl font-bold text-white mb-1"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h2>
        <motion.h2
          className="text-base font-bold text-gray-300"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Author: {authorName}
        </motion.h2>
      </Link>
      <motion.div
        className="mt-2 flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.button
          className="flex items-center text-gray-300 hover:text-blue-500 transition-colors duration-200"
          onClick={handleLike}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ThumbsUp
            className={`mr-2 ${hasLiked ? "text-blue-500" : "text-gray-300"}`}
            size={24}
          />
          <span className={`${hasLiked ? "text-blue-500" : "text-gray-300"}`}>
            {likes}
          </span>
        </motion.button>
        <motion.button
          className="text-gray-300 hover:text-blue-500 transition-colors duration-200"
          onClick={handleShare}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Share2 size={24} />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default PostCard;

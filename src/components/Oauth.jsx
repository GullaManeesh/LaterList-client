import React from "react";
import { motion } from "framer-motion";
import { auth, provider } from "../config/firebaseConfig.js";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

function Oauth() {
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      const userData = {
        name: user.displayName,
        email: user.email,
      };
      console.log("userData:", userData);
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/auth/googleAuth",
        userData,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success("user created successfully");
        navigate("/home");
      }
      console.log("res:", res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.button
      onClick={handleGoogleClick}
      type="button"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      className="w-full cursor-pointer bg-black border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition duration-500 
    hover:bg-gradient-to-r hover:from-blue-500 hover:via-pink-700 hover:to-yellow-500 hover:text-white
    ">
      <div className="flex items-center justify-center">
        <img
          src="https://img.icons8.com/color/48/000000/google-logo.png"
          alt="Google Logo"
          className="w-6 h-6 mr-2"
        />
      </div>
    </motion.button>
  );
}

export default Oauth;

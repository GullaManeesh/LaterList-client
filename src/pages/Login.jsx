import React, { useRef } from "react";
import { useState } from "react";
import Nav from "../components/Nav";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Oauth from "../components/Oauth";
import { auth } from "../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useAuth } from "../context/authContext";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [state, setState] = useState("login");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === "signup") {
        const userCred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(auth.currentUser, { displayName: name });

        console.log(userCred);

        const user = userCred.user;
        const userData = {
          name: user.displayName,
          email: user.email,
        };
        const res = await axios.post(
          import.meta.env.VITE_BACKEND_URL + "/api/auth/signup",
          userData,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          toast.success("user created successfully");
          navigate("/home");
          setEmail("");
          setName("");
          setPassword("");
        }
      } else {
        try {
          const user = await signInWithEmailAndPassword(auth, email, password);
          const userData = {
            name: user.user.displayName,
            email: user.user.email,
          };
          const res = await axios.post(
            import.meta.env.VITE_BACKEND_URL + "/api/auth/login",
            userData,
            {
              withCredentials: true,
            }
          );
          console.log(res);
          if (res.data.success) {
            toast.success("you have successfully logged in");
            navigate("/home");
          }
        } catch (error) {
          setError(error.message);
        }
      }
    } catch (error) {
      setError(error.code.replace("auth/", ""));
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Nav />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-md w-full space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mx-auto h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <User className="h-6 w-6 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
            <p className="mt-2 text-sm text-gray-400">
              Sign in to your account to continue
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 space-y-6">
            <div className="space-y-4">
              {/* name input */}
              {state === "signup" && (
                <motion.div whileHover={{ scale: 1.02 }} className="relative">
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      name="name"
                      type="text"
                      className={`block w-full pl-10 pr-3 py-3  rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                      placeholder="name"
                    />
                  </div>
                </motion.div>
              )}
              {/* Email Input */}
              <motion.div whileHover={{ scale: 1.02 }} className="relative">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    type="email"
                    className={`block w-full pl-10 pr-3 py-3  rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Email address"
                  />
                </div>
              </motion.div>

              {/* Password Input */}
              <motion.div whileHover={{ scale: 1.02 }} className="relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className={`block w-full pl-10 pr-10 py-3  rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}>
                      {showPassword ? (
                        <EyeOff className="h-5 cursor-pointer w-5 text-gray-400 hover:text-gray-300" />
                      ) : (
                        <Eye className="h-5 cursor-pointer w-5 text-gray-400 hover:text-gray-300" />
                      )}
                    </motion.div>
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Remember me and Forgot password
            <div className="flex items-center justify-end">
              <motion.a
                onClick={() => navigate("/forget-password")}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200">
                Forgot password?
              </motion.a>
            </div> */}
            <p className="text-red-600 text-sm">{error} </p>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="group cursor-pointer relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
              {state === "signup" ? "Sign Up" : "Log In"}
            </motion.button>

            <Oauth />

            {/* Sign up link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center">
              {state === "signup" ? (
                <p className="text-sm text-gray-400">
                  already have an account?{" "}
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setState("login")}
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium">
                    Log in now
                  </motion.a>
                </p>
              ) : (
                <p className="text-sm text-gray-400">
                  don't have an account?{" "}
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setState("signup")}
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium">
                    Sign up now
                  </motion.a>
                </p>
              )}
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;

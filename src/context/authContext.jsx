import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();
import toast from "react-hot-toast";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/auth/checkAuth",
        { withCredentials: true }
      );
      console.log(res);
      if (res.data.success) {
        setUser(res.data.user);
        console.log("Authenticated user:", res.data.user);
      } else {
        navigate("/");
      }
    } catch (error) {
      setUser(false);
      navigate("/");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

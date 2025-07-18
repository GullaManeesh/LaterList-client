import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Home from "./pages/Home";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

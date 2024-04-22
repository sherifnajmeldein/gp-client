import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "../components/Experience";
import { AavatarUI } from "../components/UI";


import { ChatProvider } from "../hooks/useChat";
import React, { useEffect, useState } from "react";
import "../styles/avatarIndex.css";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function AvatarApp() {
    
    const [token, setToken] = useState(
      JSON.parse(localStorage.getItem("auth")) || ""
    );
    const navigate = useNavigate();
      useEffect(() => {
        //fetchLuckyNumber();
        if (token === "") {
          navigate("/login");
          toast.warn("Please login first to access dashboard");
        }
      }, [token]);
    
  return (
    <>
      <React.StrictMode>
        <ChatProvider>
          <Loader />
          <Leva hidden />
          <AavatarUI />
          <Canvas shadows camera={{ position: [0, 0, 1], fov: 30 }}>
            <Experience />
          </Canvas>
        </ChatProvider>
      </React.StrictMode>
    </>
  );
}

export default AvatarApp;

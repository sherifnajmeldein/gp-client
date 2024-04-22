
import { QuizProvider } from "../hooks/useQuiz";
import "../styles/avatarIndex.css";
import { QuizUi } from '../components/QuizUi';
import React, { useEffect, useState } from "react";
import "../styles/avatarIndex.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function QuizApp() {
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
        <QuizProvider>
          <QuizUi/>
        </QuizProvider>
      </React.StrictMode>
    </>
  );
}

export default QuizApp;

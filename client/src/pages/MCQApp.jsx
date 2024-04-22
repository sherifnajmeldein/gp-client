// QuizApp.js
import React, { useState, useEffect } from "react";
import Question from "../components/mcq/MCQ";
import Result from "../components/mcq/Result";
import "../styles/avatarIndex.css";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../constants/api";


const MCQApp = () => {

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
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rightAnswers, setRightAnswers] = useState(0);

  const getQuestions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/mcq`); // Assuming your server is running on port 3005
      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching questions:", error);
      return [];
    }
  };


  useEffect(() => {
    getQuestions().then((data) => setQuestions(data));
  }, []);

  const handleAnswerSubmit = (selectedAnswer) => {
    const correctAnswer = questions[currentIndex].right_answer;
    if (selectedAnswer === correctAnswer) {
      setRightAnswers(rightAnswers + 1);
    }
    setCurrentIndex(currentIndex + 1);
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setRightAnswers(0);
  };

  return (
    <div className="quiz-app mx-auto w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 bg-gray-100 p-4">
      {currentIndex < questions.length ? (
        <Question
          question={questions[currentIndex]}
          onAnswerSubmit={handleAnswerSubmit}
        />
      ) : (
        <Result
          totalQuestions={questions.length}
          rightAnswers={rightAnswers}
          onReset={resetQuiz}
        />
      )}
    </div>
  );
};

export default MCQApp;

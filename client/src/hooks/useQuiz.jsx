import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../constants/api";

const backendUrl = `${API_BASE_URL}`;

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("auth")) || "";
  const chat = async (message) => {
    setLoading(true);
    const quiz = `generate a 5 question about ${message} `;
    const data = await fetch(`${backendUrl}/quiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quiz }),
    });
    const resp = (await data.json()).messages;
    setMessages((messages) => [...messages, ...resp]);
    setLoading(false);
  };
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  const onMessagePlayed = () => {
    setMessages((messages) => messages.slice(1));
  };

  useEffect(() => {
    if (messages.length > 0) {
      setMessage(messages[0]);
    } else {
      setMessage(null);
    }
  }, [messages]);

  return (
    <QuizContext.Provider
      value={{
        chat,
        message,
        onMessagePlayed,
        loading,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useOuiz must be used within a QuizProvider");
  }
  return context;
};
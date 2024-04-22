import React, { useRef, useEffect ,useState} from "react";
import { useQuiz } from "../hooks/useQuiz";
import img from "../images/NUB.png";
import Header from "../partials/Header";

export const QuizUi = ({ hidden, ...props }) => {
  const input = useRef();
  const { chat, loading, message, onMessagePlayed } = useQuiz();

  const sendMessage = () => {
    const text = input.current.value;
    if (!loading && !message) {
      chat(text);
      input.current.value = "";
    }
  };

  const [userName, setUserName] = useState("");

  useEffect(() => {
        const authToken = localStorage.getItem("auth");
        if (authToken) {
          const tokenPayload = JSON.parse(atob(authToken.split(".")[1]));
          setUserName(tokenPayload.name); // Assuming the name property exists in your JWT payload
        }    

  }, [message]);

  if (hidden) {
    return null;
  }

  return (
    <>
    <div className="print:hidden"><Header /></div>
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none ${
          message ? "hidden" : ""
        }`}
      >
        <div className="w-full flex flex-col items-end justify-center gap-4"></div>

        <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto">
          <input
            className={`w-full placeholder:text-gray-800 placeholder-italic p-4 rounded-md bg-opacity-50 bg-white backdrop-blur-md px-10 py-4 ${
              message ? "hidden" : ""
            }`}
            placeholder="Type your Quiz Topic here..."
            ref={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <button
            disabled={loading || message}
            onClick={sendMessage}
            className={`bg-blue-500 hover:bg-blue-600 text-white p-4 px-10 font-semibold uppercase rounded-md ${
              loading || message ? "cursor-not-allowed opacity-30 hidden" : ""
            }`}
          >
            Send
          </button>
        </div>
      </div>

      {/* Display quiz questions */}
      {message && message.text && (
        <div className="page mx-auto bg-gray-800 bg-opacity-75 w-8/5 h-11/5 p-4 shadow-md border-2 border-black ">
          <div className="header flex justify-between items-center pb-2 border-b border-gray-300 text-sm">
            <div className="text-xl">
              <p>Information Technology</p>
            </div>
            <div className="text-base">
              <p>Course Name: </p>
              <p>Doctor Name: {userName}</p>
              <p>Time Allowed: 10 minutes</p>
            </div>
            <div>
              <img
                src={img}
                alt="Faculty Logo"
                className="w-12 h-12 object-cover"
              />
            </div>
          </div>
          <div className="content h-3/4 p-4">
            <ul className="list-disc list-inside">
              {message.text.split("\n").map((question, index) => (
                <li key={index} className="text-gray-800 mb-2">
                  {question.trim()}
                  {
                    "    \n ............................................................................................................................................................ "
                  }
                  {
                    "    \n ....................................................................................................................................................... "
                  }
                </li>
              ))}
            </ul>
          </div>
          <div className="print-button text-center mt-4">
            <button
              onClick={() => window.print()}
              className=" mt-4 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md mx-5 px-7 py-3 print:hidden"
            >
              Print
            </button>
            <button
              onClick={onMessagePlayed}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md mx-5 px-7 py-3 print:hidden"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
};

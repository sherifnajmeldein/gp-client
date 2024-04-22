import { useState, useEffect, useRef } from "react";
import { useChat } from "../hooks/useChat";
import useSpeechRecognition from "../hooks/useSpeechRecognitionHook";
import Header from "../partials/Header";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../constants/api";

function useFetchData(url, token) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const axiosConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(url, axiosConfig);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      setData(null);
    };
  }, [url, token]);

  return { data, error };
}

export const AavatarUI = ({ hidden, ...props }) => {
  const input = useRef();
  const { chat, loading, cameraZoomed, setCameraZoomed, message } = useChat();
  const [token] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const { data, error } = useFetchData(
    `${API_BASE_URL}/api/v1/userbooks`,
    token
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isBookSelected, setIsBookSelected] = useState(false);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setIsBookSelected(true); // Set isBookSelected to true when a book is selected
  };

  const {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport,
  } = useSpeechRecognition((recognizedText) => {
    // Callback function to handle the recognized text
    // Pass the recognized text to the chat function
    sendMessage(recognizedText);
  });

const sendMessage = (text) => {
  if (!loading && !message) {
    const messageData = {
      text: text,
      selectedBook: selectedOption, // Include the selected book in the message data
    };
    chat(messageData); // Send the message data as a JSON string
    input.current.value = "";
  }
};

  const handleStartListening = () => {
    if (!isBookSelected) {
      toast.warn("Please select a book"); // Show warning if no book is selected
    } else {
      startListening();
    }
  };

  if (hidden) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="fixed top-20 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
        <div className="self-start backdrop-blur-md bg-white bg-opacity-50 p-4 rounded-lg">
          <h1 className="font-black text-xl">Eng Seham</h1>
          <p>How can I help you today?</p>
        </div>
        <div className="w-full flex flex-col items-end justify-center gap-4">
          <button
            onClick={() => setCameraZoomed(!cameraZoomed)}
            className="pointer-events-auto bg-blue-700 hover:bg-blue-800 text-white p-4 rounded-md"
          >
            {" "}
            {cameraZoomed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm mx-auto">
          <button
            onClick={handleStartListening}
            disabled={!isBookSelected} // Disable the button if no book is selected
            className={`bg-red-600 hover:bg-red-700  p-4 px-5 rounded-md ${
              loading || message || !isBookSelected
                ? "cursor-not-allowed opacity-30"
                : ""
            }`}
          >
            <svg
              width="50px"
              height="50px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6H13C12.4477 6 12 6.44772 12 7C12 7.55228 12.4477 8 13 8H14V10H13C12.4477 10 12 10.4477 12 11C12 11.5523 12.4477 12 13 12H14V13C14 14.1046 13.1046 15 12 15C10.8954 15 10 14.1046 10 13V6ZM12 2C9.79086 2 8 3.79086 8 6V13C8 15.2091 9.79086 17 12 17C14.2091 17 16 15.2091 16 13V11V7V6C16 3.79086 14.2091 2 12 2ZM7 11C7 10.4477 6.55228 10 6 10C5.44772 10 5 10.4477 5 11V13C5 16.5265 7.60771 19.4439 11 19.9291V21H8C7.44772 21 7 21.4477 7 22C7 22.5523 7.44772 23 8 23H12H16C16.5523 23 17 22.5523 17 22C17 21.4477 16.5523 21 16 21H13V19.9291C16.3923 19.4439 19 16.5265 19 13V11C19 10.4477 18.5523 10 18 10C17.4477 10 17 10.4477 17 11V13C17 15.7614 14.7614 18 12 18C9.23858 18 7 15.7614 7 13V11Z"
                  fill="#fcfcfc"
                />{" "}
              </g>
            </svg>
          </button>
          <button
            onClick={stopListening}
            className={`bg-stone-500 hover:bg-stone-600 p-4 px-5 rounded-md `}
          >
            {" "}
            <svg
              width="50px"
              height="50px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#000000"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M15 9.4V5C15 3.34315 13.6569 2 12 2C10.8224 2 9.80325 2.67852 9.3122 3.66593M12 19V22M8 22H16M3 3L21 21M5.00043 10C5.00043 10 3.50062 19 12.0401 19C14.51 19 16.1333 18.2471 17.1933 17.1768M19.0317 13C19.2365 11.3477 19 10 19 10M15 6H13M12 15C10.3431 15 9 13.6569 9 12V9L14.1226 14.12C13.5796 14.6637 12.8291 15 12 15Z"
                  stroke="#fcfcfc"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />{" "}
              </g>
            </svg>
          </button>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
          >
            <span>{selectedOption ? selectedOption : "Select a Book"}</span>
            <svg
              className="fill-current h-4 w-4 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 12l-6-6 1.5-1.5L10 9l4.5-4.5L16 6l-6 6z"
              />
            </svg>
            {showDropdown && (
              <div className="absolute left-10 top-20 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  {data.map((option, index) => (
                    <button
                      key={index}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => {
                        handleOptionChange(option);
                        setShowDropdown(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </button>
          {isListening ? <div>Your browser is currently listening</div> : null}
          {text}
        </div>
      </div>
    </>
  );
};

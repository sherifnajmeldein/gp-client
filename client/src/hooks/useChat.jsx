import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../constants/api";

// Define the URL for the backend server where chat messages will be sent.
const backendUrl = `${API_BASE_URL}`;

// Create a new React context.
const ChatContext = createContext();
// Get the token from localStorage

// Define a provider component that manages the chat system.
export const ChatProvider = ({ children }) => {
  // Get the token from localStorage
  const token = JSON.parse(localStorage.getItem("auth")) || "";
  // Define a function 'chat' to send a message to the backend server.
  const chat = async (message) => {
    // Set loading state to true to indicate that a message is being sent.
    setLoading(true);

    // Send a POST request to the backend with the user's message.
    const data = await fetch(`${backendUrl}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Send the token in the Authorization header
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
    });

    // Parse the response and extract the 'messages' property.
    const resp = (await data.json()).messages;

    // Add the received messages to the current messages state.
    setMessages((messages) => [...messages, ...resp]);

    // Set loading state back to false to indicate that the message sending is complete.
    setLoading(false);
  };

  // Initialize state variables using the 'useState' hook.
  const [messages, setMessages] = useState([]); // Stores chat messages.
  const [message, setMessage] = useState(); // Represents the current message being displayed.
  const [loading, setLoading] = useState(false); // Indicates whether a message is being sent.
  const [cameraZoomed, setCameraZoomed] = useState(true); // Indicates if the camera is zoomed.

  // Define a function to handle playing a message.
  const onMessagePlayed = () => {
    // Remove the first message from the message queue.
    setMessages((messages) => messages.slice(1));
  };

  // Use the 'useEffect' hook to update the 'message' state when the 'messages' state changes.
  useEffect(() => {
    if (messages.length > 0) {
      // If there are messages, set the 'message' state to the first message in the queue.
      setMessage(messages[0]);
    } else {
      // If there are no messages, set 'message' to null.
      setMessage(null);
    }
  }, [messages]);

  // Provide the chat-related data and functions to child components via the context.
  return (
    <ChatContext.Provider
      value={{
        chat,
        message,
        onMessagePlayed,
        loading,
        cameraZoomed,
        setCameraZoomed,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Define a custom hook for using the chat context within components.
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

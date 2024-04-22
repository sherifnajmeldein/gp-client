import React from "react";
import { Link } from "react-router-dom";
import cs from '../images/NUB.png';
import uni from '../images/Nahda.png';

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      {/* Logos */}
      <div className="absolute top-14 left-14">
        <img src={uni} alt="NUB Logo" className="w-28  m-4" />
      </div>
      <div className="absolute top-10 right-10">
        <img src={cs} alt="Nahda Logo" className="w-32 h-32 m-4" />
      </div>

      {/* Main content */}
      <h1 className="text-4xl font-bold text-center mb-4">
        AI-powered learning assistant for personalized learning
      </h1>
      <h3 className="text-2xl text-center mb-4">
        "Imagine a library where books are organized not by title, but by their
        <span className="font-bold"> meaning</span>."
      </h3>

      {/* Buttons */}
      <Link to="/login" className="bg-gray-800 text-white hover:bg-white hover:text-gray-800 border-3 border-gray-800 px-6 py-3 rounded-2xl font-semibold text-lg text-center mb-4 w-80">
        Login
      </Link>
      <Link to="/register" className="bg-gray-800 text-white hover:bg-white hover:text-gray-800 border-3 border-gray-800 px-6 py-3 rounded-2xl font-semibold text-lg text-center w-80">
        Register
      </Link>
    </div>
  );
};

export default Landing;

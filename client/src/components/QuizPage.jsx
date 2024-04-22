import React from 'react';
import '../css/style.css'; // Import the CSS file
import NUB from '../images/NUB.png'
import { useQuiz } from '../hooks/useQuiz';


const QuizPage = () => {
  const { chat, loading, message, onMessagePlayed } = useQuiz();

  return (
    <div className="page">
      <div className="header">
        <div>
          <p>Faculty Name</p>
        </div>
        <div>
          <p>Course Name</p>
          <p>Doctor Name</p>
          <p>Time Allowed: 60 minutes</p>
        </div>
        <div>
          <img src={NUB} alt="NUB Logo" />
        </div>
      </div>
      <div className="content">
        {/* Add your 5 written questions here */}
        <p>1. Question 2?</p>
        <p>2. Question 2?</p>
        <p>3. Question 3?</p>
        <p>4. Question 4?</p>
        <p>5. Question 5?</p>
      </div>
    </div>
  );
};

export default QuizPage;

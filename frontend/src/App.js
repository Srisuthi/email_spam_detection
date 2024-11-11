import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false); // New state to track button click

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setResponseMessage("");
    setIsChecked(false); // Reset the checked state when the email changes
  };

  const handleCheckEmail = async () => {
    if (email) {
      setIsChecked(true); // Mark as checked when the button is clicked
      try {
        const response = await axios.post("https://email-spam-detectionn.onrender.com/predict", {
          emails: [email],
        });
        setResponseMessage(
          response.data.predictions
            ? response.data.predictions[0]
            : "No predictions returned."
        );
      } catch (error) {
        setResponseMessage(error.response?.data?.error || "An error occurred.");
      }
    } else {
      setResponseMessage("Please enter an email address.");
    }
  };

  return (
    <div className="app">
      <h2>Enter your email</h2>
      <textarea
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter your email to check"
        required
        className="emailinput"
      />

      <button onClick={handleCheckEmail}>Check</button>
      
        {isChecked && email && <p className="email">Your email: {email}</p>}{" "}
      
        {responseMessage && <p className="response-message">{responseMessage}</p>}
        </div>
  );
}

export default App;

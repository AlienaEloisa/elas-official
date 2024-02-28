import React, { useState } from "react";
import { Paper, Typography, TextField, Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
// import axios from "axios"; // Import axios for making HTTP requests

// Chat component definition as a functional component
const Chat = ({ onClose }) => {
  const [inputMessage, setInputMessage] = useState(""); // State to store the user's input message
  const [chatHistory, setChatHistory] = useState([]); // State to store the chat history
  const [error, setError] = useState(null); // State to store error messages

  // Function to send a message to the chatbot
  const sendMessage = async () => {
    try {
      // const apiUrl = "CHATBOT_API_URL"; // Define the API URL for the chatbot
      // const response = await axios.post(apiUrl, { message: inputMessage }); // Send a POST request to the chatbot API with the user's message
      
      // Update the chat history with the user's message and the bot's response
      setChatHistory([...chatHistory, { role: "user", message: inputMessage }]);
      // setChatHistory([...chatHistory, { role: "bot", message: response.data.message }]); // Update the chat history with the bot's response from the API
      
      // Clear the input field after sending the message
      setInputMessage("");
    } 
    catch (error) {
      console.error("Error sending message:", error); // Log any errors that occur during message sending
      setError("There was an error connecting to the chat service. Please try again."); // Set an error message in case of an error
    }
  };

  // Function to handle closing of the Snackbar displaying errors
  const handleSnackbarClose = () => {
    setError(null); // Reset the error state when the Snackbar is closed
  };

  return (
    // Paper component for the chat UI
    <Paper
      elevation={3}
      style={{
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        width: '300px',
        maxHeight: '400px',
        overflowY: 'auto',
      }} >
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px' }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>

      {/* Input field for sending messages */}
      <div style={{ padding: '8px', borderTop: '1px solid #ccc' }}>
        <TextField
          label="Ask ChatGPT"
          fullWidth
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)} />
        <Button variant="contained" style={{ marginTop: '8px' }} fullWidth onClick={sendMessage}>
          Send
        </Button>
      </div>

      {/* Snackbar for displaying errors */}
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={5000} // Duration for which the Snackbar is displayed
        onClose={handleSnackbarClose} // Function to handle closing of the Snackbar
        message={error} /> // Error message displayed in the Snackbar
    </Paper>
  );
};

export default Chat; // Export the Chat component as the default export

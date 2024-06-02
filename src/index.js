require('dotenv').config();
const express = require('express');
const app = express();
const rateLimit = require("express-rate-limit");
const { generateChatbotResponse } = require('./chatbot');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, 
  message: { error: "Too many requests from this IP, please try again later." }, 
  headers: true, 
})

// Initialize server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

app.post('/api/chatbot', apiLimiter, async (req, res) => {
  try {
    const { text } = req.body;
    const chatResponse = await generateChatbotResponse(text, genAI);
    if (chatResponse) {
      // res.setHeader('Content-Type', 'application/json'); // Thiết lập tiêu đề Content-Type là 'application/json'
      res.send(chatResponse);
    } else {
      res.status(500).json({ message: 'Error generating chat response' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
require('dotenv').config();
const express = require('express');
const app = express();
const rateLimit = require("express-rate-limit");
const { generateNodeResponse } = require('./node');
const { generateChatbotResponse } = require('./chatbot');
const { generateSummarizeResponse } = require('./summarize');
const { generateQuizzesResponse } = require('./quizzes');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

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
    const chatResponse = await generateChatbotResponse(text, model);
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

app.post('/api/summarize', apiLimiter, async (req, res) => {
  try {
    const { text } = req.body;
    const summaryResponse = await generateSummarizeResponse(text, model);
    if (summaryResponse) {
      res.send(summaryResponse);
    } else {
      res.status(500).json({ message: 'Error generating summarize response' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/quizzes', apiLimiter, async (req, res) => {
  try {
    const { text } = req.body;
    const quizzResponse = await generateQuizzesResponse(text, model);
    if (quizzResponse) {
      res.send(quizzResponse);
    } else {
      res.status(500).json({ message: 'Error generating quizz response' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/nodes', apiLimiter, async (req, res) => {
  try {
    const { text } = req.body;
    const nodeResponse = await generateNodeResponse(text, model);
    if (nodeResponse) {
      res.setHeader('Content-Type', 'application/json'); // Thiết lập tiêu đề Content-Type là 'application/json'
      res.send(nodeResponse);
    } else {
      res.status(500).json({ message: 'Error generating node response' });
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
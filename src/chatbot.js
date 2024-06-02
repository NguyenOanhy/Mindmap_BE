
async function generateChatbotResponse(text, genAI) { // Modified to accept a prompt as input
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(text);
    const response = await result.response;
    const generatedText = response.text();
    return generatedText;
  } catch (error) {
    console.error('Error in chatbot generation:', error);
    return null;
  }
}

module.exports = { generateChatbotResponse }; 
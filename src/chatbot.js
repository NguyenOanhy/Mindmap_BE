async function generateChatbotResponse(text, model) { // Modified to accept a prompt as input
  try {
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
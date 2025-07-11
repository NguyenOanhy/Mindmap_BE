async function generateSummarizeResponse(text, model) {
    try {
      const prompt = "hãy tóm tắt đoạn văn sau bằng tiếng Việt: \n" + text;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const generatedText = response.text();
      return generatedText;
    } catch (error) {
      console.error('Error in summarize generation:', error);
      return null;
    }
  }
  
  module.exports = { generateSummarizeResponse }; 
async function generateQuizzesResponse(input, model) {
    try {
      const question = [
        {
          questionText: "Who is Prime Minister of India?",
          answerOptions: [
            { answerText: "Vijay Rupani", isCorrect: false },
            { answerText: "Manmohan singh", isCorrect: false },
            { answerText: "Narendra Modi", isCorrect: true },
            { answerText: "Deep Patel", isCorrect: false }
          ]
        },
        {
          questionText: "Who is CEO of Tata?",
          answerOptions: [
            { answerText: "Jeff Bezos", isCorrect: false },
            { answerText: "Ratan Tata", isCorrect: true },
            { answerText: "Mukesh Ambani", isCorrect: false },
            { answerText: "Gautam Adani", isCorrect: false }
          ]
        },
        {
          questionText: "who is richest person in the world?",
          answerOptions: [
            { answerText: "Jeff Bezos", isCorrect: false },
            { answerText: "Elon Musk", isCorrect: true },
            { answerText: "Mukesh Ambani", isCorrect: false },
            { answerText: "Warren Buffett", isCorrect: false }
          ]
        },
        {
          questionText: "how many countries in the world?",
          answerOptions: [
            { answerText: "120", isCorrect: false },
            { answerText: "183", isCorrect: false },
            { answerText: "170", isCorrect: false },
            { answerText: "195", isCorrect: true }
          ]
        }
      ];
      const jsonString = JSON.stringify(question, null, 2);
      const prompt = "hãy tạo ra 5 câu hỏi trắc nghiệm bằng tiếng Việt có 4 đáp án với 1 một đáp án đúng và 3 đáp án sai, viết 5 câu hỏi đó thành 1 file với cấu trúc như: \n" + jsonString + "\n về những vấn đề liên quan đến đoạn văn sau: \n" + input;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let generatedText = response.text();

      generatedText = generatedText.replace(/```/g, '').replace("json", "");
        // Ép kiểu generatedText sang định dạng JSON
      let jsonData;
        try {
        jsonData = JSON.parse(generatedText);
        } catch (error) {
        console.error('Error parsing generatedText as JSON:', error);
        return null;
        }
        // Chuyển đổi jsonData thành chuỗi JSON
        const jsonS = JSON.stringify(jsonData, null, 2);
        return jsonS;
    } catch (error) {
      console.error('Error in node response generation:', error);
      return null;
    }
  }

  module.exports = { generateQuizzesResponse };  
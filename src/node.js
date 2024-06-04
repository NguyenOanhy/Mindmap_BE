async function generateNodeResponse(input, model) {
    try {
      const json_ex = {
        "001": {
          "_key": "001",
          "name": "Node Main",
          "father": "",
          "sortList": ["002", "003", "004", "005"]
        },
        "002": {
          "_key": "002",
          "name": "Two",
          "father": "001",
          "sortList": ["006", "007"]
        },
        "003": {
          "_key": "003",
          "name": "Three",
          "father": "001",
          "sortList": []
        },
        "004": {
          "_key": "004",
          "name": "Four",
          "father": "001",
          "sortList": []
        },
        "005": {
          "_key": "005",
          "name": "Five",
          "father": "001",
          "sortList": []
        },
        "006": {
          "_key": "006",
          "name": "Six",
          "father": "002",
          "sortList": ["008", "009"]
        },
        "007": {
          "_key": "007",
          "name": "Seven",
          "father": "002",
          "sortList": []
        },
        "008": {
          "_key": "008",
          "name": "Eight",
          "father": "006",
          "sortList": []
        },
        "009": {
          "_key": "009",
          "name": "Nine",
          "father": "006",
          "sortList": ["010"]
        },
        "010": {
          "_key": "010",
          "name": "aiu",
          "father": "009",
          "sortList": []
        }
      };
      const jsonString = JSON.stringify(json_ex, null, 2);
      const prompt = "Phân tích toàn bộ thông tin từ đoạn văn sau một cách chi tiết hết mức có thể thành file json có cấu trúc như một sơ đồ tư duy (mindmap) bằng tiếng Việt, _key phải là những số tự nhiên, cấu trúc giống như:" + jsonString + "\nkhông cần chú thích hay giải thích cho sơ đồ, và hãy có nhiều node và phân cấp nhiều bậc cho đoạn văn dài" + " đây là đoạn văn mà bạn cần phân tích thành mindmap:\n" + input
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

  module.exports = { generateNodeResponse };  
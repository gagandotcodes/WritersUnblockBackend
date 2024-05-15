import axios from "axios";


const generateTitles = async (keywords, difficulty) => {
  try {
    // convert array of keywords to text
    let keywordString = "";
    for (let keyword of keywords) {
      keywordString = keywordString + "," + keyword;
    }

    let data = JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `Give me 10 topics to practice writing based on these keywords: ${keywordString}; keep the difficulty ${difficulty}: return only the titles saperated by &&&. Note: if any of the keywords are offensive or violates the policy, just ignore it`,
            },
          ], 
        },
      ],
      generationConfig: {
        // response_mime_type: "application/json",
        temperature: 0,
        topK: 0,
        topP: 0.95,
        maxOutputTokens: 8192,
        stopSequences: [],
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${process.env.GEMINI_KEY}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    let apiResponse = response.data.candidates[0].content.parts[0].text;
   
    const responseArray = covertResponseToArray(apiResponse);
    return {
      success: true,
      statusCode: 200,
      result: responseArray
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      statusCode: 500,
      message: 'Something went wrong!'
    };
  }
};

function covertResponseToArray(apiResponse){
    return apiResponse.split(' &&& ');
}

const titleServices = {
  generateTitles,
};
export default titleServices;

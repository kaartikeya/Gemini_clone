import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Debugging: Check if API key is loaded correctly (REMOVE in production)
console.log("Loaded API Key:", apiKey);

if (!apiKey) {
  throw new Error("Missing API key! Please check your .env file.");
}
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 1024,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  console.log(result);
  const response = result.response;
  console.log(result.response.text());
  return response.text();
}

export default run;

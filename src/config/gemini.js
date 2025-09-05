import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Use environment variables for your API key
const apiKey = "AIzaSyB5tttuw9_wVr8fXwy - VTILblOIzJcfo8s";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// This will hold our persistent chat session
let chatSession;

// Function to initialize a new chat session
export const startNewChat = () => {
  chatSession = model.startChat({
    generationConfig,
    history: [], // Start with a clean history
  });
};

// Function to send a message to the existing session
export const sendMessageToChat = async (prompt) => {
  if (!chatSession) {
    // If chat hasn't been started, start it first
    startNewChat();
  }
  const result = await chatSession.sendMessage(prompt);
  return result.response.text();
};

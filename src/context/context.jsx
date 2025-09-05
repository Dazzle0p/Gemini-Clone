import { createContext, useEffect, useState, useMemo } from "react";
import { startNewChat, sendMessageToChat } from "../config/gemini";

export const Context = createContext();

const getInitialChats = () => {
  try {
    const savedChats = localStorage.getItem("gemini-clone-chats");
    return savedChats ? JSON.parse(savedChats) : {};
  } catch (error) {
    console.error("Failed to parse chats from localStorage", error);
    return {};
  }
};

const ContextProvider = (props) => {
  const [activeChatId, setActiveChatId] = useState(
    () => localStorage.getItem("activeChatId") || null
  );

  const [allChats, setAllChats] = useState(getInitialChats);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const recognition = useMemo(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported in this browser.");
      return null;
    }
    const rec = new SpeechRecognition();
    rec.interimResults = true;
    return rec;
  }, []);

  const displayHistory = allChats[activeChatId] || [];

  // --- EFFECTS TO SYNC WITH LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("gemini-clone-chats", JSON.stringify(allChats));
  }, [allChats]);

  useEffect(() => {
    if (activeChatId) {
      localStorage.setItem("activeChatId", activeChatId);
    } else {
      localStorage.removeItem("activeChatId");
    }
  }, [activeChatId]);

  // --- Function to handle voice input
  const startListening = () => {
    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setInput(transcript);
    };

    recognition.onspeechend = () => {
      recognition.stop();
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };
  };

  const onSent = async (prompt) => {
    const currentPrompt = prompt !== undefined ? prompt : input;
    if (!currentPrompt) return;

    setLoading(true);
    setInput("");

    let chatId = activeChatId;

    if (!chatId) {
      chatId = `chat_${Date.now()}`;
      setActiveChatId(chatId);
      setAllChats((prev) => ({
        ...prev,
        [chatId]: [{ prompt: currentPrompt, response: "..." }],
      }));
    } else {
      setAllChats((prev) => ({
        ...prev,
        [chatId]: [...prev[chatId], { prompt: currentPrompt, response: "..." }],
      }));
    }

    const response = await sendMessageToChat(currentPrompt);
    const finalResponse = response;

    setAllChats((prev) => {
      const currentChatHistory = [...prev[chatId]];
      currentChatHistory[currentChatHistory.length - 1].response =
        finalResponse;
      return { ...prev, [chatId]: currentChatHistory };
    });

    setLoading(false);
  };

  const newChat = () => {
    setActiveChatId(null);
    startNewChat();
  };

  const loadChat = (chatId) => {
    setActiveChatId(chatId);
    startNewChat();
  };

  const deleteChat = (chatIdToDelete) => {
    if (!window.confirm("Are you sure you want to delete this chat?")) {
      return;
    }

    setAllChats((prevChats) => {
      const newChats = { ...prevChats };
      delete newChats[chatIdToDelete];
      return newChats;
    });

    if (activeChatId === chatIdToDelete) {
      setActiveChatId(null);
    }
  };

  const contextValue = {
    allChats,
    activeChatId,
    displayHistory,
    onSent,
    input,
    setInput,
    loading,
    newChat,
    loadChat,
    isListening,
    startListening,
    deleteChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;

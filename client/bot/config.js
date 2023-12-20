import { createChatBotMessage } from "react-chatbot-kit";

const botName = "더웨이브마켓";

const config = {
  initialMessages: [createChatBotMessage(`안녕하세요 ${botName}입니다`)],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
};

export default config;

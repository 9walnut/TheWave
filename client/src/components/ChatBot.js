import config from "../bot/config.js";
import MessageParser from "../bot/Messageparser.js";
import ActionProvider from "../bot/ActionProvider.js";

export default function ChatBot() {
  return (
    <div>
      <ChatBot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
}

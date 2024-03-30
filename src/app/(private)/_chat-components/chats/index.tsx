import React from "react";
import ChatHeader from "./chat-header";
import ChatLists from "./chat-list";

function Chats() {
  return (
    <div className="w-[400px] h-full p-3">
      <ChatHeader />
      <ChatLists />
    </div>
  );
}

export default Chats;

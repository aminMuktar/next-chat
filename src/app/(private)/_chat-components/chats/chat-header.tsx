import { Dropdown, MenuProps } from "antd";
import React, { useState } from "react";
import NewChatModal from "./new-chat-modal";

function ChatHeader() {
  const [showNewChatModal, setShowNewChatModal] = useState<boolean>(false);
  const items: MenuProps["items"] = [
    {
      label: "New Chat",
      key: "1",
      onClick: () => setShowNewChatModal(true),
    },
    {
      label: "New Group",
      key: "2",
    },
  ];
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="text-xl text-gray-500 font-bold uppercase">
          {" "}
          My chats
        </div>
        <Dropdown.Button size="small" className="w-max " menu={{ items }}>
          New
        </Dropdown.Button>
      </div>
      <input
        type="text"
        placeholder="search for chats...."
        className="bg-gray-100 w-full border border-gray-300 border-solid outline-none rounded-md px-3 h-14 focus:outline-none focus:border-primary"
      />
      {showNewChatModal && (
        <NewChatModal
          showNewChatModal={showNewChatModal}
          setShowNewChatModal={setShowNewChatModal}
        />
      )}
    </>
  );
}

export default ChatHeader;

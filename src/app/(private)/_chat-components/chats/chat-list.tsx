import { ChatState, SetChats } from "@/redux/chatSlice";
import { UserState } from "@/redux/userSlice";
import { getAllChats } from "@/server-actions/chats";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatCard from "./chat-card";

function ChatList() {
  const dispatch = useDispatch();
  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );
  const { chats }: ChatState = useSelector((state: any) => state.chat);
  const [loading, setLoading] = useState<boolean>(false);
  const getChats = async () => {
    try {
      setLoading(true);
      const response = await getAllChats(currentUserData?._id!);
      if (response.error) throw new Error(response.error);
      dispatch(SetChats(response));
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserData]);
  return (
    <div>
      <div className="flex flex-col gap-5 mt-5">
        {chats.map((chat) => {
          return <ChatCard chat={chat} key={chat._id} />;
        })}
      </div>
    </div>
  );
}

export default ChatList;

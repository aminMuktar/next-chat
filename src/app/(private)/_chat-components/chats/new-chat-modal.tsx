import { UserType } from "@/interfaces";
import { ChatState, SetChats } from "@/redux/chatSlice";
import { UserState } from "@/redux/userSlice";
import { createNewChat } from "@/server-actions/chats";
import { GetAllUsers } from "@/server-actions/users";
import { Button, Divider, message, Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chats from ".";

function NewChatModal({
  showNewChatModal,
  setShowNewChatModal,
}: {
  showNewChatModal: boolean;
  setShowNewChatModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );
  const { chats }: ChatState = useSelector((state: any) => state.chat);
  const dispatch = useDispatch();
  const onAddToChat = async (userId: string) => {
    try {
      setSelectedUserId(userId);
      setLoading(true);
      const response = await createNewChat({
        users: [userId, currentUserData?._id],
        createdBy: currentUserData?._id,
        isGroupChat: false,
      });
      if (response.error) throw new Error(response.error);
      message.success("Chat created successfully");
      dispatch(SetChats(response));

      setShowNewChatModal(false);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await GetAllUsers();
      if (response.error) throw new Error("No user found!");
      setUsers(response);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <Modal
      open={showNewChatModal}
      onCancel={() => setShowNewChatModal(false)}
      footer={null}
      centered
      title={null}
    >
      <div className="flex flex-col gap-5">
        <h1 className="text-primary text-center text-xl font-bold uppercase">
          Create new chat
        </h1>
        {loading && !selectedUserId && (
          <div className="flex justify-center my-20">
            <Spin />
          </div>
        )}
        {!loading && users.length > 0 && (
          <div className="flex flex-col gap-5">
            {users.map((user) => {
              const ischatAlreadyExist = chats.find((chat) =>
                chat.users.find((u) => u._id === user._id)
              );
              if (user._id === currentUserData?._id || ischatAlreadyExist)
                return null;
              return (
                <>
                  <div
                    key={user._id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex gap-5 items-center">
                      <img
                        src={user.profilePicture}
                        alt="avatar"
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="text-gray-500">{user.name}</span>
                    </div>
                    <Button
                      loading={selectedUserId === user._id && loading}
                      size="small"
                      onClick={() => onAddToChat(user._id)}
                    >
                      Add to chat
                    </Button>
                  </div>
                  <Divider className="border-gray-200 my-[1px]" />
                </>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
}

export default NewChatModal;

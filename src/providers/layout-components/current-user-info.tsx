import { UserType } from "@/interfaces";
import { Button, Divider, Drawer, message } from "antd";
import React, { useState } from "react";
import dayjs from "dayjs";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function CurrentUserInfo({
  currentUser,
  setShowCurrentUserInfo,
  showCurrentUserInfo,
}: {
  currentUser: UserType | null;
  setShowCurrentUserInfo: React.Dispatch<React.SetStateAction<boolean>>;
  showCurrentUserInfo: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const getProperty = (key: string, value: string) => {
    return (
      <div className="flex flex-col">
        <span className="font-semibold text-gray-700">{key}</span>
        <span className="text-gray-600">{value}</span>
      </div>
    );
  };
  const { signOut } = useClerk();
  const onLogout = async () => {
    try {
      setLoading(true);
      await signOut();
      setShowCurrentUserInfo(false);
      message.success("logged out successfully!");
      router.push("/sign-in");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Drawer
      open={showCurrentUserInfo}
      onClose={() => setShowCurrentUserInfo(false)}
      title="profile"
    >
      {currentUser && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5 justify-center items-center">
            <img
              src={currentUser.profilePicture}
              alt="profile"
              className="w-28 h-28 rounded-full"
            />
            <span className="text-gray-500 cursor-pointer">
              change profile picture
            </span>
          </div>
          <Divider className="my-1 border-gray-200" />
          <div className="flex flex-col gap-5">
            {getProperty("Name", currentUser.name)}
            {getProperty("Username", currentUser.userName)}
            {getProperty("Id", currentUser._id)}
            {getProperty(
              "Joined on",
              dayjs(currentUser.createdAt).format("DD MM YYYY hh mm A")
            )}
          </div>
          <div className="mt-5">
            <Button
              className="w-full"
              block
              loading={loading}
              onClick={() => onLogout()}
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </Drawer>
  );
}

export default CurrentUserInfo;

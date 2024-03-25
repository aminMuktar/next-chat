import { UserType } from "@/interfaces";
import { Button, Divider, Drawer, message, Upload } from "antd";
import React, { useState } from "react";
import dayjs from "dayjs";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UserState } from "@/redux/userSlice";
import { useSelector } from "react-redux";

function CurrentUserInfo({
  setShowCurrentUserInfo,
  showCurrentUserInfo,
}: {
  setShowCurrentUserInfo: React.Dispatch<React.SetStateAction<boolean>>;
  showCurrentUserInfo: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
  const onProfilePictureUpdate = async () => {};
  return (
    <Drawer
      open={showCurrentUserInfo}
      onClose={() => setShowCurrentUserInfo(false)}
      title="profile"
    >
      {currentUserData && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5 justify-center items-center">
            {!selectedFile && (
              <img
                src={currentUserData.profilePicture}
                alt="profile"
                className="w-28 h-28 rounded-full"
              />
            )}
            <Upload
              className="cursor-pointer"
              listType={selectedFile ? "picture-circle" : "text"}
              maxCount={1}
              beforeUpload={(file) => {
                setSelectedFile(file);
                return false;
              }}
            >
              change profile picture
            </Upload>
          </div>
          <Divider className="my-1 border-gray-200" />
          <div className="flex flex-col gap-5">
            {getProperty("Name", currentUserData.name)}
            {getProperty("Username", currentUserData.userName)}
            {getProperty("Id", currentUserData._id)}
            {getProperty(
              "Joined on",
              dayjs(currentUserData.createdAt).format("DD MM YYYY hh mm A")
            )}
          </div>
          <div className="mt-5 flex flex-col gap-5">
            <Button
              className="w-full"
              block
              disabled={!selectedFile}
              loading={loading}
              onClick={() => onProfilePictureUpdate()}
            >
              Update profile
            </Button>
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

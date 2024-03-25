"use client";
import { UserType } from "@/interfaces";
import { GetCurrentUserFromMongoDB } from "@/server-actions/users";
import { Avatar, message } from "antd";
import React, { useEffect, useState } from "react";
import CurrentUserInfo from "./current-user-info";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();
  const isPublicRoute =
    pathname.includes("/sign-in") || pathname.includes("/sign-up");
  if (isPublicRoute) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [showCurrentUserInfo, setShowCurrentUserInfo] =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useState<boolean>(false);
  const getCurrentUser = async () => {
    try {
      const response = await GetCurrentUserFromMongoDB();
      if (response.error) {
        throw new Error(response.error);
      }
      setCurrentUser(response);
    } catch (error: any) {
      message.error(error.message);
    }
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <div className="bg-gray-200 w-full px-5 py-1 flex justify-between items-center border-b border-solid border-gray-300">
      <div className="">
        <h1 className="text-2xl font-bold text-primary">{"{next...chat}"}</h1>
      </div>
      <div className="gap-5 flex items-center">
        <span className="text-sm">{currentUser?.name}</span>
        <Avatar
          className="cursor-pointer"
          onClick={() => setShowCurrentUserInfo(true)}
          src={currentUser?.profilePicture}
        />
      </div>
      {showCurrentUserInfo && (
        <CurrentUserInfo
          currentUser={currentUser}
          setShowCurrentUserInfo={setShowCurrentUserInfo}
          showCurrentUserInfo={showCurrentUserInfo}
        />
      )}
    </div>
  );
}

export default Header;

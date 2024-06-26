"use client";
import { UserType } from "@/interfaces";
import { GetCurrentUserFromMongoDB } from "@/server-actions/users";
import { Avatar, message } from "antd";
import React, { useEffect, useState } from "react";
import CurrentUserInfo from "./current-user-info";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentUser, UserState } from "@/redux/userSlice";

function Header() {
  const pathname = usePathname();
  const isPublicRoute =
    pathname.includes("/sign-in") || pathname.includes("/sign-up");
  if (isPublicRoute) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { currentUserData }: UserState = useSelector(
    (state: any) => state.user
  );

  const [showCurrentUserInfo, setShowCurrentUserInfo] =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useState<boolean>(false);
  const getCurrentUser = async () => {
    try {
      const response = await GetCurrentUserFromMongoDB();
      if (response.error) {
        throw new Error(response.error);
      }
      dispatch(SetCurrentUser(response as UserType));
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
        <span className="text-sm">{currentUserData?.name}</span>
        <Avatar
          className="cursor-pointer"
          onClick={() => setShowCurrentUserInfo(true)}
          src={currentUserData?.profilePicture}
        />
      </div>
      {showCurrentUserInfo && (
        <CurrentUserInfo
          setShowCurrentUserInfo={setShowCurrentUserInfo}
          showCurrentUserInfo={showCurrentUserInfo}
        />
      )}
    </div>
  );
}

export default Header;

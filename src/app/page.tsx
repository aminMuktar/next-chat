import Image from "next/image";
import { Button, Flex } from "antd";
import { UserButton } from "@clerk/nextjs";
import { connectMongoDB } from "@/config/db-config";
import { GetCurrentUserFromMongoDB } from "@/server-actions/users";

connectMongoDB();
export default async function Home() {
  const loggedInUserData = await GetCurrentUserFromMongoDB();

  return (
    <div className="p-10">
      <div className="flex flex-col gap-3 text-3xl">
        <UserButton afterSignOutUrl="/sign-in" />
        <span>Name: {loggedInUserData?.name}</span>
        <span>User Name: {loggedInUserData?.userName}</span>
        <span>Email: {loggedInUserData.email}</span>
      </div>
    </div>
  );
}

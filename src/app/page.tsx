import Image from "next/image";
import { Button, Flex } from "antd";
import { UserButton, currentUser } from "@clerk/nextjs";

export default async function Home() {
  const loggedInUserData = await currentUser();
  let email = "";
  if (loggedInUserData?.emailAddresses) {
    email = loggedInUserData?.emailAddresses[0]?.emailAddress;
  }
  return (
    <div className="p-10">
      <div className="flex flex-col gap-3 text-3xl">
        <UserButton afterSignOutUrl="/sign-in" />
        <span>First Name: {loggedInUserData?.firstName}</span>
        <span>Last Name: {loggedInUserData?.lastName}</span>
        <span>User Name: {loggedInUserData?.username}</span>
        <span>Email: {email}</span>
      </div>
    </div>
  );
}

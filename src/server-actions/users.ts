"use server"
import { connectMongoDB } from "@/config/db-config";
import userModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs";

connectMongoDB();

export const GetCurrentUserFromMongoDB = async ()=>{

  try {
    const clerkUser = await currentUser();
    const mongoUser = await userModel.findOne({ clerkUserId: clerkUser?.id})
    if(mongoUser){
      return JSON.parse(JSON.stringify(mongoUser))
    }
    let email=""
    if(clerkUser?.emailAddresses){
      email=clerkUser?.emailAddresses[0]?.emailAddress || ""
    }
    const newUserPayload={
      clerkUserId: clerkUser?.id,
      name: clerkUser?.firstName+" "+clerkUser?.lastName,
      userName: clerkUser?.username,
      email,
      profilePicture: clerkUser?.imageUrl
    }
    const newUser = await userModel.create(newUserPayload)
    return JSON.parse(JSON.stringify(newUser))
  } catch (error: any) {
    return {
      error: error.message
    }
  }
}
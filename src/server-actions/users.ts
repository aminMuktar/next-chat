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

export const GetAllUsers=async()=>{
  try {
    const users = await userModel.find({})
    return JSON.parse(JSON.stringify(users))
  } catch (error: any) {
    return {
      error: error.message,
    }
  }
}

export const updateUserProfile = async(userId:string,payload: any)=>{
  try {
    const updatedUser = await userModel.findByIdAndUpdate(userId,payload,{new: true})
    return JSON.parse(JSON.stringify(updatedUser))
  } catch (error: any) {
    return {
      error: error.message
    }
  }
}
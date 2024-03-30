'use server'
import ChatModel from "@/models/chat-model";


export const createNewChat = async (payload: any) =>{
  try {
    await ChatModel.create(payload)
    const newChats = await ChatModel.find({
      users:{
        $in: [payload.createdBy]
      }
    }).populate("users").sort({ updatedAt: -1 })
    return JSON.parse(JSON.stringify(newChats))
  } catch (error:any) {
    return {
      error: error.message
    }
  }
}

export const getAllChats = async(userId: string)=>{
  try {
    const users = await ChatModel.find({
      users: {
        $in:[userId]
      }
    }).populate("users").sort({ updatedAt: -1})
    return JSON.parse(JSON.stringify(users))
  } catch (error: any) {
    return {
      error: error.message
    }
  }
}
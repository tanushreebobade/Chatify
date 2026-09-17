import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js";
import User from "../models/User.js";
import { getReceiverSocketId, io } from "../lib/socket.js";


export const getAllContacts = async (req, res) => {
   try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
   } catch (error) {
        console.log("Error in getAllContacts controller:",error);
        res.status(500).json({message:"Internal Server Error"});
   }
}

export const getChatPartners = async (req, res) => {
    try{
        const loggedInUserId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:loggedInUserId},
                {receiverId:loggedInUserId}
            ]
        }).sort({createdAt:-1});

        // Newest message per partner, so the client can show a preview and
        // order the list by recency without a second round-trip.
        const lastMessageByPartner = new Map();
        for(const msg of messages){
            const partnerId = msg.senderId.toString()===loggedInUserId.toString()
                ? msg.receiverId.toString()
                : msg.senderId.toString();
            if(!lastMessageByPartner.has(partnerId)){
                lastMessageByPartner.set(partnerId,{
                    text:msg.text,
                    image:msg.image,
                    senderId:msg.senderId,
                    createdAt:msg.createdAt
                });
            }
        }

        const chatPartnerIds = [...lastMessageByPartner.keys()];
        const chatPartners = await User.find({_id:{$in:chatPartnerIds}}).select("-password");

        const withPreview = chatPartners
            .map(user => ({...user.toObject(), lastMessage:lastMessageByPartner.get(user._id.toString())}))
            .sort((a,b)=> new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt));

        res.status(200).json(withPreview);
    }catch(error){
        console.log("Error in getChatPartners controller:",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const {id:userToChatId} = req.params;

        const messages = await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}
            ]
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessagesByUserId controller:",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const sendMessage = async (req, res) => {
    try{
        const {text, image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        });

        await newMessage.save();
        const reciverSocketId = getReceiverSocketId(receiverId);
        if(reciverSocketId){
            io.to(reciverSocketId).emit("newMessage", newMessage);
        }
        res.status(201).json(newMessage);
    }catch(error){
        console.log("Error in sendMessage controller:",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const deleteMessage = async (req, res) => {
    try {
        const { id: messageId } = req.params;
        const userId = req.user._id;

        const message = await Message.findById(messageId);
        
        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }

        // Only allow sender to delete the message
        if (message.senderId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized to delete this message" });
        }

        await Message.findByIdAndDelete(messageId);

        // Notify the receiver in real-time
        const receiverSocketId = getReceiverSocketId(message.receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("messageDeleted", messageId);
        }

        res.status(200).json({ message: "Message deleted successfully", id: messageId });
    } catch (error) {
        console.log("Error in deleteMessage controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const clearChat = async (req, res) => {
    try {
        const myId = req.user._id;
        const { id: userToChatId } = req.params;

        await Message.deleteMany({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        });

        // Notify the partner in real-time
        const partnerSocketId = getReceiverSocketId(userToChatId);
        if (partnerSocketId) {
            io.to(partnerSocketId).emit("chatCleared", { partnerId: myId });
        }

        res.status(200).json({ message: "Chat cleared successfully" });
    } catch (error) {
        console.log("Error in clearChat controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
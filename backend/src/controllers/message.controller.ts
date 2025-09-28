import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import { AuthRequest } from "../middleware/auth.middleware.js";
// import { getReceiverSocketId, io } from "../lib/socket";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import {Response, Request} from "express"

export const getAllContacts = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?._id) {
    return res.status(401).json({ message: "User not authenticated" });
    }
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getAllContacts:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMessagesByUserId = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?._id) {
    return res.status(401).json({ message: "User not authenticated" });
    }
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : String(error);
    console.log("Error in getMessages controller: ", errorMessage);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?._id) {
    return res.status(401).json({ message: "User not authenticated" });
    }
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if (!text && !image) {
      return res.status(400).json({ message: "Text or image is required." });
    }
    if (senderId.equals(receiverId)) {
      return res.status(400).json({ message: "Cannot send messages to yourself." });
    }
    const receiverExists = await User.exists({ _id: receiverId });
    if (!receiverExists) {
      return res.status(404).json({ message: "Receiver not found." });
    }

    let imageUrl;
    if (image) {
      // upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : String(error);
    console.log("Error in sendMessage controller: ", errorMessage);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getChatPartners = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?._id) {
    return res.status(401).json({ message: "User not authenticated" });
    }
    const loggedInUserId = req.user._id;

    // find all the messages where the logged-in user is either sender or receiver
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    const chatPartnerIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];

    const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select("-password");

    res.status(200).json(chatPartners);
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : String(error);
    console.error("Error in getChatPartners: ", errorMessage);
    res.status(500).json({ error: "Internal server error" });
  }
};
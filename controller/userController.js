import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

// Controller for user registration
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  // Check if the user already exists
  const isUser = await User.findOne({ email });
  if (isUser) {
    res.status(400); // Bad Request
    throw new Error("User already registered");
  }

  // Create a new user
  const user = await User.create({ username, email, password });

  if (user) {
    console.log("user signup");
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Controller for user login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.query;

  // Find the user by email and password
  const user = await User.findOne({ email, password });

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    });
  } else {
    res.status(401); // Unauthorized
    throw new Error("Incorrect credentials");
  }
});

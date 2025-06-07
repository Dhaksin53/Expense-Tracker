const User = require("../models/User");
const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register User
exports.registerUser = async (req, res) => {
  const {fullName, email, password,profileImageUrl} = req.body;
  if(!fullName || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  try{
    const existingUser=await User.findOne({email});
    if(existingUser) {
      return res.status(400).json({ message: "User already exists" });
  }
  const user=await User.create({
    fullName,
    email,
    password,
    profileImageUrl
  });
  res.status(201).json({
    id: user._id,
    user,
    token: generateToken(user._id),
  })
} catch (err) {
  res.status(500).json({ message: "Server error",error:err.message });
}

};

// Login User
exports.loginUser = async (req, res) => {
  const {email,password}=req.body;
  if(!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  try{
    const user=await User.findOne({email});
    if(!user || !(await user.comaprePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  }catch(err){
    res.status(500).json({ message: "Error Registering User", error: err.message });
  }
};

// Get User Info
exports.getUserInfo = async (req, res) => {
  try{
    const user= await User.findById(req.user.id).select("-password");
    if(!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);

  }catch(err){
    res.status(500).json({ message: "Error fetching user info", error: err.message });
  }
};

import bcrypt from "bcryptjs";

import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import generateToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;

    if (!username || !email || !password) {
        return res.status(400).send("Missing fields.");
    }

    const userExists = await User.findOne({email});

    if (userExists) {
        return res.status(400).send("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({username, email, password: hashedPassword})

    try {
        generateToken(res, newUser._id);
        await newUser.save();
        return res.status(201).json({
            _id: newUser._id,
            email: newUser.email,
            username: newUser.username,
            isAdmin: newUser.isAdmin})
    } catch (error) {
        console.log(error)
        res.status(400);
        throw new Error("Invalid user data.")
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }
  
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
  
    generateToken(res, user._id);
  
    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  });

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV === "prod",
        sameSite: "strict",
        });
    return res.status(200).json({ message: "Logged out successfully." });
});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error("User not found.");
    }
})

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404)
        throw new Error("User not found.");
    }
})

const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      res.status(404);
      throw new Error("User not found.");
    }
  
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user.");
    }
  
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "User removed." });
  });
  

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
        res.status(404);
        throw new Error("User not found.");
    }

    res.status(200).json(user);
});


const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found.");
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (typeof req.body.isAdmin === "boolean") {
        user.isAdmin = req.body.isAdmin;
    }

    const updatedUser = await user.save();

    res.status(200).json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
    });
});


export {
    createUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile,
    deleteUserById,
    getUserById,
    updateUserById
};
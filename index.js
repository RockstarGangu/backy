import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { User } from "./models/UserModel.js";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/test1")
  .then(() => {
    console.log("Mongodb Connected Successfully");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //checking the if email already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User Already Registered");
      res.status(400).json({ message: "User Already registered" });
    }

    //creating new User
    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    res.status(200).json({ message: "Registration Success" });
  } catch (error) {
    res.status(500).json({ message: "Error in Registering" });
    console.log(error);
  }
});

app.listen(() => {
  console.log(`Server running on Port: ${port}`);
});

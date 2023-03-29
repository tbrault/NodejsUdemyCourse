import { Schema, model } from "mongoose";
import User from "../interfaces/User.js";

const User = new Schema<User>({
  name: {
    type: String,
    required: [true, "Name must be provided"],
    maxlength: 40,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email must be provided"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email ",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password must be provided"],
    minlength: 6,
  },
});

export default model<User>("User", User);

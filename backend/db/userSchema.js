import mongoose from "mongoose";

const user = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  token: String
}, {
  maxTimeMS: 60000, // Set to 60 seconds (adjust as needed)
});


export const User = mongoose.model('User', user);
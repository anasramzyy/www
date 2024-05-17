import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017")
.then(() => {
  console.log("mongodb connected")
})
.catch(() => {
  console.log("failed to connect")
})

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

const collection = new mongoose.model("users", loginSchema)

export default collection
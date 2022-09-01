import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
});

const PostMessage = mongoose.model("signUp", postSchema);

export default PostMessage;

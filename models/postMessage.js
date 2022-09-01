import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;

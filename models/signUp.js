import mongoose from "mongoose";

const SignUpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
  },

  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },
});
const SignUp = mongoose.model("SignUp", SignUpSchema);

export default SignUp;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fistName: { type: String },
    middleName: { type: String },
    lastName: { type: String },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    password: { type: String, required: true },
    lastLogin: { type: Date, default: Date.now },
    isLogin:{type:Boolean,default:false},
    isVerified: { type: Boolean, default: false },
    accountLevel: {
      type: String,
      enum: ["bronze", "silver", "gold"],
      default: "bronze",
    },
    profileBanner: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    notification: {
      email: { type: String, required: true },
    },
    gender: {
      type: String,
      enum: ["male", "female", "non-binary", "prefer not to say"],
    },
    profileViewer: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    blockUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    likePosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    savePost: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    socialMedia: [
      {
        name: { type: String, required: true },
        link: { type: String, required: true },
      },
    ],
    passwordResetExpires: { type: Date },
    accountVerificationToken: { type: String },
    accountVerificationExpires: { type: Date },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;

import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require:true
    },

    shares: { type: Number, default: 0 },
    post:{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }
  },
  {
    timestamps: true,
  }
);

const category = mongoose.model("category", categorySchema);
export default category;

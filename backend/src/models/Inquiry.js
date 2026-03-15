import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    projectType: { type: String, required: true },
    budget: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "in-review", "quoted", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);
export default Inquiry;

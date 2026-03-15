import mongoose from "mongoose";

const interiorEnquirySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    interiorType: { type: String, required: true },
    budget: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Contacted", "Closed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const InteriorEnquiry = mongoose.model("InteriorEnquiry", interiorEnquirySchema);
export default InteriorEnquiry;

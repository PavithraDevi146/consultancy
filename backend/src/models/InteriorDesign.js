import mongoose from "mongoose";

const interiorDesignSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    roomType: {
      type: String,
      required: true,
      enum: ["Living Room", "Bedroom", "Kitchen", "Dining Area", "Office Room"],
    },
    images: [{ type: String }],
    designStyle: { type: String, required: true },
  },
  { timestamps: true }
);

const InteriorDesign = mongoose.model("InteriorDesign", interiorDesignSchema);
export default InteriorDesign;

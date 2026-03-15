import mongoose from "mongoose";

const completedHomeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    houseType: { type: String, required: true },
    constructionArea: { type: Number, required: true, min: 100 },
    images: [{ type: String }],
    model3D: { type: String, default: "" },
    arMarkerImage: { type: String, default: "" },
    arTargetSrc: { type: String, default: "" },
    yearCompleted: { type: Number, required: true, min: 1990 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const CompletedHome = mongoose.model("CompletedHome", completedHomeSchema);
export default CompletedHome;

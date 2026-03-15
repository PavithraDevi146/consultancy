import mongoose from "mongoose";

const siteUpdateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    category: {
      type: String,
      enum: ["General", "Completed Homes", "Interior Design", "AR Feature", "Dashboard"],
      default: "General",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const SiteUpdate = mongoose.model("SiteUpdate", siteUpdateSchema);
export default SiteUpdate;

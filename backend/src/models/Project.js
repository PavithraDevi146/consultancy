import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    category: { type: String, required: true, default: "Completed Home" },
    houseType: { type: String, required: true },
    bedrooms: { type: Number, required: true, min: 1 },
    bathrooms: { type: Number, required: true, min: 1 },
    floors: { type: Number, required: true, min: 1 },
    areaSqft: { type: Number, required: true, min: 100 },
    location: { type: String, required: true },
    budgetRange: { type: String, required: true },
    completionDate: { type: Date, required: true },
    summary: { type: String, required: true },
    coverImage: { type: String, required: true },
    gallery: [{ type: String }],
    arModelUrl: { type: String, default: "" },
    arEmbedUrl: { type: String, default: "" },
    clientQuote: { type: String, default: "" },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;

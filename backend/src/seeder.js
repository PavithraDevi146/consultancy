import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import CompletedHome from "./models/CompletedHome.js";
import InteriorDesign from "./models/InteriorDesign.js";
import InteriorEnquiry from "./models/InteriorEnquiry.js";
import ContactMessage from "./models/ContactMessage.js";
import User from "./models/User.js";
import sampleProjects from "./data/sampleProjects.js";
import sampleInteriorDesigns from "./data/sampleInteriorDesigns.js";

dotenv.config();

const seed = async () => {
  try {
    await connectDB();
    await User.deleteMany();
    await CompletedHome.deleteMany();
    await InteriorDesign.deleteMany();
    await InteriorEnquiry.deleteMany();
    await ContactMessage.deleteMany();
    await User.create({
      name: "Admin User",
      email: "admin@constructtrust.com",
      password: "Admin@123",
      role: "admin",
      company: "ConstructTrust",
    });
    await CompletedHome.insertMany(sampleProjects);
    await InteriorDesign.insertMany(sampleInteriorDesigns);
    console.log("Admin user, completed homes, and interior designs inserted");
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`Seeder failed: ${error.message}`);
    process.exit(1);
  }
};

seed();

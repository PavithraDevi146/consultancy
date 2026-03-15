import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import interiorRoutes from "./routes/interiorRoutes.js";
import interiorEnquiryRoutes from "./routes/interiorEnquiryRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import savedHomeRoutes from "./routes/savedHomeRoutes.js";
import siteUpdateRoutes from "./routes/siteUpdateRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { initSocketServer } from "./utils/socket.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "constructar-api" });
});

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "constructar-api",
    health: "/api/health",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/homes", homeRoutes);
app.use("/api/interiors", interiorRoutes);
app.use("/api/interior-enquiry", interiorEnquiryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/saved-homes", savedHomeRoutes);
app.use("/api/site-updates", siteUpdateRoutes);

// Compatibility aliases for older frontend routes.
app.use("/api/projects", homeRoutes);
app.use("/api/inquiries", interiorEnquiryRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(notFound);
app.use(errorHandler);

initSocketServer(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

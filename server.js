const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

console.log("🚀 server.js started");

dotenv.config();

const connectDB = require("./db");

const campusRoutes = require("./campus");
const authRoutes = require("./authRoutes");
const chatRoutes = require("./chat");
const dashboardRoutes = require("./dashboard");
const coursesRoutes = require("./courses");
const placementsRoutes = require("./placements");
const resourcesRoutes = require("./resources");
const eventsRoutes = require("./events");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/campus", campusRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/placements", placementsRoutes);
app.use("/api/resources", resourcesRoutes);
app.use("/api/events", eventsRoutes);

app.get("/", (req, res) => {
    res.send("MAIT Backend Running 🚀");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
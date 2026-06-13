const express = require("express");
const router  = express.Router();

// Courses data (no DB needed — this doesn't change often)
const COURSES = [
  { name: "Computer Science & Engineering", short: "CSE",       seats: 240, fees: "₹1.45L/yr", icon: "💻", color: "indigo",  highlights: ["DSA","OS","DBMS","AI/ML","Cloud"],    avgPlacement: "₹18.5L avg", highestPlacement: "₹52.5L" },
  { name: "Information Technology",          short: "IT",        seats: 120, fees: "₹1.40L/yr", icon: "🔗", color: "cyan",    highlights: ["Web Dev","Cybersecurity","IoT","Cloud"], avgPlacement: "₹16.2L avg", highestPlacement: "₹38L"   },
  { name: "Electronics & Communication",     short: "ECE",       seats: 120, fees: "₹1.35L/yr", icon: "📡", color: "amber",   highlights: ["VLSI","Embedded","Signal Processing"], avgPlacement: "₹12.8L avg", highestPlacement: "₹28L"   },
  { name: "Artificial Intelligence & ML",    short: "AI/ML",     seats: 60,  fees: "₹1.55L/yr", icon: "🧠", color: "violet",  highlights: ["Deep Learning","NLP","Computer Vision"], avgPlacement: "₹22.4L avg", highestPlacement: "₹52.5L" },
  { name: "Civil Engineering",               short: "CE",        seats: 120, fees: "₹1.2L/yr",  icon: "🏗️", color: "emerald", highlights: ["Structural","Environmental","AutoCAD"], avgPlacement: "₹8.5L avg",  highestPlacement: "₹18L"   },
  { name: "Mechanical Engineering",          short: "ME",        seats: 120, fees: "₹1.25L/yr", icon: "⚙️", color: "rose",    highlights: ["Thermodynamics","CAD/CAM","Robotics"],  avgPlacement: "₹9.2L avg",  highestPlacement: "₹20L"   },
  { name: "MBA (Tech Management)",           short: "MBA",       seats: 60,  fees: "₹1.8L/yr",  icon: "📊", color: "amber",   highlights: ["Product Management","Finance","Strategy"], avgPlacement: "₹14L avg",  highestPlacement: "₹30L"   },
  { name: "M.Tech Computer Science",         short: "M.Tech CSE",seats: 18,  fees: "₹1.6L/yr",  icon: "🎓", color: "indigo",  highlights: ["Research","ML","Distributed Systems"], avgPlacement: "₹24L avg",   highestPlacement: "₹45L"   },
];

// ── GET /api/courses
router.get("/", (req, res) => {
  res.json({ success: true, data: COURSES });
});

// ── GET /api/courses/:short  (e.g. /api/courses/CSE)
router.get("/:short", (req, res) => {
  const course = COURSES.find(
    (c) => c.short.toLowerCase() === req.params.short.toLowerCase()
  );
  if (!course) {
    return res.status(404).json({ success: false, message: "Course not found" });
  }
  res.json({ success: true, data: course });
});

module.exports = router;

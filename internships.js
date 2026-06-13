const express    = require("express");
const router     = express.Router();
const Internship = require("../models/Internship");
const { protect } = require("../middleware/auth");

// Seed default internships
const seedInternships = async () => {
  const count = await Internship.countDocuments();
  if (count > 0) return;
  await Internship.insertMany([
    { company: "Google",    role: "SWE Intern",               type: "Remote",   stipend: "₹1.2L/mo", duration: "3 months", skills: ["Python","ML","Distributed Systems"], logo: "G", color: "#4285F4", deadline: "Jan 31" },
    { company: "Microsoft", role: "Software Engineer Intern", type: "On-site",  stipend: "₹80K/mo",  duration: "6 months", skills: ["C++","Azure","Algorithms"],           logo: "M", color: "#00A4EF", deadline: "Feb 10" },
    { company: "Razorpay",  role: "Backend Intern",           type: "Hybrid",   stipend: "₹60K/mo",  duration: "3 months", skills: ["Node.js","Go","MySQL"],               logo: "R", color: "#3395FF", deadline: "Jan 25" },
    { company: "CRED",      role: "Product Design Intern",    type: "On-site",  stipend: "₹50K/mo",  duration: "4 months", skills: ["Figma","UX Research","Prototyping"],  logo: "C", color: "#7C3AED", deadline: "Feb 5"  },
    { company: "Swiggy",    role: "ML Intern",                type: "Remote",   stipend: "₹45K/mo",  duration: "3 months", skills: ["Python","TensorFlow","Recommendation"],logo:"S", color: "#FC8019", deadline: "Feb 15" },
    { company: "Adobe",     role: "Frontend Intern",          type: "On-site",  stipend: "₹55K/mo",  duration: "6 months", skills: ["React","TypeScript","CSS"],           logo: "A", color: "#FF0000", deadline: "Feb 20" },
  ]);
};

// ── GET /api/internships?type=Remote
router.get("/", async (req, res) => {
  try {
    await seedInternships();
    const filter = { isActive: true };
    if (req.query.type) filter.type = req.query.type;
    const internships = await Internship.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: internships });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── POST /api/internships/:id/apply
router.post("/:id/apply", protect, async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ success: false, message: "Internship not found" });
    res.json({ success: true, message: `Applied to ${internship.company} — ${internship.role}` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;

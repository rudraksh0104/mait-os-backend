const express = require("express");
const router = express.Router();

const Event = require("./Event");
const { protect } = require("./auth");

// yahi file same folder me honi chahiye: EventRegistration.js
const EventRegistration = require("./EventRegistration");

// Seed default events if DB is empty
const seedEvents = async () => {
  const count = await Event.countDocuments();
  if (count > 0) return;

  await Event.insertMany([
    {
      title: "HackMAIT 6.0",
      type: "hackathon",
      date: "Feb 15–16, 2025",
      prize: "₹1,00,000 prize pool",
      description:
        "48-hour national-level hackathon. Build solutions for smart city, healthcare, and fintech.",
      tags: ["Open for all", "Teams of 4", "Registration open"],
      isActive: true
    },
    {
      title: "AI Summit 2025",
      type: "seminar",
      date: "March 8, 2025",
      prize: "Free entry",
      description:
        "Industry leaders panel on AI, AGI, and future of tech. Speakers from Google, NVIDIA, and OpenAI India.",
      tags: ["Networking", "Panel discussion"],
      isActive: true
    },
    {
      title: "Placement Bootcamp",
      type: "workshop",
      date: "Jan 20–25, 2025",
      prize: "Certificate",
      description:
        "Intensive 5-day placement preparation. DSA, system design, mock interviews, and resume review.",
      tags: ["Final year", "Limited seats", "₹499 fee"],
      isActive: true
    },
    {
      title: "Code Wars",
      type: "contest",
      date: "Feb 5, 2025",
      prize: "₹25,000",
      description:
        "Competitive programming contest on Codeforces platform. Individual or team of 2.",
      tags: ["Codeforces", "Rating boost", "Certificate"],
      isActive: true
    },
    {
      title: "Cloud Computing Workshop",
      type: "workshop",
      date: "Jan 28, 2025",
      prize: "AWS Credits",
      description:
        "Hands-on AWS workshop. Deploy real-world apps. Get AWS Cloud Practitioner exam vouchers.",
      tags: ["Industry certified", "Hands-on", "AWS credits"],
      isActive: true
    },
    {
      title: "Startup Weekend MAIT",
      type: "hackathon",
      date: "March 22–23, 2025",
      prize: "Seed funding",
      description:
        "Build a startup in 54 hours. Pitch to investors. Winners get mentorship and ₹2L seed funding.",
      tags: ["Entrepreneurship", "Pitch", "All years"],
      isActive: true
    }
  ]);
};

// GET /api/events
router.get("/", async (req, res) => {
  try {
    await seedEvents();

    const filter = { isActive: true };

    if (req.query.type && req.query.type !== "all") {
      filter.type = req.query.type;
    }

    const events = await Event.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: events
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// POST /api/events/:id/register
router.post("/:id/register", protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    const alreadyRegistered = await EventRegistration.findOne({
      eventId: event._id,
      userId: req.user._id
    });

    if (alreadyRegistered) {
      return res.status(400).json({
        success: false,
        message: "You are already registered for this event"
      });
    }

    const registration = await EventRegistration.create({
      eventId: event._id,
      eventTitle: event.title,
      userId: req.user._id,
      name: req.body.name || req.user.name || "Student",
      email: req.body.email || req.user.email || "",
      phone: req.body.phone || "",
      branch: req.body.branch || req.user.branch || "CSE",
      semester: req.body.semester || req.user.semester || "5"
    });

    res.json({
      success: true,
      message: `Registered for ${event.title}`,
      data: registration
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// GET /api/events/registrations/my
router.get("/registrations/my", protect, async (req, res) => {
  try {
    const registrations = await EventRegistration.find({
      userId: req.user._id
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: registrations
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
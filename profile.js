const express = require("express");
const router  = express.Router();
const User    = require("../models/User");
const { protect } = require("../middleware/auth");

// ── GET /api/profile
router.get("/", protect, async (req, res) => {
  try {
    const user = req.user;
    res.json({
      success: true,
      data: {
        name:        user.name,
        email:       user.email,
        phone:       user.phone,
        location:    user.location,
        branch:      user.branch,
        semester:    user.semester,
        rollNo:      user.rollNo,
        section:     user.section,
        bio:         user.bio,
        cgpa:        user.cgpa,
        xp:          user.xp,
        level:       user.level,
        streak:      user.streak,
        badges:      user.badges,
        skills:      user.skills,
        achievements:user.achievements,
        linkedinUrl: user.linkedinUrl,
        githubUrl:   user.githubUrl,
        resumeUrl:   user.resumeUrl,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── PUT /api/profile  (update any field)
router.put("/", protect, async (req, res) => {
  try {
    const allowed = [
      "name","phone","location","branch","semester","rollNo",
      "section","bio","skills","achievements","linkedinUrl",
      "githubUrl","resumeUrl",
    ];
    const update = {};
    allowed.forEach((field) => {
      if (req.body[field] !== undefined) update[field] = req.body[field];
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: update },
      { new: true, runValidators: true }
    ).select("-password");

    res.json({ success: true, message: "Profile updated", data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── PUT /api/profile/skills  (replace skills array)
router.put("/skills", protect, async (req, res) => {
  try {
    const { skills } = req.body;
    if (!Array.isArray(skills)) {
      return res.status(400).json({ success: false, message: "skills must be an array" });
    }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { skills } },
      { new: true }
    );
    res.json({ success: true, data: user.skills });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;

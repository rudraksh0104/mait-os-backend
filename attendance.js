const express = require("express");
const router  = express.Router();
const User    = require("../models/User");
const { protect } = require("../middleware/auth");

// ── GET /api/attendance
router.get("/", protect, async (req, res) => {
  try {
    const user = req.user;

    let totalAttended = 0, totalClasses = 0;
    (user.attendance || []).forEach((s) => {
      totalAttended += s.attended;
      totalClasses  += s.total;
    });
    const overall = totalClasses ? Math.round((totalAttended / totalClasses) * 100) : 0;

    // "Safe to miss" = classes you can still miss before hitting 75%
    // Formula: (attended - 0.75 * total) / (1 - 0.75) 
    const safeToMiss = totalClasses
      ? Math.max(0, Math.floor((totalAttended - 0.75 * totalClasses) / 0.75))
      : 0;

    // Predicted end-of-semester (simple linear projection to 120 total classes)
    const projectedTotal    = 120;
    const projectedAttended = totalAttended + (overall / 100) * (projectedTotal - totalClasses);
    const projected         = Math.round((projectedAttended / projectedTotal) * 100);

    res.json({
      success: true,
      data: {
        overall,
        totalAttended,
        totalClasses,
        totalMissed:  totalClasses - totalAttended,
        safeToMiss,
        projected,
        subjects: user.attendance,
        monthlyTrend: [
          { month: "Aug", percent: 92 },
          { month: "Sep", percent: 88 },
          { month: "Oct", percent: 85 },
          { month: "Nov", percent: 87 },
          { month: "Dec", percent: 84 },
          { month: "Jan", percent: overall },
        ],
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── PUT /api/attendance/:subjectCode
// Body: { attended: number, total: number }
router.put("/:code", protect, async (req, res) => {
  try {
    const { attended, total } = req.body;
    const user = await User.findById(req.user._id);

    const idx = user.attendance.findIndex((s) => s.code === req.params.code);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: "Subject not found" });
    }

    if (attended !== undefined) user.attendance[idx].attended = attended;
    if (total    !== undefined) user.attendance[idx].total    = total;

    await user.save();
    res.json({ success: true, message: "Attendance updated", data: user.attendance[idx] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;

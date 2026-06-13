const express = require("express");
const router = express.Router();
const { protect } = require("./auth");

// GET /api/dashboard
router.get("/", protect, async (req, res) => {
  try {
    const user = req.user || {};

    const attendance = user.attendance && user.attendance.length
      ? user.attendance
      : [
          { subject: "Data Structures", code: "CSE301", attended: 42, total: 48 },
          { subject: "Operating Systems", code: "CSE303", attended: 38, total: 45 },
          { subject: "DBMS", code: "CSE305", attended: 40, total: 46 },
          { subject: "AI/ML", code: "CSE307", attended: 44, total: 47 }
        ];

    const sgpa = user.sgpa && user.sgpa.length
      ? user.sgpa
      : [
          { semester: 1, value: 8.1, credits: 22 },
          { semester: 2, value: 8.3, credits: 24 },
          { semester: 3, value: 8.4, credits: 24 },
          { semester: 4, value: 8.5, credits: 24 },
          { semester: 5, value: 8.42, credits: 24 }
        ];

    let totalAttended = 0;
    let totalClasses = 0;

    attendance.forEach((s) => {
      totalAttended += s.attended || 0;
      totalClasses += s.total || 0;
    });

    const overallAttendance = totalClasses
      ? Math.round((totalAttended / totalClasses) * 100)
      : 87;

    const totalCredits = sgpa.reduce((acc, s) => acc + (s.credits || 0), 0);

    const latestCgpa =
      user.cgpa ||
      (
        sgpa.reduce((sum, s) => sum + ((s.value || 0) * (s.credits || 0)), 0) /
        Math.max(totalCredits, 1)
      ).toFixed(2);

    res.json({
      success: true,
      data: {
        name: user.name || "Arjun Sharma",
        branch: user.branch || "CSE",
        semester: user.semester || 5,

        cgpa: Number(latestCgpa),
        attendance: overallAttendance,
        totalCredits,
        assignmentsDue: 3,
        productivityIndex: 78,
        careerReadiness: 82,
        upcomingExams: 2,
        semesterWeek: 12,
        semesterTotal: 18,

        streak: user.streak || 14,
        xp: user.xp || 2840,
        level: user.level || 7,
        badges: user.badges || ["Top 15%", "14-day streak", "All systems nominal"],
        goals: 5,

        todaySchedule: [
          { time: "9:00 AM", subject: "Data Structures", room: "LT-3", color: "#6366F1" },
          { time: "10:00 AM", subject: "Operating Systems", room: "LT-1", color: "#22D3EE" },
          { time: "11:00 AM", subject: "AI/ML", room: "LT-5", color: "#8B5CF6" },
          { time: "2:00 PM", subject: "Web Dev Lab", room: "Lab-4", color: "#10B981" }
        ],

        sgpaHistory: sgpa.map((s) => ({
          label: `S${s.semester}`,
          value: s.value
        })),

        radarData: [
          { subject: "DSA", score: 85 },
          { subject: "DBMS", score: 78 },
          { subject: "OS", score: 82 },
          { subject: "CN", score: 76 },
          { subject: "AI/ML", score: 92 },
          { subject: "Web Dev", score: 80 }
        ]
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
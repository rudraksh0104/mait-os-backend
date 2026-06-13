const express = require("express");
const router  = express.Router();
const User    = require("../models/User");
const { protect } = require("../middleware/auth");

// ── GET /api/cgpa
router.get("/", protect, async (req, res) => {
  try {
    const user = req.user;
    const sgpa = user.sgpa || [];

    // Recalculate CGPA from all semesters
    let totalWeighted = 0, totalCredits = 0;
    sgpa.forEach((s) => {
      if (s.value) {
        totalWeighted += s.value * s.credits;
        totalCredits  += s.credits;
      }
    });
    const cgpa = totalCredits ? parseFloat((totalWeighted / totalCredits).toFixed(2)) : 0;
    const peakSGPA = sgpa.reduce((max, s) => (s.value > (max?.value || 0) ? s : max), null);

    // Prediction for next semester (simple trend)
    const lastTwo = sgpa.filter((s) => s.value).slice(-2);
    const trend   = lastTwo.length === 2 ? lastTwo[1].value - lastTwo[0].value : 0;
    const predicted = parseFloat(((sgpa.filter(s=>s.value).slice(-1)[0]?.value || 8) + trend * 0.5).toFixed(1));

    res.json({
      success: true,
      data: {
        cgpa,
        target: 9.0,
        peakSGPA:    peakSGPA?.value,
        peakSemester:`Semester ${peakSGPA?.semester}`,
        classRank:   "Top 15%",
        sgpaHistory: sgpa.map((s) => ({
          semester: `Semester ${s.semester}`,
          semLabel: `S${s.semester}`,
          sgpa:      s.value,
          credits:   s.credits,
          predicted: false,
        })),
        predictedNext: predicted,
        recommendations: [
          { icon: "📊", text: "Focus on DBMS — your weakest subject (78%). Aim for 85%+ in end-terms.", color: "amber"   },
          { icon: "📈", text: `Consistent 8.6 SGPA this semester could push CGPA to ${(cgpa + 0.1).toFixed(2)}.`,   color: "emerald" },
          { icon: "🎓", text: "Consider honours courses — adds 0.1–0.15 to final CGPA calculation.",   color: "indigo"  },
          { icon: "✨", text: "Your performance in AI/ML (92%) suggests strong alignment for research roles.", color: "violet"  },
        ],
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── PUT /api/cgpa/semester/:sem
// Body: { sgpa: number, credits: number }
router.put("/semester/:sem", protect, async (req, res) => {
  try {
    const { sgpa, credits } = req.body;
    const semNum = parseInt(req.params.sem);
    const user   = await User.findById(req.user._id);

    const idx = user.sgpa.findIndex((s) => s.semester === semNum);
    if (idx === -1) {
      user.sgpa.push({ semester: semNum, value: sgpa, credits: credits || 24 });
    } else {
      if (sgpa   !== undefined) user.sgpa[idx].value   = sgpa;
      if (credits !== undefined) user.sgpa[idx].credits = credits;
    }

    // Recalculate CGPA
    let tw = 0, tc = 0;
    user.sgpa.forEach((s) => { if (s.value) { tw += s.value * s.credits; tc += s.credits; } });
    user.cgpa = tc ? parseFloat((tw / tc).toFixed(2)) : 0;

    await user.save();
    res.json({ success: true, message: "SGPA updated", data: { cgpa: user.cgpa, sgpa: user.sgpa } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;

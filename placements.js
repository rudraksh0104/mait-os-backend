const express = require("express");
const router  = express.Router();

const PLACEMENT_DATA = {
  stats: {
    highestPackage:   "₹52.5L",
    highestCompany:   "Microsoft 2024",
    averagePackage:   "₹12.8L",
    avgVsIndustry:    "+14%",
    placementRate:    94,
    activeRecruiters: 120,
    recruitersYoY:    "+28%",
  },

  // Branch-wise average (LPA)
  branchWise: [
    { branch: "AI/ML", avgLPA: 22.4 },
    { branch: "CSE",   avgLPA: 18.5 },
    { branch: "IT",    avgLPA: 16.2 },
    { branch: "ECE",   avgLPA: 12.8 },
    { branch: "ME",    avgLPA: 9.2  },
    { branch: "CE",    avgLPA: 8.5  },
  ],

  // 5-year trend
  yearlyTrend: [
    { year: "2020", avgPackage: 8.2,  highestPackage: 28   },
    { year: "2021", avgPackage: 9.1,  highestPackage: 35   },
    { year: "2022", avgPackage: 10.5, highestPackage: 42   },
    { year: "2023", avgPackage: 11.8, highestPackage: 48   },
    { year: "2024", avgPackage: 12.8, highestPackage: 52.5 },
  ],

  // Sector distribution (%)
  sectors: [
    { name: "Product",  percent: 35 },
    { name: "Service",  percent: 28 },
    { name: "Finance",  percent: 18 },
    { name: "Startup",  percent: 12 },
    { name: "Core",     percent: 7  },
  ],

  // Gender split (%)
  gender: [
    { label: "Male",   percent: 72 },
    { label: "Female", percent: 28 },
  ],

  // Salary benchmarks
  salaryBenchmarks: [
    { label: "MAIT Avg",    lpa: 12.8, percentFill: 75, color: "indigo" },
    { label: "Industry Avg",lpa: 11.2, percentFill: 65, color: "amber"  },
    { label: "Top 10%",     lpa: 28.5, percentFill: 92, color: "emerald"},
  ],

  recruiters: [
    "Microsoft","Google","Amazon","Adobe","Goldman Sachs",
    "Deloitte","TCS","Infosys","Wipro","Accenture",
    "Atlassian","Paytm","Swiggy","Zomato","PhonePe",
    "CRED","Razorpay","Juspay","Meesho","Flipkart",
  ],

  insights: [
    {
      emoji: "📊",
      title: "CSE & AI/ML outperform all branches",
      desc:  "32% higher packages than institute average. Strong DSA fundamentals are the key differentiator.",
    },
    {
      emoji: "🎯",
      title: "Product company hiring surged 28%",
      desc:  "Focus on LeetCode, system design, and open-source contributions for product roles.",
    },
    {
      emoji: "💡",
      title: "Recommended stack for 2025",
      desc:  "Python + ML → ₹22.4 LPA avg · React/Node.js → ₹16L avg · Cloud certs (AWS/GCP) → +15% salary",
    },
  ],
};

// ── GET /api/placements
router.get("/", (req, res) => {
  res.json({ success: true, data: PLACEMENT_DATA });
});

module.exports = router;

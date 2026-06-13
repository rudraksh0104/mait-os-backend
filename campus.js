// routes/campus.js
// All campus data — events, resources, internships, courses
const express = require('express');
const router = express.Router();

// ─────────────────────────────────────
//  Static Campus Data
//  (In production, move to MongoDB)
// ─────────────────────────────────────

const COURSES = [
  { id: 1, name: 'Computer Science & Engineering', short: 'CSE', seats: 240, icon: '💻', color: 'indigo', fees: '₹1.45L/year', placement: '₹18.5L avg', highlights: ['AI/ML Electives', 'Product Focus', 'Google Lab'] },
  { id: 2, name: 'Artificial Intelligence & ML', short: 'AI/ML', seats: 60, icon: '🤖', color: 'violet', fees: '₹1.45L/year', placement: '₹22.4L avg', highlights: ['Deep Learning', 'Research Track', 'NVIDIA Lab'] },
  { id: 3, name: 'Information Technology', short: 'IT', seats: 120, icon: '🌐', color: 'cyan', fees: '₹1.45L/year', placement: '₹16.2L avg', highlights: ['Cloud Computing', 'Cybersecurity', 'AWS Credits'] },
  { id: 4, name: 'Electronics & Communication', short: 'ECE', seats: 120, icon: '📡', color: 'emerald', fees: '₹1.45L/year', placement: '₹12.8L avg', highlights: ['VLSI Design', 'IoT', 'Signal Processing'] },
  { id: 5, name: 'Electrical & Electronics', short: 'EEE', seats: 60, icon: '⚡', color: 'amber', fees: '₹1.45L/year', placement: '₹10.5L avg', highlights: ['Power Systems', 'Control Systems', 'PLC'] },
  { id: 6, name: 'Mechanical Engineering', short: 'ME', seats: 60, icon: '⚙️', color: 'rose', fees: '₹1.45L/year', placement: '₹9.8L avg', highlights: ['CAD/CAM', 'Robotics', 'Thermal'] },
  { id: 7, name: 'Civil Engineering', short: 'CE', seats: 60, icon: '🏗️', color: 'amber', fees: '₹1.45L/year', placement: '₹8.5L avg', highlights: ['AutoCAD', 'Structural', 'Green Building'] },
  { id: 8, name: 'Master of Business Administration', short: 'MBA', seats: 120, icon: '📊', color: 'violet', fees: '₹1.2L/year', placement: '₹12L avg', highlights: ['Finance', 'Marketing', 'Entrepreneurship'] },
];

const EVENTS = [
  { id: 1, title: 'HackMAIT 6.0', type: 'hackathon', date: 'Feb 15–16, 2025', prize: '₹1,00,000 Prize Pool', desc: 'The biggest hackathon of North Delhi. 36 hours, 500+ participants, industry judges from Google and Microsoft.', tags: ['Open Source', 'AI/ML', 'Web3', 'All years'], registrationLink: '#', deadline: 'Feb 10, 2025', teamSize: '2-4' },
  { id: 2, title: 'AI Summit 2025', type: 'seminar', date: 'March 8, 2025', prize: 'Certificates + Swag', desc: 'Annual AI conference with speakers from Google, NVIDIA, and Microsoft Research. Workshops on LLMs and CV.', tags: ['AI/ML', 'Research', '3rd-4th Year'], registrationLink: '#', deadline: 'March 5, 2025', teamSize: 'Individual' },
  { id: 3, title: 'Placement Bootcamp 2025', type: 'workshop', date: 'Jan 20–25, 2025', prize: 'Free + Placement Support', desc: '5-day intensive workshop covering DSA, System Design, mock interviews, and resume building by alumni at FAANG.', tags: ['Placement', 'DSA', 'All branches', 'Pre-final year'], registrationLink: '#', deadline: 'Jan 18, 2025', teamSize: 'Individual' },
  { id: 4, title: 'Code Wars', type: 'contest', date: 'Feb 5, 2025', prize: '₹25,000 Prize Pool', desc: 'Competitive programming contest. 3 hours, 8 problems, rated on Codeforces-style scoring. Top 3 win cash prizes.', tags: ['Competitive Programming', 'Algorithms', 'All years'], registrationLink: '#', deadline: 'Feb 3, 2025', teamSize: 'Individual' },
  { id: 5, title: 'AWS Cloud Workshop', type: 'workshop', date: 'Jan 28, 2025', prize: 'Free AWS Credits Worth ₹20K', desc: 'Hands-on AWS workshop — EC2, S3, Lambda, RDS. Certified trainers. Every participant gets ₹20K AWS credits.', tags: ['Cloud', 'AWS', 'DevOps', '2nd year+'], registrationLink: '#', deadline: 'Jan 25, 2025', teamSize: 'Individual' },
  { id: 6, title: 'Startup Weekend MAIT', type: 'hackathon', date: 'March 22–23, 2025', prize: 'Seed Funding + ₹2L', desc: 'Build a startup in 54 hours. Pitch to investors. Winners get mentorship and ₹2L seed funding from MAIT Incubation Cell.', tags: ['Entrepreneurship', 'Pitch', 'All years'], registrationLink: '#', deadline: 'March 18, 2025', teamSize: '3-5' },
];

const RESOURCES = [
  { id: 1, title: 'Data Structures & Algorithms Notes', cat: 'Notes', subject: 'DSA', sem: 3, icon: '📘', color: 'indigo', size: '8.4 MB', downloads: 4821, uploadedBy: 'Dr. Sharma', link: '#' },
  { id: 2, title: 'DBMS Previous Year Questions 2018–24', cat: 'PYQ', subject: 'DBMS', sem: 5, icon: '📄', color: 'amber', size: '3.2 MB', downloads: 6210, uploadedBy: 'Placement Cell', link: '#' },
  { id: 3, title: 'OS Complete Notes + Lab Manual', cat: 'Notes', subject: 'OS', sem: 4, icon: '📗', color: 'emerald', size: '11.2 MB', downloads: 3560, uploadedBy: 'Prof. Gupta', link: '#' },
  { id: 4, title: 'Machine Learning Lab Programs (Python)', cat: 'Lab', subject: 'ML', sem: 6, icon: '🧑‍💻', color: 'violet', size: '2.8 MB', downloads: 2890, uploadedBy: 'CS Dept', link: '#' },
  { id: 5, title: 'Resume Templates + ATS Guide 2025', cat: 'Placement', subject: 'Career', sem: 0, icon: '📋', color: 'cyan', size: '1.1 MB', downloads: 8940, uploadedBy: 'Placement Cell', link: '#' },
  { id: 6, title: 'CN Previous Year Questions 2020–24', cat: 'PYQ', subject: 'CN', sem: 5, icon: '📄', color: 'rose', size: '4.7 MB', downloads: 3100, uploadedBy: 'Placement Cell', link: '#' },
  { id: 7, title: 'System Design Interview Handbook', cat: 'Placement', subject: 'Career', sem: 0, icon: '🏗️', color: 'indigo', size: '6.3 MB', downloads: 5670, uploadedBy: 'Alumni Network', link: '#' },
  { id: 8, title: 'Digital Electronics Lab Manual', cat: 'Lab', subject: 'DE', sem: 3, icon: '🔌', color: 'emerald', size: '5.6 MB', downloads: 1980, uploadedBy: 'ECE Dept', link: '#' },
  { id: 9, title: 'DBMS Complete Notes + ER Diagrams', cat: 'Notes', subject: 'DBMS', sem: 5, icon: '📘', color: 'amber', size: '9.1 MB', downloads: 4350, uploadedBy: 'Prof. Verma', link: '#' },
  { id: 10, title: 'DSA 450 Questions Sheet (Love Babbar)', cat: 'Placement', subject: 'DSA', sem: 0, icon: '💡', color: 'rose', size: '0.8 MB', downloads: 12400, uploadedBy: 'Student Council', link: '#' },
];

const INTERNSHIPS = [
  { id: 1, company: 'Google', role: 'SWE Intern', type: 'Remote', stipend: '₹1.2L/mo', duration: '3 months', skills: ['Python', 'ML', 'Distributed Systems'], logo: 'G', color: '#4285F4', deadline: 'Jan 31', applyLink: '#', description: 'Work on Google Search or Google Cloud infrastructure. Must have strong DSA skills.' },
  { id: 2, company: 'Microsoft', role: 'Software Engineer Intern', type: 'On-site', stipend: '₹80K/mo', duration: '6 months', skills: ['C++', 'Azure', 'Algorithms'], logo: 'M', color: '#00A4EF', deadline: 'Feb 10', applyLink: '#', description: 'Azure team internship — work on cloud scalability solutions. Strong Algo + System Design required.' },
  { id: 3, company: 'Razorpay', role: 'Backend Intern', type: 'Hybrid', stipend: '₹60K/mo', duration: '3 months', skills: ['Node.js', 'Go', 'MySQL'], logo: 'R', color: '#3395FF', deadline: 'Jan 25', applyLink: '#', description: 'Build payment infrastructure at scale. You\'ll work on APIs serving 10M+ transactions/day.' },
  { id: 4, company: 'CRED', role: 'Product Design Intern', type: 'On-site', stipend: '₹50K/mo', duration: '4 months', skills: ['Figma', 'UX Research', 'Prototyping'], logo: 'C', color: '#7C3AED', deadline: 'Feb 5', applyLink: '#', description: 'Design next-gen fintech experiences for CRED\'s 12M+ high-credit users.' },
  { id: 5, company: 'Swiggy', role: 'ML Intern', type: 'Remote', stipend: '₹45K/mo', duration: '3 months', skills: ['Python', 'TensorFlow', 'Recommendation Systems'], logo: 'S', color: '#FC8019', deadline: 'Feb 15', applyLink: '#', description: 'Work on recommendation and demand forecasting models powering 2M+ daily orders.' },
  { id: 6, company: 'Adobe', role: 'Frontend Intern', type: 'On-site', stipend: '₹55K/mo', duration: '6 months', skills: ['React', 'TypeScript', 'CSS Animation'], logo: 'A', color: '#FF0000', deadline: 'Feb 20', applyLink: '#', description: 'Build the next generation of Adobe Creative Cloud UI components used by 30M+ creators.' },
];

const PLACEMENT_STATS = {
  year: '2024-25',
  highest: '₹52.5 LPA',
  highestCompany: 'Microsoft',
  average: '₹12.8 LPA',
  median: '₹10.5 LPA',
  placementRate: 94,
  totalRecruiters: 120,
  totalOffersYear: 1842,
  branchWise: [
    { branch: 'AI/ML', avg: 22.4, highest: 42 },
    { branch: 'CSE', avg: 18.5, highest: 52.5 },
    { branch: 'IT', avg: 16.2, highest: 38 },
    { branch: 'ECE', avg: 12.8, highest: 28 },
    { branch: 'EEE', avg: 9.4, highest: 18 },
    { branch: 'ME', avg: 8.2, highest: 15 },
    { branch: 'Civil', avg: 7.8, highest: 14 },
  ],
  topRecruiters: ['Microsoft', 'Google', 'Amazon', 'Adobe', 'Walmart', 'Razorpay', 'CRED', 'Swiggy', 'Zomato', 'Paytm', 'MakeMyTrip', 'Infosys', 'TCS', 'Wipro', 'Capgemini', 'Accenture'],
  trends: [
    { year: '2021', avg: 9.2, placements: 78 },
    { year: '2022', avg: 10.8, placements: 85 },
    { year: '2023', avg: 11.2, placements: 88 },
    { year: '2024', avg: 12.8, placements: 94 },
  ]
};

// ─────────────────────────────────────
//  GET /api/campus/courses
// ─────────────────────────────────────
router.get('/courses', (req, res) => {
  res.json({ success: true, courses: COURSES });
});

// ─────────────────────────────────────
//  GET /api/campus/events
// ─────────────────────────────────────
router.get('/events', (req, res) => {
  res.json({ success: true, events: EVENTS });
});

// ─────────────────────────────────────
//  GET /api/campus/resources?cat=all
// ─────────────────────────────────────
router.get('/resources', (req, res) => {
  const { cat } = req.query;
  
  let resources = RESOURCES;
  if (cat && cat !== 'all') {
    resources = RESOURCES.filter(r => r.cat === cat);
  }
  
  res.json({ success: true, resources });
});

// ─────────────────────────────────────
//  GET /api/campus/internships
// ─────────────────────────────────────
router.get('/internships', (req, res) => {
  const { type } = req.query;
  
  let internships = INTERNSHIPS;
  if (type && type !== 'all') {
    internships = INTERNSHIPS.filter(i => i.type.toLowerCase() === type.toLowerCase());
  }
  
  res.json({ success: true, internships });
});

// ─────────────────────────────────────
//  GET /api/campus/placements
// ─────────────────────────────────────
router.get('/placements', (req, res) => {
  res.json({ success: true, stats: PLACEMENT_STATS });
});

module.exports = router;

const express = require("express");
const { protect } = require("./auth");
const ChatMessage = require("./ChatMessage");

const router = express.Router();

function getSmartReply(message) {
  const lower = message.toLowerCase();

  if (lower.includes("scholarship")) {
    return `MAIT me scholarship ke liye mainly merit-based, EWS support, sports quota aur government scholarship options mil sakte hain.

Aapko check karna chahiye:
• Merit scholarship
• EWS / financial assistance
• SC/ST/OBC government scholarship
• Sports quota support
• University topper / rank based benefits`;
  }

  if (lower.includes("hackathon") || lower.includes("event")) {
    return `Upcoming campus events me hackathons, coding contests, placement bootcamps, workshops aur seminars include ho sakte hain.

Aap Events section me:
• HackMAIT
• Code Wars
• AI Summit
• AWS Workshop
• Placement Bootcamp
jaise events track kar sakte ho.`;
  }

  if (lower.includes("cgpa") || lower.includes("marks") || lower.includes("grade")) {
    return `CGPA improve karne ke liye ye strategy follow karo:

• Daily 1-2 hour revision
• Previous year questions solve karo
• Internal marks aur assignments seriously lo
• Weak subjects ke short notes banao
• Practical/lab files time par complete karo
• Exam se pehle important units priority par padho`;
  }

  if (lower.includes("skill") || lower.includes("product") || lower.includes("placement")) {
    return `Product companies ke liye ye skills strong karo:

• DSA
• JavaScript / Java / Python
• React.js
• Node.js
• DBMS
• Operating System
• Computer Networks
• System Design basics
• 2-3 strong projects
• Resume + mock interviews`;
  }

  if (lower.includes("course") || lower.includes("cse") || lower.includes("aiml") || lower.includes("ai")) {
    return `MAIT me popular programs me CSE, AI/ML, IT, ECE, EEE, Mechanical, Civil aur MBA include hain.

CSE aur AI/ML branches product companies aur software roles ke liye strong options hoti hain.`;
  }

  if (lower.includes("attendance")) {
    return `Attendance ke liye safe target 75% se upar rakho.

Better rahega ki:
• Har subject me 80%+ maintain karo
• Low attendance subjects identify karo
• Medical/emergency proof ready rakho
• Labs miss mat karo`;
  }

  return `Main MAIT academics, placements, courses, events, scholarships, attendance, CGPA aur career guidance me help kar sakta hoon.

Aap mujhse pooch sakte ho:
• Best branch kaunsi hai?
• Placement kaise improve karun?
• CGPA kaise badhaye?
• Upcoming events kya hain?
• Product company ke liye kya sikhu?`;
}

router.post("/message", protect, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty"
      });
    }

    await ChatMessage.create({
      user: req.user._id,
      role: "user",
      content: message
    });

    const aiText = getSmartReply(message);

    await ChatMessage.create({
      user: req.user._id,
      role: "assistant",
      content: aiText
    });

    res.json({
      success: true,
      reply: aiText
    });
  } catch (error) {
    console.error("Chat error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.get("/history", protect, async (req, res) => {
  try {
    const history = await ChatMessage.find({ user: req.user._id }).sort({
      createdAt: 1
    });

    res.json({
      success: true,
      history
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
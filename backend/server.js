
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); 

// 1. MongoDB Database Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/myPortfolioDB";

const defaultCertificates = [
  {
    title: "Hackathon Participation",
    organization: "Smart Internal Hackathon",
    issueDate: "August 2024",
    imagePath: "/3rd position in hackathon.jpeg"
  },
  {
    title: "DAV College Hackathon Participation",
    organization: "Hackathon",
    issueDate: "March 2025",
    imagePath: "/dav clg hackathon .jpeg"
  },
  {
    title: "Hackathon Participation",
    organization: "Smart Internal Hackathon",
    issueDate: "September 2025",
    imagePath: "/Dav clg hackathon 2 position.jpeg"
  },
  {
    title: "Certificate of Participation",
    organization: "CT Group of Institutions",
    issueDate: "October 2025",
    imagePath: "/CT clg hackathon certificate.jpeg"
  },
  {
    title: "Certificate of Internship",
    organization: "S.R Software Solutions",
    issueDate: "Nov-2025 to dec-2025",
    imagePath: "/internship certificate.jpeg"
  },
];

const defaultProjects = [
  {
    title: "DAV College Website",
    desc: "AI-assisted responsive web platform with modern navigation.",
    tech: ["React", "Tailwind", "Node.js", "AI"],
    link: "https://davasr.netlify.app/",
    imagePath: "/Dav College.jpeg"
  },
  {
    title: 'QuickFix Web Platform',
    desc: 'A fast, service-focused web platform with a clean user journey and responsive layout.',
    tech: ['React', 'NodeJs','MongoDb','AI','Tailwind CSS'],
    link: 'https://github.com/Simarpreet29/quick-fix-website',
    imagePath: '/quickFixWebsie.jpeg'
  },
  {
    title: 'SmartBite-Foodorder-website',
    desc: 'Full-stack food ordering app with React frontend and Express/MongoDB backend.',
    tech: ['MERN Stack', 'React', 'Tailwind CSS', 'NodeJs', 'MongoDb'],
    link: 'https://github.com/Simarpreet29/SmartBite-Foodorder-website',
    imagePath: '/SmartBite website.jpeg'
  },
  {
    title: "Traveloo - AI Travel Planner",
    tech: ["React", "NodeJs", "MongoDb", "AI","Tailwind CSS"],
    link: "https://github.com/Simarpreet29/traveloo",
    imagePath: '/Traveloo Website.jpeg'
  },
   {
    title: "StaySync - Smart PG & Hostel Management System",
    desc: 'StaySync is a full-stack MERN application designed to simplify the process of finding and managing PG/Hostel accommodations. ',
    tech: ["MERN Stack","React", "NodeJs", "MongoDb","Tailwind CSS"],
    link: "https://github.com/Simarpreet29/StaySync",
    imagePath: "/StaySync Website.jpeg"
  }
];

const retiredProjectTitles = [
  "Quickix Web Platform",
  "Travel & Tourism Website"
];

mongoose.connect(MONGODB_URI)
  .then(() => console.log(" MongoDB Connected Successfully!"))
  .catch((err) => console.log("MongoDB Connection Error: ", err));

async function syncDefaultCertificates() {
  for (const certificate of defaultCertificates) {
    await Certificate.updateOne(
      {
        title: certificate.title,
        organization: certificate.organization,
        issueDate: certificate.issueDate,
      },
      { $set: certificate },
      { upsert: true }
    );
  }
}

async function syncDefaultProjects() {
  for (const project of defaultProjects) {
    await Project.updateOne(
      { title: project.title },
      { $set: project },
      { upsert: true }
    );
  }
}

async function removeDuplicateProjectsByTitle() {
  const duplicates = await Project.aggregate([
    {
      $group: {
        _id: "$title",
        ids: { $push: "$_id" },
        count: { $sum: 1 }
      }
    },
    {
      $match: {
        _id: { $ne: null },
        count: { $gt: 1 }
      }
    }
  ]);

  for (const duplicate of duplicates) {
    const idsToDelete = duplicate.ids.slice(1);
    if (idsToDelete.length > 0) {
      await Project.deleteMany({ _id: { $in: idsToDelete } });
    }
  }
}

async function removeRetiredProjects() {
  await Project.deleteMany({ title: { $in: retiredProjectTitles } });
}

// ---------------- DATABASE SCHEMAS ----------------

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: String, email: String, message: String, date: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);

// Project Schema
const projectSchema = new mongoose.Schema({
  title: String, desc: String, tech: [String], link: String, imagePath: String
});
const Project = mongoose.model('Project', projectSchema);

// Certificate Schema (Yahan 'imagePath' use ho raha hai popup ke liye)
const certificateSchema = new mongoose.Schema({
  title: String, organization: String, issueDate: String, imagePath: String, 
});
const Certificate = mongoose.model('Certificate', certificateSchema);


// ---------------- APIs (ROUTES) ----------------

// 1. Contact Form Submit API
app.post('/api/contact', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ success: true, message: "Aapka message save ho gaya!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// 2. Fetch Saare Projects API
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.aggregate([
      { $sort: { _id: -1 } },
      {
        $group: {
          _id: '$title',
          project: { $first: '$$ROOT' }
        }
      },
      { $replaceRoot: { newRoot: '$project' } },
      { $sort: { _id: -1 } }
    ]);
    res.status(200).json(projects);
  } catch (error) { res.status(500).json({ error: "Error fetching projects" }); }
});

// 3. Fetch Saare Certificates API
app.get('/api/certificates', async (req, res) => {
  try {
    const certs = await Certificate.find();
    res.status(200).json(certs);
  } catch (error) { res.status(500).json({ error: "Error fetching certificates" }); }
});

// 4. Seed Data (Ek click me Projects Database me dalne ke liye)
app.get('/api/seed-projects', async (req, res) => {
  try {
    // Purana data delete karke naya seed karte hain
    await Project.deleteMany({});
    await Project.insertMany(defaultProjects);
    res.send("âœ… Projects Seeded Successfully! Refresh your portfolio.");
  } catch (error) { res.status(500).send("Error seeding"); }
});

// 5. Seed Data (ISME CHANGES HUE HAIN - POINTING TO YOUR REAL IMAGES)
app.get('/api/seed-certificates', async (req, res) => {
  try {
    // Purana data delete karke naya seed karte hain
    await Certificate.deleteMany({});
    await Certificate.insertMany(defaultCertificates);
    res.send("âœ… Certificates Seeded with local image paths!");
  } catch (error) { res.status(500).send("Error seeding"); }
});

// 6. YAHAN HAI WO MISSING API (Messages dekhne ke liye)
app.get('/api/messages', async (req, res) => {
  try {
    const allMessages = await Contact.find().sort({ date: -1 });
    res.status(200).json({
      total_messages: allMessages.length,
      data: allMessages
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ success: false, message: "Error loading messages." });
  }
});

// Server Start
mongoose.connection.once('open', async () => {
  try {
    await removeRetiredProjects();
    await syncDefaultProjects();
    await removeDuplicateProjectsByTitle();
    console.log('âœ… Default projects synced');
    await syncDefaultCertificates();
    console.log('âœ… Default certificates synced');
  } catch (error) {
    console.log('âŒ Default data sync error:', error);
  }
});

app.listen(PORT, () => { console.log(`ðŸš€ Server running on http://localhost:${PORT}`); });

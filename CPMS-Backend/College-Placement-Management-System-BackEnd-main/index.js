const express = require('express');
const cors = require('cors');
const path = require("path");
const dotenv = require('dotenv');
dotenv.config();
const resumeRoute = require("./routes/resume.route");


const app = express();
app.use(cors());
app.use(express.json());

// ===== STATIC FOLDERS =====
app.use("/profileImgs", express.static(path.join(__dirname, "public/profileImgs")));
app.use("/resumes", express.static(path.join(__dirname, "public/resumes")));
app.use("/offerLetter", express.static(path.join(__dirname, "public/offerLetter")));

// ===== ROUTES =====
// resume route MUST COME AFTER static folders
app.use("/api/v1/resume", resumeRoute);

const mongodb = require('./config/MongoDB');
mongodb();

// USER ROUTES
app.use('/api/v1/user', require('./routes/user.route'));
app.use('/api/v1/student', require('./routes/student.route'));
app.use('/api/v1/tpo', require('./routes/tpo.route'));
app.use('/api/v1/management', require('./routes/management.route'));
app.use('/api/v1/admin', require('./routes/superuser.route'));
app.use('/api/v1/company', require('./routes/company.route'));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

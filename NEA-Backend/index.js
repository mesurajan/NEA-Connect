const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const gridfsStream = require('gridfs-stream');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

// Import all route files
const userRoutes = require('./routes/userRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const billRoutes = require('./routes/billRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const loadRoutes = require('./routes/loadRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const connectionRoutes = require('./routes/connectionRoutes');
const contactRoutes = require('./routes/contact');
const feedbackRoutes = require('./routes/feedbackRoutes');
const authRoutes = require('./routes/authRoutes');




// Set up Express
const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Register Routes
app.use('/api/users', userRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/schedules', loadRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/connections', connectionRoutes);
app.use('/api', contactRoutes); // ✅ This activates /api/contact route
app.use('/api/feedback', feedbackRoutes);
app.use('/uploads', express.static('uploads'));// Serve files from the 'uploads' folder
app.use("/api/auth", authRoutes);






// MongoDB connection
const conn = mongoose.createConnection(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;

conn.once('open', () => {
  // Initialize GridFS
  gfs = gridfsStream(conn.db, mongoose.mongo);
  gfs.collection('uploads');  // GridFS collection name
});

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: 'uploads/', // Store files temporarily in the 'uploads' folder
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add a unique name to the file
  },
});

const upload = multer({ storage });

// Route to handle file uploads to GridFS
app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  const userId = req.body.userId;  // Get user ID (you can modify this to use actual authentication)

  const writeStream = gfs.createWriteStream({
    filename: file.filename,
    metadata: { userId },  // Store the user ID in the file metadata
    content_type: file.mimetype,
  });

  fs.createReadStream(file.path).pipe(writeStream);

  writeStream.on('close', (uploadedFile) => {
    res.status(200).json({ message: 'File uploaded successfully', file: uploadedFile });
  });
});



// Start the server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB error:', err));

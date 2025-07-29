const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const gridfsStream = require('gridfs-stream');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Import Routes
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

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Configuration: Allow frontend origin with credentials
const allowedOrigins = ['http://localhost:5173', 'http://localhost:8080'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // ✅ allow sending cookies/sessions
}));

// ✅ General Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// ✅ Log all incoming requests (for debugging)
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// ✅ Register Routes
app.use('/api/users', userRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/schedules', loadRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/connections', connectionRoutes);
app.use('/api', contactRoutes); // e.g., /api/contact
app.use('/api/feedback', feedbackRoutes);
app.use('/api/auth', authRoutes); // ✅ login, register, etc.

// ✅ GridFS + Multer Setup
const conn = mongoose.createConnection(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
conn.once('open', () => {
  gfs = gridfsStream(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// File storage for temporary local upload
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ✅ Upload Endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (!gfs) {
    return res.status(500).json({ error: 'GridFS not initialized' });
  }

  const file = req.file;
  const userId = req.body.userId;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const writeStream = gfs.createWriteStream({
    filename: file.filename,
    metadata: { userId },
    content_type: file.mimetype,
  });

  fs.createReadStream(file.path).pipe(writeStream);

  writeStream.on('close', (uploadedFile) => {
    fs.unlinkSync(file.path); // Delete temp file
    res.status(200).json({ message: 'File uploaded successfully', file: uploadedFile });
  });

  writeStream.on('error', (err) => {
    console.error('File upload error:', err);
    res.status(500).json({ error: 'Failed to upload file' });
  });
});

// ✅ Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));

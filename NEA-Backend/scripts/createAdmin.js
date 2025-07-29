const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config(); // Load MONGO_URI from .env

const admins = [
  {
    name: 'Surajan shrestha',
    email: 'surajansth2061@gmail.com',
    password: 'Surajan@9252$$',
    address: 'NEA HQ',
    phone: '9800000000',
    citizenship: 'admin-citizen',
    photo: '',
    //node scripts/createAdmin.js vommand to create admin
  },
  {
    name: 'milan kandel',
    email: 'milan@gmail.com',
    password: 'milan',
    address: 'NEA Branch Office',
    phone: '9800000011',
    citizenship: 'admin-two',
    photo: '',
  },
  {
    name: 'Third Admin',
    email: 'admin3@nea.com',
    password: 'AdminThree@2024',
    address: 'NEA Sub Office',
    phone: '9800000022',
    citizenship: 'admin-three',
    photo: '',
  }
];

const createAdmins = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    for (const adminData of admins) {
      const exists = await User.findOne({ email: adminData.email });
      if (exists) {
        console.log(`❗ Admin already exists: ${adminData.email}`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(adminData.password, 10);

      const admin = new User({
        ...adminData,
        password: hashedPassword,
        role: 'admin'
      });

      await admin.save();
      console.log(`✅ Admin created: ${admin.email}`);
    }
  } catch (err) {
    console.error('❌ Error creating admins:', err.message);
  } finally {
    await mongoose.disconnect();
  }
};

createAdmins();

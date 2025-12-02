// seed-superuser.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Adjust path if your models file is elsewhere, but in this project it's ./models/user.model
const User = require('./models/user.model');

(async () => {
  try {
    const mongo = process.env.MONGO_URI || 'mongodb://localhost:27017/cpms';
    await mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB for seeding');

    const email = process.env.SEED_EMAIL || 'super@college.edu';
    const plain = process.env.SEED_PASS || 'SuperPass123';

    const existing = await User.findOne({ email });
    if (existing) {
      console.log('User already exists:', email);
      process.exit(0);
    }

    const hash = await bcrypt.hash(plain, 10);
    const doc = new User({
      first_name: 'Super',
      last_name: 'Admin',
      email,
      number: '0000000000',
      password: hash,
      role: 'superuser'
    });

    await doc.save();
    console.log('Superuser created:', email, 'password:', plain);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding superuser:', err);
    process.exit(1);
  }
})();

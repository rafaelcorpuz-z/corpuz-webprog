require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const getArg = (name) => {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
};

const email = getArg('--email');
const password = getArg('--password');
const username = getArg('--username') || 'admin';
const firstName = getArg('--firstName') || 'Admin';
const lastName = getArg('--lastName') || 'User';
const age = getArg('--age') || '30';
const gender = getArg('--gender') || 'N';
const contactNumber = getArg('--contactNumber') || '0000000000';
const address = getArg('--address') || 'Headquarters';

if (!email || !password) {
  console.error('Usage: node scripts/createAdmin.js --email admin@admin.com --password 123qweasd! [--username admin]');
  process.exit(1);
}

const run = async () => {
  try {
    await connectDB();
    const hashed = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      existingUser.type = 'admin';
      existingUser.password = hashed;
      existingUser.username = username || existingUser.username;
      existingUser.isActive = true;
      await existingUser.save();
      console.log(`Promoted existing user to admin: ${email}`);
      process.exit(0);
    }

    const admin = await User.create({
      firstName,
      lastName,
      age,
      gender,
      contactNumber,
      email,
      type: 'admin',
      username,
      password: hashed,
      address,
      isActive: true,
    });

    console.log(`Created admin user: ${admin.email}`);
    process.exit(0);
  } catch (error) {
    console.error('Failed to create admin:', error.message || error);
    process.exit(1);
  }
};

run();

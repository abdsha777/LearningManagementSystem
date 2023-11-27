const readline = require('readline');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/User'); // Import your User model

// Set up the readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to prompt the user for information
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/lms');

// Define the setup function
async function setupAdminUser() {
  try {
    // Prompt for admin user details
    const email = await prompt('Enter admin email: ');
    const password = await prompt('Enter admin password: ');
    const name = await prompt('Enter admin name: ');

    // Hash the password before storing it
    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await  bcrypt.hash(password ,salt);
    // Create the admin user
    const adminUser = new User({
      email,
      password: hashedPassword,
      role: 'admin',
      name
    });

    // Save the admin user to the database
    await adminUser.save();

    console.log('Admin user created successfully.');
  } catch (error) {
    console.error('Error setting up admin user:', error);
  } finally {
    // Close the readline interface and disconnect from the database
    rl.close();
    mongoose.disconnect();
  }
}

// Run the setup function
setupAdminUser();
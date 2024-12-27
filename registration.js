// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

// Connect to MongoDB (replace 'your_database' with your actual database name)
mongoose.connect('mongodb://localhost:27017/college_registration', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a schema for the registration form
const registrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    course: String,
    year: Number,
});

// Create a model based on the schema
const Registration = mongoose.model('Registration', registrationSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve the registration form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle registration
app.post('/register', (req, res) => {
    const { name, email, course, year } = req.body;

    // Simple validation
    if (!name || !email || !course || !year) {
        return res.status(400).send('All fields are required!');
    }

    // Create a new registration entry
    const newRegistration = new Registration({ name, email, course, year });
    newRegistration.save((err) => {
        if (err) {
            return res.status(500).send('Error saving registration.');
        }
        res.send('Registration successful!');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${3000}`);
});
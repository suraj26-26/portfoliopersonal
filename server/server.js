// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
// require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the root directory
// app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../project-root')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('MongoDB connected');
});

// Schema and model
const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    gender: String,
    message: String,
});
const Contact = mongoose.model('Contact', ContactSchema);

// Route to handle form submission
app.post('/submit-form', async (req, res) => {
    console.log("📨 Received form:", req.body);
    try {
        console.log('Form data received:', req.body);
        const { name, email, mobile, gender, message } = req.body;

        if (!name || !email || !mobile || !gender || !message) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newContact = new Contact({ name, email, mobile, gender, message });
        await newContact.save();
        res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error submitting form' });
    }
});

// Add this fallback route to serve index.html for root URL
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../project-root/contact.html"));
// });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

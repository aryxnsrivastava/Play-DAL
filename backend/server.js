const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const dbURI = 'mongodb://localhost:27017/Dal_CSCI2690';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

const postRoutes = require('./routes/post');
app.use('/api', postRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
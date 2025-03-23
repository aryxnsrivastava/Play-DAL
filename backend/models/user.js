const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    major: { type: String },
    favouriteSport: { type: String },
    profilePicture: { type: String, default: 'default-profile-pic-url' },
    registrationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
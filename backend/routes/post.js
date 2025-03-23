const express = require('express');
const router = express.Router();
const Post = require('../models/post'); // Import Post model

// GET all posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username'); // Populate author details (username)
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific post by ID
router.get('/posts/:id', getPost, (req, res) => { // 'getPost' middleware (defined below)
    res.json(res.post);
});

// POST a new post
router.post('/posts', async (req, res) => {
    // Assuming you'll send authorId, sport, location, date, time, and description in the request body
    const post = new Post({
        author: req.body.authorId, // For now, assuming you're sending authorId. Later, we'll get it from JWT
        sport: req.body.sport,
        location: req.body.location,
        date: req.body.date,
        time: req.body.time,
        description: req.body.description
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost); // 201 Created
    } catch (err) {
        res.status(400).json({ message: err.message }); // 400 Bad Request
    }
});

// PATCH/PUT update an existing post
router.patch('/posts/:id', getPost, async (req, res) => { // PATCH for partial updates
    if (req.body.sport != null) {
        res.post.sport = req.body.sport;
    }
    if (req.body.location != null) {
        res.post.location = req.body.location;
    }
    if (req.body.date != null) {
        res.post.date = req.body.date;
    }
    if (req.body.time != null) {
        res.post.time = req.body.time;
    }
    if (req.body.description != null) {
        res.post.description = req.body.description;
    }
    res.post.updatedAt = Date.now(); // Update updatedAt timestamp

    try {
        const updatedPost = await res.post.save();
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a post
router.delete('/posts/:id', getPost, async (req, res) => {
    try {
        await res.post.remove();
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get a post by ID (reusable for GET, PATCH, DELETE by ID routes)
async function getPost(req, res, next) {
    let post;
    try {
        post = await Post.findById(req.params.id).populate('author', 'username'); // Populate author details
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' }); // 404 Not Found
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.post = post; // Store the found post in res.post for the route handler to use
    next(); // Move to the next middleware or route handler
}

module.exports = router;
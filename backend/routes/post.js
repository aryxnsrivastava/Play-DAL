const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username');
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/posts/:id', getPost, (req, res) => {
    res.json(res.post);
});

router.post('/posts', async (req, res) => {
    const post = new Post({
        author: req.body.authorId,
        sport: req.body.sport,
        location: req.body.location,
        date: req.body.date,
        time: req.body.time,
        description: req.body.description
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/posts/:id', getPost, async (req, res) => {
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
    res.post.updatedAt = Date.now();

    try {
        const updatedPost = await res.post.save();
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/posts/:id', getPost, async (req, res) => {
    try {
        await Post.deleteOne({ _id: res.post._id });

        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getPost(req, res, next) {
    let post;
    try {
        post = await Post.findById(req.params.id).populate('author', 'username');
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.post = post;
    next();
}

module.exports = router;
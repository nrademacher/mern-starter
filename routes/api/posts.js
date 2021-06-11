const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../../models/Post');
const validatePostInput = require('../../validation/posts');

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Get a user's posts
router.get('/user/:userId', async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId });
    res.json(posts);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Get an individual post
router.get('/:id', async (req, res) => {
  try {
const post = await Post.findById(req.params.id)
    res.json(post)
  } catch (err) {
      res.status(404).json({ nopostfound: err.message})
  }
});

// Post posts on jwt-protected route
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      user: req.user.id,
    });

    const post = await newPost.save()
    res.json(post)
  }
);

router.patch(
  '/:userId/:postId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    try {
      const post = await Post.updateOne(
        { _id: req.params.postId, user: req.params.userId },
        { text: req.body.text }
      );
      post.n
        ? res.json({ success: true, modified: post.nModified })
        : res.json({ sucess: false, error: 'no such post' });
    } catch {
      res
        .status(404)
        .json({ nopostfound: 'No post found from that user with that ID' });
    }
  }
);

router.delete(
  '/:userId/:postId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const post = await Post.deleteOne({
        _id: req.params.postId,
        user: req.params.userId,
      });
      post.deletedCount
        ? res.json({ success: true, deleted: post.deletedCount })
        : res.json({ success: false, error: 'no such post' });
    } catch (err) {
      (err) => res.status(404).json({ error: err.message });
    }
  }
);

module.exports = router;

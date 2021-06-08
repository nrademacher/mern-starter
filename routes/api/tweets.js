const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const Tweet = require('../../models/Tweet');
const validateTweetInput = require('../../validation/tweets');

const router = express.Router();

// Get all tweets
router.get('/', async (req, res) => {
  try {
    const tweets = await Tweet.find().sort({ date: -1 });
    res.json(tweets);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Get a user's tweets
router.get('/user/:userId', async (req, res) => {
  try {
    const tweets = await Tweet.find({ user: req.params.userId });
    res.json(tweets);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Get an individual tweet
router.get('/:id', async (req, res) => {
  try {
const tweet = await Tweet.findById(req.params.id)
    res.json(tweet)
  } catch (err) {
      res.status(404).json({ notweetfound: err.message})
  }
});

// Post tweets on jwt-protected route
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateTweetInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newTweet = new Tweet({
      text: req.body.text,
      user: req.user.id,
    });

    const tweet = await newTweet.save()
    res.json(tweet)
  }
);

router.patch(
  '/:userId/:tweetId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateTweetInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    try {
      const tweet = await Tweet.updateOne(
        { _id: req.params.tweetId, user: req.params.userId },
        { text: req.body.text }
      );
      tweet.n
        ? res.json({ success: true, modified: tweet.nModified })
        : res.json({ sucess: false, error: 'no such tweet' });
    } catch {
      res
        .status(404)
        .json({ notweetfound: 'No tweet found from that user with that ID' });
    }
  }
);

router.delete(
  '/:userId/:tweetId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const tweet = await Tweet.deleteOne({
        _id: req.params.tweetId,
        user: req.params.userId,
      });
      tweet.deletedCount
        ? res.json({ success: true, deleted: tweet.deletedCount })
        : res.json({ success: false, error: 'no such tweet' });
    } catch (err) {
      (err) => res.status(404).json({ error: err.message });
    }
  }
);

module.exports = router;

process.env.NODE_ENV === 'development' && require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
require('./config/passport')(passport);
const cors = require('cors');
const users = require('./routes/api/users');
const tweets = require('./routes/api/tweets');

const db = process.env.MONGO_URI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.log(err));

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use('/api/users', users);
app.use('/api/tweets', tweets);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

process.env.NODE_ENV === 'development' && require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

module.exports = {
  register: async (data) => {
    try {
      // make sure our inputs our valid
      const { errors, isValid } = validateRegisterInput(data);

      if (!isValid) {
        Object.keys(errors).forEach((error) => {
          throw new Error(errors[error]);
        });
      }

      const { handle, email, password } = data;
      // make sure this sure doesn't already exist
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error('This user already exists');
      }
      // hash our password
      const hashedPassword = await bcrypt.hash(password, 10);
      // create a new User
      const user = new User(
        {
          handle,
          email,
          password: hashedPassword,
        },
        (err) => {
          if (err) throw err;
        }
      );

      user.save();
      // create our authentication token using the secretOrkey we created before
      const token = jwt.sign({ id: user._id }, process.env.SECRET);

      // return to our mutation the token, verifying this User is logged in
      // as well as the rest of the user's info, and blanking out the password
      return { token, loggedIn: true, ...user._doc, password: null };
    } catch (err) {
      throw err;
    }
  },
  login: async (data) => {
    const { errors, isValid } = validateLoginInput(data);

    if (!isValid) {
      Object.keys(errors).forEach((error) => {
        throw new Error(errors[error]);
      });
    }

    const { email, password } = data;
    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error('User not found');
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const payload = { id: user.id, handle: user.handle };

        const jwtToken = jwt.sign(
          payload,
          process.env.SECRET,
          // Tell the key to expire in one hour
          { expiresIn: 3600 }
        );

        return { token: 'Bearer ' + jwtToken };
      } else {
        throw new Error('Incorrect password');
      }
    } catch (err) {
      throw err;
    }
  },
  verifyUser: async (data) => {
    try {
      // we take in the token from our mutation
      const { token } = data;
      // we decode the token using our secret password to get the
      // user's id
      const decoded = jwt.verify(token, process.env.SECRET);
      const { id } = decoded;

      // then we try to use the User with the id we just decoded
      // making sure we await the response
      const loggedIn = await User.findById(id).then((user) => {
        return user ? true : false;
      });

      return { loggedIn };
    } catch (err) {
      return { loggedIn: false };
    }
  },
};

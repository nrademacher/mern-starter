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
      /* const { message, isValid } = validateRegisterInput(data);

      if (!isValid) {
        throw new Error(message);
      } */

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
};

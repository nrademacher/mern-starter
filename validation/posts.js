const Validator = require('validator');
const validText = require('./validText');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = validText(data.text) ? data.text : '';

  if (!Validator.isLength(data.text)) {
    errors.text = 'Post cannot be empty';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text === 'Text field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

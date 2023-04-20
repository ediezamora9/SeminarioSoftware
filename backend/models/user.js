const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'basic',
    enum: ['basic', 'admin']
  }
});

userSchema.index({username:1}, {unique:true});

module.exports = mongoose.model('User', userSchema);
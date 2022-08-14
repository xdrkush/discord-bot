/*
 *
 * Model de 'User'
 ******************************/

const bcrypt = require('bcrypt'),
  mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String
  },
  idDiscord: {
    type: String,
    unique: true
  },
  status: {
    type: String,
    default: 'user'
  },
  social: {
    type: Object,
    default: {}
  },
  walletBtc: {
    type: String
  },
  bio: {
    type: String,
    default: "C'est bien, c'est bon, c'est BIO ! ;)"
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isModo: {
    type: Boolean,
    default: false
  },
  isBan: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String,
    default: 'https://www.assessfirst.com/__front/img/brand/Unicorn-gris-blackback.png'
  }
})

module.exports = mongoose.model('User', UserSchema)
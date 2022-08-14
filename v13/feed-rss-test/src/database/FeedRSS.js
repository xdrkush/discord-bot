/*
 *
 * Model de 'FeedRSS'
 ******************************/

const mongoose = require('mongoose')

const FeedRSSSchema = new mongoose.Schema({
  author: {
    type: String
  },
  categories: {
    type: Array
  },
  title: {
    type: String
  },
  image: {
    type: String
  },
  link: {
    type: String
  },
  datePub: {
    type: String,
    unique: true
  }
})

module.exports = mongoose.model('FeedRSS', FeedRSSSchema)
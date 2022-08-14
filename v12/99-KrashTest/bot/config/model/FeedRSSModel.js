/*
 *
 * Model de 'User'
 ******************************/

const mongoose = require('mongoose')

const FeedRssSchema = new mongoose.Schema({
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

module.exports = mongoose.model('FeedRss', FeedRssSchema)
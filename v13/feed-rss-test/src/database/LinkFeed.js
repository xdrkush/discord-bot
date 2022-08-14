/*
 *
 * Model de 'LinkFeed'
 ******************************/

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Import model
const FeedRSS = require('./FeedRSS')

const LinkFeedSchema = new mongoose.Schema({
  author: {
    type: String
  },
  channelID: {
    type: String
  },
  categories: {
    type: Array
  },
  link: {
    type: String
  },
  feed: [{
    type: Schema.Types.ObjectId,
    ref: 'FeedRSS'
  }]
})

module.exports = mongoose.model('LinkFeed', LinkFeedSchema)
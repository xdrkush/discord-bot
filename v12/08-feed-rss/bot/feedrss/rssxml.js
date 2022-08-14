// Import de module
const fetch = require('node-fetch')
  , myEvents = require('../events')
  , CronJob = require('cron').CronJob
  , FeedParser = require('feedparser')
  , dateFormat = require("dateformat");

// Model
const Feed = require('../config/model/FeedRSSModel')

// Event
console.log('Test Cron !')

module.exports = msg => {
  var job = new CronJob({
    cronTime: '* * * * * *',

    onTick: async () => {
      var req = fetch('https://journalducoin.com/feed'),
        feedparser = new FeedParser();

      req.then((res) => {
        if (res.status !== 200) throw new Error('Bad status code')
        else res.body.pipe(feedparser)
      }, (err) => console.log(err));

      feedparser.on('error', (error) => console.log(error))

      feedparser.on('readable', function () {
        var stream = this;
        var meta = this.meta;
        var item;

        while (item = stream.read()) {
          matched(msg, item)
        }
      });

    },
    start: true
  });
}

async function matched(msg, event) {
  const dbFeed = await Feed.findOne({ datePub: dateFormat(event.date.toString(), "isoDateTime") })

  if (!dbFeed) {
    console.log('notmatched')
    Feed
      .create({
        author: event.author,
        title: event.title,
        link: event.link,
        datePub: dateFormat(event.date.toString(), "isoDateTime"),
        categories: event.categories
      }, (err, data) => {
        if (err) console.log(err)
        // console.log('Feed create: ' + Date.now(), data)
        // Event (message embed discord)
        myEvents.emit('rss', msg, event)
      })
  }
  else console.log('matched')

}

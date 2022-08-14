/*
 * All functions 'FeedRSS'
 * ********************** */
// Import module
const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const FeedParser = require("feedparser");
const fs = require("fs");
const moment = require("moment");
const CronJob = require("cron").CronJob;

const { FeedRSS, LinkFeed } = require("../models");

exports.addFeed = async (interaction) => {
  // for test :: https://journalducoin.com/feed
  // const link = "https://journalducoin.com/feed"
  const link = interaction.options.getString("link");
  const regexHttp = /^((https):\/\/)/;
  const feed = new FeedParser();

  if (!regexHttp.test(link))
    await interaction.reply(
      "Une erreur est survenue !! (HTTPS only) :: " + link
    );

  await axios
    .get(link, { Accept: "text/xml", responseType: "stream" })
    .then(async (res) => {
      if (res.status !== 200)
        return await interaction.reply(
          "Une erreur est survenue !! (Status req HTTP: " + res.status + " )"
        );
      else if ((interaction.channelId, link))
        LinkFeed.create(
          {
            link: link,
            channelID: interaction.channelId,
          },
          async (err, data) => {
            if (err) console.log(err);
            console.log("Feed create: " + Date.now(), data);
            return await interaction.reply(
              "add feed rss, in progress ! // " + link
            );
          }
        );
    })
    .catch((error) => console.log(error));

  //   console.log(feed)
};

exports.deleteFeed = async (interaction) => {
  const selector = interaction.options.getString("link");
  const link = await LinkFeed.findOne({ link: selector });
  console.log("DELETE FEED", selector, link);

  if (link) {
    LinkFeed.deleteOne({ link: selector }, (err) => {
      if (err) console.log(err);
      return interaction.guild.channels.cache
        .get(interaction.channelId)
        .send({ content: "Feed deleted !" });
    });
  } else
    return interaction.guild.channels.cache
      .get(interaction.channelId)
      .send({ content: "error: deleted !" });

  return await interaction.reply(
    "Deleted feed " + link.link + ", in progress !"
  );
};

exports.listFeed = async (interaction) => {
  const listLink = await LinkFeed.find({});

  listLink.map(async (link, index) => {
    const channel = interaction.guild.channels.cache.get(link.channelID);
    const embed = new MessageEmbed()
      .setTitle(`onChannel: #${channel.name}`)
      .setDescription(`link: ${link.link}`)
      .setColor("RANDOM");

    return interaction.guild.channels.cache
      .get(interaction.channelId)
      .send({ embeds: [embed] });
  });

  return await interaction.reply("List feed !");
};

exports.runFeed = async (interaction) => {
  const listLink = await LinkFeed.find({});
  const job = new CronJob("1 * * * * *", function () {
    console.log("Run Cron process ...");
    listLink.map(async (link, index) => {
      const req = axios.get(link.link, {
          responseType: "stream",
        }),
        feedparser = new FeedParser();

      req.then(
        (res) => {
          if (res.status !== 200) throw new Error("Bad status code");
          else res.data.pipe(feedparser);
        },
        (err) => console.log(err)
      );

      feedparser.on("error", (err) => console.log(err));

      feedparser.on("readable", function () {
        let stream = this;
        let meta = this.meta;
        let item;

        while ((item = stream.read())) {
          matched(interaction, link, item);
        }
      });
    });
  });
  job.start();
  return await interaction.reply("run feed rss, in progress !");
};

async function matched(interaction, link, item) {
  const dateItem = new Date(item.date);
  const isExist = await FeedRSS.findOne({ datePub: moment(dateItem).format() });

  if (isExist) return;
  else {
    console.log("add new item", item.title);
    await FeedRSS.create({
      author: item.author,
      title: item.title,
      link: item.link,
      datePub: moment(dateItem).format(),
      categories: item.categories,
    });

    const embed = new MessageEmbed()
      .setTitle(`Title: #${item.title}`)
      .setDescription(`link: ${item.link}`)
      .setColor("RANDOM");

    return interaction.guild.channels.cache
      .get(link.channelID)
      .send({ embeds: [embed] });
  }
}

exports.helpFeed = async (interaction) => {
  console.log("HELP FEED");
  return await interaction.reply("help feed rss, in progress ! // ");
};

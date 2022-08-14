const axios = require("axios");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { addFeed, deleteFeed, listFeed, runFeed, helpFeed } = require("./utils");
const LinkRSS = require("../../database/LinkFeed");

module.exports = {
  name: "rss",
  data: new SlashCommandBuilder()
    .setName("rss")
    .setDescription("info feed rss !")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("add")
        .setDescription("Add feed RSS to list")
        .addStringOption((option) =>
          option.setName("link").setDescription("the link on format XML only !")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("del")
        .setDescription("Delete feed RSS to list")
        .addStringOption((option) =>
          option.setName("link").setDescription("the link of feed RSS !")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("list").setDescription("Delete Feed RSS to list")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("run").setDescription("Delete Feed RSS to list")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("help").setDescription("Delete Feed RSS to list")
    ),
  run: async (interaction) => {
    console.log("interaction slashcommandbuilder", interaction.options);
    switch (interaction.options.getSubcommand()) {
      case "add":
        return await addFeed(interaction);
        break;
      case "del":
        deleteFeed(interaction);
        return await deleteFeed(interaction);
        break;
      case "list":
        return await listFeed(interaction);
        break;
      case "run":
        runFeed(interaction);
        return await runFeed(interaction);
        break;
      case "help":
        helpFeed(interaction);
        return await helpFeed(interaction);
        break;

      default:
        break;
    }
  },
};

/*
 * All Command 'FeedRSS'
 * ******************** */

const { SlashCommandBuilder } = require("@discordjs/builders");
const { addFeed, deleteFeed, listFeed, runFeed, helpFeed } = require("./utils");

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
      subcommand.setName("list").setDescription("List Feed RSS to list")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("run").setDescription("Run Feed RSS on list")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("help").setDescription("Help for Feed RSS")
    ),
  run: async (interaction) => {
    switch (interaction.options.getSubcommand()) {
      case "add":
        return await addFeed(interaction);
        break;
      case "del":
        return await deleteFeed(interaction);
        break;
      case "list":
        return await listFeed(interaction);
        break;
      case "run":
        return await runFeed(interaction);
        break;
      case "help":
        return await helpFeed(interaction);
        break;

      default:
        return await interaction.reply("Une erreur est survenu ... !");
        break;
    }
  },
};

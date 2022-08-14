/*
 * Command 'Ping'
 * ************* */

const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  name: "ping",
  // description: "Replies with fucking Pong!",
  // aliases: ["pong", "latency"],
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with your input!"),
  run: async (interaction) => {
    console.log("interaction slashcommandbuilder");
    await interaction.reply("Pong !");
  },
};

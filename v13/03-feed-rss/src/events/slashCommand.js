/*
 * Response or Run for action 'SlashCommand'
 * ***************************************** */

const { MessageEmbed } = require("discord.js");
const client = require("../index.js");

// Command
client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isCommand()) return;
    console.log("InteractionCreate Command");
    const command = client.commands.get(interaction.commandName.toLowerCase())
    if (!command) return;
    await command.run(interaction);
  } catch (e) {
    console.error(e);
    interaction.followUp({ content: e.message, ephemeral: true });
  }
});

const { MessageEmbed } = require("discord.js");
const client = require("../index.js");

// SelectMenu
client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isSelectMenu()) return;
    console.log("InteractionCreate SelectMenu");
    const command = client.commands.get(interaction.customId.toLowerCase());

    if (!command) return;
    await command.run(interaction);
  } catch (e) {
    console.error(e);
    interaction.followUp({ content: e.message, ephemeral: true });
  }
});

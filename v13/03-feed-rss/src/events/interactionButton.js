/*
 * Response or Run for action 'Button'
 * ********************************** */

const { MessageEmbed } = require("discord.js");
const client = require("../index.js");

// Button
client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isButton()) return;
    console.log("Interaction isButton");
    // Pour les component Button. component.customId
    let command = client.commands.get(interaction.customId.toLowerCase());

    if (command === undefined) {
      // Pour les component response multiple button component.customId[i]
      command = client.commands.find((c) =>
        c.customId?.includes(interaction.customId.toLowerCase())
      );
      await command.response(interaction);
    } else {
      if (!command) return;
      await command.run(interaction);
    }
  } catch (e) {
    console.error(e);
    interaction.followUp({ content: e.message, ephemeral: true });
  }
});

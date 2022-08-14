const {
  MessageActionRow,
  MessageSelectMenu,
  MessageEmbed,
} = require("discord.js");

module.exports = {
  name: "select",
  customId: "select",
  description: "select !!!",
  run: async (interaction) => {
    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("select")
        .setPlaceholder("Mon super select")
        .addOptions([
          {
            label: "Option 1",
            description: "This is a description option 1",
            value: "first_option",
          },
          {
            label: "Option 2",
            description: "This is also a description option 2",
            value: "second_option",
          },
        ])
    );

    await interaction.reply({ content: "Select !", ephemeral: true, components: [row] });
  },
  response: async (interaction) => {
    console.log("select response");

    let message = await interaction.channel.messages.fetch(
      interaction.message.id
    );
    let value = interaction.values;

    if (value[0] === "first_option") {
      await interaction.deferUpdate();

      const embed = new MessageEmbed()
        .setTitle("response option 1")
        .setDescription("description repsonse option 1")
        .setColor("RANDOM");

      await message.edit({ embeds: [embed] });
    } else if (value[0] === "second_option") {
      await interaction.deferUpdate();

      const embed = new MessageEmbed()
      .setTitle("response option 2")
      .setDescription("description repsonse option 2")
        .setColor("RANDOM");

      await message.edit({ embeds: [embed] });
    }
  },
};

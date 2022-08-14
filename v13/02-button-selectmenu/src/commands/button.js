const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
  name: "button",
  customId: "button1",
  description: "Button !!!",
  aliases: ["action", "button"],
  run: async (interaction) => {
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("button1")
        .setLabel("Button 1")
        .setStyle("PRIMARY")
    );

    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Title button 1")
      .setURL("https://discord.js.org")
      .setDescription("Some description button 1");

    await interaction.reply({
      content: "button 1 !",
      embeds: [embed],
      components: [row],
    });
  },
  response: async (interaction) => {
    console.log('button response1', interaction)
    let message = await interaction.channel.messages.fetch(
      interaction.message.id
    );
    console.log('button response2', message)

    await interaction.deferUpdate();

    const embed = new MessageEmbed()
      .setTitle("response button 1")
      .setDescription("Description response button 1")
      .setColor("RANDOM");

    await message.edit({ embeds: [embed] });
    // await interaction.reply({ content: "Pong!", components: [] });

  },
};

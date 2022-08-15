const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('faucet')
        .setDescription('Interact with button !'),
    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('claimToken')
                    .setLabel('claim token')
                    .setStyle(ButtonStyle.Primary),
            );

        await interaction.reply({ content: 'Claim token', components: [row] });
    },
};
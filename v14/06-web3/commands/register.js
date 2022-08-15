const { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { KushToken, info } = require('../config/web3')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {		// Create the modal
        const modal = new ModalBuilder()
            .setCustomId('registerModal')
            .setTitle('Register to faucet');

        const registerAddressPublic = new TextInputBuilder()
            .setCustomId('registerAddressPublic')
            // The label is the prompt the user sees for this input
            .setLabel("Enter your public address (0x...): ")
            // Short means only a single line of text
            .setStyle(TextInputStyle.Short);

        const registerAction = new ActionRowBuilder().addComponents(registerAddressPublic);

        modal.addComponents(registerAction);

        await interaction.showModal(modal);
    },
};
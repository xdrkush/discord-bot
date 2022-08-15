const { InteractionType } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);

		// registerModal
		if (interaction.customId === 'registerModal') {
			if (interaction.type !== InteractionType.ModalSubmit) return;
			console.log("registerModal", interaction);

			const registerAddressPublic = interaction.fields.getTextInputValue('registerAddressPublic');

			await interaction.reply({ content: `Your register submission was received successfully with this address: ${ registerAddressPublic } !` });
		}
		// claimToken
		if (interaction.customId === 'claimToken') {
			if (!interaction.isButton()) return;
			console.log("claimToken", interaction);

			await interaction.reply({ content: `Your received  X token !` });
		}
	},
};
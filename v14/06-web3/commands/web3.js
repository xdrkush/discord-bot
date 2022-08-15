const { SlashCommandBuilder } = require('discord.js');
const { info } = require('../config/web3')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Interact with web3 !'),
    async execute(interaction) {
        const t = await info()
        await interaction.reply(`
            Name: ${t.name} 
            \nSymbol: ${t.symbol}
            \nBalanceOf: ${t.balanceOf}
            \nTotalSupply: ${t.totalSupply}
            \nContract: ${t.addressContract}
            \nDeployer: ${t.addressDeployer} `);
    },
};
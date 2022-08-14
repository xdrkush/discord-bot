// at the top of your file
const Discord = require('discord.js');
const { discord } = require('./bot');

console.log(`discord: connected as '${discord.user.username}'`);

module.exports = {
  embed: new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Commande Help !')
	.setAuthor(discord.user.username, 'https://pbs.twimg.com/profile_images/1281686197371383810/uas7SAaD_400x400.jpg')
	.setDescription('Retrouver les commandes possibles sur le bot.')
	.setThumbnail('https://pbs.twimg.com/profile_images/1281686197371383810/uas7SAaD_400x400.jpg')
	.addFields(
		{ name: '\`!bot help\`', value: 'Donc la commande à connaitre !' },
		{ name: '\`!bot contact\`', value: 'Comment prendre contact avec nous ;)' },
		{ name: '\`!bot add userTwitter\`', value: '!! Attention à bien être de le channel voulu !! \n Le @user sans le @ en gros !' },
		{ name: '\`!bot remove userTwitter\`', value: '!! Attention à bien être de le channel voulu !! \n Le @user sans le @ en gros !' },
		{ name: '\`!bot list\`', value: 'Permet de lister les channels.' },
		{ name: '\`!bot audio help\`', value: 'Permet de lister les commandes pour l\'audio.' },
		{ name: 'Usage', value: `Usage: \`\`!bot <add | remove | list>\`\``},
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Admin', value: '@admin', inline: true },
		{ name: 'Modo', value: '@modo', inline: true },
	)
	.addField('Dev', '@dev', true)
	.setImage('https://pbs.twimg.com/profile_banners/1281685713126338561/1594413007/600x200')
	.setTimestamp()
	.setFooter(discord.user.username + ' <3', 'https://pbs.twimg.com/profile_images/1281686197371383810/uas7SAaD_400x400.jpg')
}
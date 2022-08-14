const Discord = require('discord.js');
const discord = new Discord.Client();

const commands = require('./commands');
require('dotenv').config()

discord.on('ready', () => {
  console.log(`Logged in as ${discord.user.tag}!`);
});
 
discord.on('message', msg => {
  // On demande de ne pas écouter les autres bot
  if (msg.author.bot) return;
  // Il faut que la commande commence par le préfix parametré
  if (!msg.content.startsWith(process.env.DISCORD_CMD_PREFIX)) return;
  // Il arrete la commande si ce n'est pas executer par un bot autoriser, ou par un propriétaire de la guilde
  if (msg.author.id !== process.env.DISCORD_BOT_OWNER_ID
    && msg.author.id !== msg.guild.owner.id) return;
  // Split message into an array on any number of spaces
  msg.params = msg.content.split(/ +/g).map(x => x.toLowerCase()); // eslint-disable-line no-param-reassign
  // Diviser le message en un tableau sur n'importe quel nombre d'espaces
  msg.cmd = msg.params.shift() // eslint-disable-line no-param-reassign
    .slice(process.env.DISCORD_CMD_PREFIX.length).toLowerCase();
  // quitter si la command ne commence pas par le prefix
  if (!msg.cmd) return;
  // on ce focalise sur les commandes twitter
  if (msg.cmd !== 'bot') return;
  // These commands need to be run in a guild text channel to associate the guild id and channel id
  if (msg.channel.type === 'dm') {
    msg.author.send('This command does not work via DMs. Please run it in a guild\'s text channel.')
      .catch(err => console.log(err));
    return;
  }
  console.log(`DISCORD: [${msg.guild.name}] (#${msg.channel.name}) <${msg.author.tag}>: ${msg.content}`);
  msg.prefix = process.env.DISCORD_CMD_PREFIX; // eslint-disable-line no-param-reassign
  commands(msg);
});

discord.login(process.env.TOKEN_DISCORD);
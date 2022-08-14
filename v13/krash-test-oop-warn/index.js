require('dotenv').config()
const { Intents } = require("discord.js");

const Bot = require('./src')
const bot = new Bot({
	intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    // Intents.FLAGS.GUILD_PRESENCES,
    // Intents.FLAGS.DIRECT_MESSAGES,
    // Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    // Intents.FLAGS.GUILD_MEMBERS,
    // Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    // Intents.FLAGS.GUILD_WEBHOOKS,
    // Intents.FLAGS.GUILD_VOICE_STATES,
    // Intents.FLAGS.GUILD_INVITES,
    // Intents.FLAGS.GUILD_BANS,
  ],
});

bot.run()
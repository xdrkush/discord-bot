const { Client, Collection, Intents } = require("discord.js");
const { Routes } = require('discord-api-types/v9');
const { TOKEN_DISCORD } = process.env

const client = new Client({
   /* messageCacheLifetime: 60,
    fetchAllMembers: false,
    messageCacheMaxSize: 10,
    restTimeOffset: 0,
    restWsBridgetimeout: 100,
    shards: "auto", */
    allowedMentions: {
        parse: ["roles", "users"],
        repliedUser: true,
    },
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

/*
 * Slash Menu
 * ********** */
module.exports = client

client.commands = new Collection()
client.slashCommands = new Collection()
client.config = require("./config")

// most people use handler like below
// require("./handler/mongoose")(client) // delete this if you don't want it
require("./handler/command")(client) 

// // login
client.login(TOKEN_DISCORD)

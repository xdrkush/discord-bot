console.log("Run Bot");
require("dotenv").config();

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const token = process.env.TOKEN_DISCORD;

const RequestRPC = require('./api-blk')

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
    name: "blk",
    description: "Blockchain getblockcount",
  },
  {
    name: "blc",
    description: "Blockchain getbalance",
  },
];

const rest = new REST({ version: "9" }).setToken(token);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

const { Client, Intents } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }

  if (interaction.commandName === "blk") {
    const r = new RequestRPC('getblockcount')
    r.getBlockCount().then(data => {
      console.log('oops', data)
      interaction.reply("blockcount: " + data.result);
    })
  }

  if (interaction.commandName === "blc") {
    const r = new RequestRPC('getbalance')
    r.getBalance().then(data => {
      console.log('oops', data)
      interaction.reply("balance: " + data.result);
    })
  }
});

client.login(token);

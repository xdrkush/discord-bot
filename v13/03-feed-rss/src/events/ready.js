/*
 * Action 'Ready'
 * ************* */

const client = require("../index.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { GUILD_ID, CLIENT_ID, TOKEN_DISCORD } = process.env;

const commands = [];
client.commands.forEach((command) => {
  if (command.data) commands.push(command.data.toJSON());
});

// SelectMenu
client.once("ready", async () => {
  try {
    console.log(`${client.user.username} - ready noww`);

    const rest = new REST({ version: "9" }).setToken(TOKEN_DISCORD);
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
  } catch (e) {
    console.error(e);
  }
});

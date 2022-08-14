const { Client, Intents } = require("discord.js");
const discord = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// Warn to add command to ./commands/index.js
const { commands } = require("./commands");
const { TOKEN_DISCORD, CLIENT_ID, GUILD_ID } = process.env;

// Menu
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const rest = new REST({ version: "9" }).setToken(TOKEN_DISCORD);

// Selector Menu '/'
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

// Ready
discord.on("ready", () => {
  console.log(`Logged in as ${discord.user.tag}!`);
});

// Command
discord.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isCommand()) return;
    commands.forEach((command) => {
      if (interaction.commandName === command.name) command.run(interaction);
    });
  } catch (e) {
    console.error(e);
    interaction.followUp({ content: e.message, ephemeral: true });
  }
});

// Button
discord.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isButton()) return;
    commands.forEach((command) => {
      if (interaction.customId === command.customId)
        command.response(interaction);
    });
  } catch (e) {
    console.error(e);
    interaction.followUp({ content: e.message, ephemeral: true });
  }
});

// SelectMenu
discord.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isSelectMenu()) return;
    commands.forEach((command) => {
      if (interaction.customId === command.customId)
        command.response(interaction);
    });
  } catch (e) {
    console.error(e);
    interaction.followUp({ content: e.message, ephemeral: true });
  }
});

// Connect
discord.login(process.env.TOKEN_DISCORD).catch((err) => {
  console.log("discord: login error");
  console.log(err);
  process.exit(1);
});

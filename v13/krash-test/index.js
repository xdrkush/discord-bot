console.log("Run Bot");
require("dotenv").config();

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const {
  MessageActionRow,
  MessageEmbed,
  MessageSelectMenu,
  MessageButton,
} = require("discord.js");

const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const token = process.env.TOKEN_DISCORD;

const RequestRPC = require("./api-blk");

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
  {
    name: "btn",
    description: "Button !!!",
  },
  {
    name: "select",
    description: "Select !!!",
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
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    // Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    // Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_BANS,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  console.log("log:", interaction, "\n ici !!!");
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }

  if (interaction.commandName === "btn") {
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("button1")
        .setLabel("Primary")
        .setStyle("PRIMARY")
    );

    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Some title")
      .setURL("https://discord.js.org")
      .setDescription("Some description here");

    await interaction.reply({
      content: "Pong!",
      ephemeral: true,
      embeds: [embed],
      components: [row],
    });
  }

  if (interaction.commandName === "select") {
    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("select")
        .setPlaceholder("Nothing selected")
        .addOptions([
          {
            label: "Select me",
            description: "This is a description",
            value: "first_option",
          },
          {
            label: "You can select me too",
            description: "This is also a description",
            value: "second_option",
          },
        ])
    );

    await interaction.reply({ content: "Pong!", components: [row] });
  }
});

client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isButton()) return;

    if (interaction.customId === "button1") {
      let message = await interaction.channel.messages.fetch(
        interaction.message.id
      );

      await interaction.deferUpdate();

      const embed = new MessageEmbed()
        .setTitle("Value Halo")
        .setDescription("ini valuenya halo")
        .setColor("RANDOM");

      await message.edit({ embeds: [embed] });
    }
  } catch (e) {
    console.error(e);
    interaction.followUp({ content: e.message, ephemeral: true });
  }
});

client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isSelectMenu()) return;

    if (interaction.customId === "select") {

      let message = await interaction.channel.messages.fetch(
        interaction.message.id
      );
      let value = interaction.values;

      if (value[0] === "first_option") {
        await interaction.deferUpdate();

        const embed = new MessageEmbed()
          .setTitle("Value Halo")
          .setDescription("ini valuenya halo")
          .setColor("RANDOM");

        await message.edit({ embeds: [embed] });
      } else if (value[0] === "second_option") {
        await interaction.deferUpdate();

        const embed = new MessageEmbed()
          .setTitle("Value Hah")
          .setDescription("inivaluenya hah")
          .setColor("RANDOM");

        await message.edit({ embeds: [embed] });
      }
    }

    // if error
  } catch (e) {
    console.error(e);
    interaction.followUp({ content: e.message, ephemeral: true });
  }
});

client.login(token);

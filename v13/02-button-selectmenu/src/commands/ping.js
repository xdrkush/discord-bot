module.exports = {
  name: "ping",
  description: "Replies with fucking Pong!",
  aliases: ["pong", "latency"],
  run: async (interaction) => {
		await interaction.reply("Pong!");
	},
};

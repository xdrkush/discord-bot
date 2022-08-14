const { Client, Collection } = require("discord.js");

class Bot extends Client {
	constructor(...options) {
		super(...options);
		this.aliases = new Collection();
		this.commands = new Collection();
		this.interactions = new Collection();
		this.config = {}
	}

	run(token = process.env.TOKEN ? process.env.TOKEN : process.env.DISCORD_TOKEN) {
        console.log('icici', this)
		if (!token) throw new TypeError("Invalid Token provided. Please ensure that you have set your enviroment variables to either \"TOKEN\" or \"DISCORD_TOKEN\".");
		this.login(token)
			// ["command", "event", "interaction"].forEach(handler => {
			// 	require(`../handlers/${handler}`)(this);
			// });
	}
}

module.exports = Bot;

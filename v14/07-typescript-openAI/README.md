## Installation

Clone the repository then create a file named `.env` and fill it out accordingly

```js
TOKEN=YOURTOKENHERE
CLIENT_ID=BOTS CLIENT ID
PREFIX=!
OPENAI_API_KEY=YOUR OPENAI API KEY
```

Build the project with `npm install` using the typescript module and start the bot using the `npm start` command

For run in dev `npm run dev`, if you don't have nodemon, you can install with `npm i -g nodemon`

# What is add in the repo with openAI ?

```js
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"
import { SlashCommand } from "../types";
// Import OPEN AI
import { Configuration, OpenAIApi } from "openai";

// Config OPEN AI
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
// CREATE INSTANCE OPEN AI
const openai = new OpenAIApi(configuration);

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("chatgpt")
        .setDescription("Talk with chat GPT.")
        // INSERT OPTIONS FOR GET INPUT FROM USER
        .addStringOption(option =>
            option.setName('input')
                .setDescription('Votre question pour chat GPT.')), // warn with "," at end

    execute: async interaction => {
        // CHECK IF INPUT
        if (!interaction.options.get("input"))
            return await interaction.reply("🚫 Oops !")

        console.log('interaction', interaction.options.get("input"))
        // INPUT USER
        const question = `${interaction.options.get("input")?.value}`
        // STOCK RESPONSE FROM OPENAI
        const gptResponse: any = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: question,
            max_tokens: 60,
            temperature: 0.3,
            top_p: 0.3,
            presence_penalty: 0,
            frequency_penalty: 0.5,
        });

        // RESPONSE FOR USER
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: "Chat GPT:" })
                    .setDescription(`🔎 Question: ${question} \n📡 réponse: ${gptResponse.data.choices[0].text}`)
            ]
        })

    },
    cooldown: 10
}

export default command
```

Inspired of https://github.com/MericcaN41/discordjs-v14-template-ts

Edited by xdrkush
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"
import { SlashCommand } from "../types";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("chatgpt")
        .setDescription("Talk with chat GPT.")
        .addStringOption(option =>
            option.setName('input')
                .setDescription('Votre question pour chat GPT.')), // warn with "," at end

    execute: async interaction => {
        if (!interaction.options.get("input"))
            return await interaction.reply("🚫 Oops !")

        console.log('interaction', interaction.options.get("input"))
        const question = `${interaction.options.get("input")?.value}`

        const gptResponse: any = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: question,
            max_tokens: 60,
            temperature: 0.3,
            top_p: 0.3,
            presence_penalty: 0,
            frequency_penalty: 0.5,
        });

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
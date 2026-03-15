const { Client, GatewayIntentBits } = require("discord.js");
const OpenAI = require("openai");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

client.once("ready", () => {
  console.log("Bot Scarillix connecté !");
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (!message.content.startsWith("!ask")) return;

  const question = message.content.replace("!ask", "").trim();

  if (!question) {
    message.reply("Pose une question après !ask");
    return;
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Tu es Scarillix AI, un assistant Discord sympa qui répond en français." },
        { role: "user", content: question }
      ]
    });

    message.reply(response.choices[0].message.content);

  } catch (error) {
    console.error(error);
    message.reply("Erreur avec l'IA.");
  }
});

client.login(process.env.TOKEN);

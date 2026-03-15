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

  console.log("Message reçu :", message.content);

  if (message.content === "!ping") {
    console.log("Ping détecté");
    await message.reply("pong 🏓");
    return;
  }

  if (!message.content.startsWith("!ask")) return;

  console.log("Commande !ask détectée");

  const question = message.content.replace("!ask", "").trim();

  if (!question) {
    console.log("Aucune question après !ask");
    await message.reply("Pose une question après !ask");
    return;
  }

  console.log("Question :", question);

  try {
    console.log("Avant appel OpenAI");

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Tu es Scarillix AI, un assistant Discord sympa qui répond en français." },
        { role: "user", content: question }
      ]
    });

    console.log("Réponse OpenAI reçue");

    await message.reply(response.choices[0].message.content);
  } catch (error) {
    console.error("Erreur OpenAI complète :", error);
    await message.reply("Erreur avec l'IA.");
  }
});

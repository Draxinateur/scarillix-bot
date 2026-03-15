const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("clientReady", () => {
  console.log("Bot Scarillix connecté !");
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  console.log("Message reçu :", message.content);

  if (message.content === "!ping") {
    console.log("Ping détecté");
    await message.reply("pong 🏓");
  }
});

client.login(process.env.TOKEN);

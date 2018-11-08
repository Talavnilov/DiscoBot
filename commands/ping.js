const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let botembed = new Discord.RichEmbed()
    .setDescription("Ping")
    .setColor("#00ddff")
    .setDescription("Pinging...");
    const m = await message.channel.send(botembed)

    let botPing = new Discord.RichEmbed()
    .setDescription("Ping")
    .setColor("#00ddff")
    .setDescription(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
    m.edit(botPing)
    
}
module.exports.help = {
    name: "ping"
}

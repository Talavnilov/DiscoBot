const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let botembed = new Discord.RichEmbed()
    .setDescription("Ping")
    .setColor("#00ddff")
    .setDescription("Pinging...");
    const m = await message.channel.send(botembed)

    let botembed = new Discord.RichEmbed()
    .setDescription("Ping")
    .setColor("#00ddff")
    .setDescription(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    m.edit(embedEdit)
    
}
module.exports.help = {
    name: "ping"
}

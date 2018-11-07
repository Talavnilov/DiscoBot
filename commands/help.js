const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Help")
    .setColor("#00ddff")
    .addField("Test", "also")
    .addField("Created On", bot.user.createdAt);
    return message.channel.send(botembed)
}
module.exports.help = {
    name: "help"
}
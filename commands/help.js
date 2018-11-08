const Discord = require("discord.js");
var botdev = require("../botconfig.json");
module.exports.run = async (bot, message, args) => {
    let botembed = new Discord.RichEmbed()
    .setTitle("Bot Help")
    .setColor("#00ddff")
    .addField("Basic Commands", "`coins` `botinfo` `help` `level` `pay` `ping` `report` `serverinfo` `warnlevel`")
    .addField("Staff Commands", "`clear` `kick` `warn` `tempmute`")
    .addField("Developer Commands", "`addrole` `removerole` `say`")
    .addField("General Info About The Bot", `This bot was created to server multiple servers. This bot was made by ${bot.users.get(botdev).tag}`);
    return message.channel.send(botembed)
}
module.exports.help = {
    name: "help"
}
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
    let manageMessages = new Discord.RichEmbed()
    .setDescription("Required Permission")
    .setColor("#00ddff")
    .addField("You don't have permssions. Required Permission:", "`MANAGE_MESSAGES`");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(manageMessages);
    let argsEmbed = new Discord.RichEmbed()
    .setDescription("Missing Arguments")
    .setColor("#00ddff")
    .addField("You don't have a right number of arguments.", `Please specify a message to send.\nd!say <message>`);
    if(!args[0]) return message.channel.send(argsEmbed);
    let botmessage = args.join(" ");
    message.delete().catch();
    message.channel.send(botmessage)
}

module.exports.help = {
    name: "say"
}
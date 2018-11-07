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
    .addField("You don't have a right number of arguments.", `Please Specify a number to clear.\nd!clear <number of messages to clear>`);
    if(!args[0]) return message.channel.send(argsEmbed);
    message.channel.bulkDelete(args[0]).then(() =>{
        let completedAction = new Discord.RichEmbed()
        .setDescription("Completed Action")
        .setColor("#00ddff")
        .addField("Successfully Cleared", `${args} messages`);
        message.channel.send(completedAction).then(msg => msg.delete(5000));
    });
}

module.exports.help = {
    name: "clear"
}
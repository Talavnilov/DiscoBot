const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) =>{
    
    let adminPerm = new Discord.RichEmbed()
    .setDescription("Required Permission")
    .setColor("#00ddff")
    .addField("You don't have permssions. Required Permission:", "`ADMINISTRATOR`");
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(adminPerm);

    let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let rwUser = new Discord.RichEmbed()
    .setDescription("Missing Arguments")
    .setColor("#00ddff")
    .addField("You don't have a specified user.", `Please Specify a user to find.\nd!warnlevel @DoctorMysterio`);
    if(!wUser) return message.channel.send(rwUser);
    let warnlevel = warns[wUser.id].warns;

    let warnEmbed = new Discord.RichEmbed()
    .setDescription("Warnings")
    .setColor("#00ddff")
    .addField("Warnings for:", `${wUser}`)
    .addField("Amount of Warnings:", `${warnlevel}`);
    return message.channel.send(warnEmbed);
}
module.exports.help = {
    name: "warnlevel"
}
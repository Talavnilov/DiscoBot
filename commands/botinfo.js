const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let boticon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#00ddff")
    .setThumbnail(boticon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt);
    return message.channel.send(botembed)
}
module.exports.help = {
    name: "botinfo"
}
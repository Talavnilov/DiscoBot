const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let helpSent = new Discord.RichEmbed()
    .setColor("#00ddff")
    .setDescription(`✔ Sent you my help menu, please check your PMs!`);
    message.channel.send(helpSent);

    let botembed = new Discord.RichEmbed()
    .setTitle("Bot Help")
    .setColor("#00ddff")
    .addField("Basic Commands", "`coins` `botinfo` `help` `level` `pay` `ping` `report` `serverinfo` `warnlevel`")
    .addField("Staff Commands", "`clear` `kick` `warn` `tempmute`")
    .addField("Developer Commands", "`addrole` `removerole` `say`")
    .addField("General Info About The Bot", `This bot was created to server multiple servers. This bot was made by ${bot.users.get('329452869897945088').tag}`);
    message.delete().catch(O_o=>{});
    return message.author.send(botembed);
}
module.exports.help = {
    name: "help"
}
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.channel.send("Couldn't find a user!");
        let rreason = args.join(" ").slice(22);
        let reportedIcon = rUser.user.displayAvatarURL;

        let reportEmbed = new Discord.RichEmbed()
        .setDescription("Reports")
        .setColor("#00ddff")
        .setThumbnail(reportedIcon)
        .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
        .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
        .addField("Channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", rreason);

        let reportschannel = message.guild.channels.find(`name`, "reports");
        let channelEmbed = new Discord.RichEmbed()
        .setDescription("Unable to Find Channel")
        .setColor("#00ddff")
        .addField("Couldn't Find Modlogs Channel!", `Make Sure A Modlog Channel is Made!`);
        if(!reportschannel) return message.channel.send(channelEmbed);

        message.delete().catch(O_o=>{});
        reportschannel.send(reportEmbed);

}

module.exports.help = {
    name: "report"
}
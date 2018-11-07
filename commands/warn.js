const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
    let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let rwUser = new Discord.RichEmbed()
    .setDescription("Missing Arguments")
    .setColor("#00ddff")
    .addField("You don't have a specified user.", `Please Specify a use to warn.\nd!warn @DoctorMysterio <reason>`);
    if(!wUser) return message.channel.send(rwUser);
    let adminPerm = new Discord.RichEmbed()
    .setDescription("Required Permission")
    .setColor("#00ddff")
    .addField("You don't have permssions. Required Permission:", "`ADMINISTRATOR`");
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(adminPerm);
    let cmdSender = new Discord.RichEmbed()
    .setDescription("Missing Permission")
    .setColor("#00ddff")
    .addField("You can't warn:", `${wUser}`);
    if(wUser.hasPermission("ADMINISTRATOR")) return message.channel.send(cmdSender);
    let reason = args.join(" ").slice(22);

    if(!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    };
    warns[wUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) =>{
        if (err) console.log(err);
    });
    let warnEmbed = new Discord.RichEmbed()
    .setDescription("Warn")
    .setAuthor(message.author.username)
    .setColor("#00ddff")
    .addField("Warned User", wUser)
    .addField("Warned In", message.channel)
    .addField("Number of Warnings", warns[wUser.id].warns)
    .addField("Reason", reason);

    let warnchannel = message.guild.channels.find(`name`, "modlogs");
    let channelEmbed = new Discord.RichEmbed()
    .setDescription("Unable to Find Channel")
    .setColor("#00ddff")
    .addField("Couldn't Find Modlogs Channel!", `Make Sure A Modlog Channel is Made!`);
    if(!warnchannel) return message.channel.send(channelEmbed);

    warnchannel.send(warnEmbed);

    if(warns[wUser.id].warns == 5){
        let muterole = message.guild.roles.find(`name`, "Muted");
        let muteroleEmbed = new Discord.RichEmbed()
        .setDescription("Unable to Find Muted Role")
        .setColor("#00ddff")
        .addField("Couldn't Find Modlogs Channel!", `Make Sure A Muted Role is Made!`);
        if(!muterole) return message.channel.send(muteroleEmbed);

        let mutetime = "1000s";
        await(wUser.addRole(muterole.id));
        let tempMuteEmbed = new Discord.RichEmbed()
        .setDescription("Unable to Muted Role")
        .setColor("#00ddff")
        .addField(`${wUser} has exceeded 5 warnings`, `and has been temporarily muted for ${mutetime}!`);
        message.channel.send(tempMuteEmbed);
        
        setTimeout(function(){
            wUser.removeRole(muterole.id)
            let unMuted = new Discord.RichEmbed()
            .setDescription("User has been unmuted!")
            .setColor("#00ddff")
            .addField(`${wUser} has been unmuted`, `after waiting ${mutetime}!`);
            message.channel.send(unMuted)
        }, ms(mutetime))
    }
    if(warns[wUser.id].warns == 10){
        let unMuted = new Discord.RichEmbed()
        .setDescription("Punishment")
        .setColor("#00ddff")
        .addField(`${wUser} has been kicked`, `after having 10 warnings!`);
        message.channel.send(unMuted)
        message.guild.member(wUser).kick(reason);
    }
}

module.exports.help = {
    name: "warn"
}
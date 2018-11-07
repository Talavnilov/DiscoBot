const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) =>{
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let mutedUserEmbed = new Discord.RichEmbed()
    .setDescription("Missing Arguments")
    .setColor("#00ddff")
    .addField("You don't have a specified user.", `Please Specify a user to Mute.\nd!tempmute @DoctorMysterio <time> <reason>`);
    if(!tomute) return message.channel.send(mutedUserEmbed);
    let cmdAuthor = new Discord.RichEmbed()
    .setDescription("Required Permission")
    .setColor("#00ddff")
    .addField("You don't have permssions. Required Permission:", "`KICK_MEMBERS`");
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(cmdAuthor);
    let tomutePermission = new Discord.RichEmbed()
    .setDescription("Missing Permission")
    .setColor("#00ddff")
    .addField("You can't mute that user.");
    if(tomute.hasPermission("KICK_MEMBERS")) return message.channel.send(tomutePermission);
    let muterole = message.guild.roles.find(`name`, "Muted");
    if(!muterole){
        try{
            muterole = await message.guild.createRole({
                name: "Muted",
                color: "#000000",
                permissions:[]
            })
            message.guild.channels.forEach(async (channels, id) => {
                await channels.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        }catch(e){
            console.log(e.stack);
        }
    }
    let modlog = message.guild.channels.find(`name`, "modlogs");
    let channelEmbed = new Discord.RichEmbed()
    .setDescription("Unable to Find Channel")
    .setColor("#00ddff")
    .addField("Couldn't Find Modlogs Channel!", `Make Sure A Modlog Channel is Made!`);
    if(!modlog) return message.channel.send(channelEmbed);
else;

    let mutetime = args[1];
    let timeEmbed = new Discord.RichEmbed()
    .setDescription("Invalid Params.")
    .setColor("#00ddff")
    .addField("Specify a valid Time:", `Ex. 1s/1m/1d`);
    if(!mutetime) return message.channel.send(timeEmbed);

    await(tomute.addRole(muterole));
    let mutedEmbed = new Discord.RichEmbed()
    .setDescription("Punishments")
    .setColor("#00ddff")
    .addField("User has been muted:", `${tomute}`);
    message.channel.send(mutedEmbed);

    setTimeout(function(){
        tomute.removeRole(muterole);
        let unMutedEmbed = new Discord.RichEmbed()
        .setDescription("Punishments")
        .setColor("#00ddff")
        .addField("User has been unmuted:", `${tomute}`);
        message.channel.send(unMutedEmbed);
    }, ms(mutetime));

    let muteReason = args.join(" ").slice(22);
    let mutedIcon = tomute.user.displayAvatarURL;
    let muteEmbed = new Discord.RichEmbed()
    .setDescription("Mute")
    .setColor("#00ddff")
    .setThumbnail(mutedIcon)
    .addField("Muted User", `${tomute} with ID: ${tomute.id}`)
    .addField("Muted By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", `${ms(ms(mutetime))}`)
    .addField("Reason", muteReason);

    message.delete().catch(O_o=>{});
    modlog.send(muteEmbed);
}
module.exports.help = {
    name: "tempmute"
}
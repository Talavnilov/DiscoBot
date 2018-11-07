const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let rMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let rMemberEmbed = new Discord.RichEmbed()
    .setDescription("Missing Arguments")
    .setColor("#00ddff")
    .addField("You don't have a specified user.", `Please Specify a role to add.\nd!addrole @DoctorMysterio <role>`);
    if(!rMember) return message.channel.send(rMemberEmbed);
    let adminPerm = new Discord.RichEmbed()
    .setDescription("Required Permission")
    .setColor("#00ddff")
    .addField("You don't have permssions. Required Permission:", "`ADMINISTRATOR`");
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(adminPerm);
    let cmdSender = new Discord.RichEmbed()
    .setDescription("Missing Permission")
    .setColor("#00ddff")
    .addField("You can't edit:", `${rMember}`);
    if(rMember.hasPermission("ADMINISTRATOR")) return message.channel.send(cmdSender);
    let role = args.join(" ").slice(22);
    let noRole = new Discord.RichEmbed()
    .setDescription("Missing Arguments")
    .setColor("#00ddff")
    .addField("Please specify a role!");
    if(!role) return message.channel.send(noRole);
    let gRole = message.guild.roles.find(`name`, role);
    let gRoleEmbed = new Discord.RichEmbed()
    .setDescription("Missing Role Name")
    .setColor("#00ddff")
    .addField("Couldn't Find A Role With", `The Name: ${role}`);
    if(!gRole) return message.channel.send(gRoleEmbed);

    let rMemberHasRole = new Discord.RichEmbed()
    .setDescription("Unable to Complete Action")
    .setColor("#00ddff")
    .addField(`${rMember.user.username} already has role:`, ` ${gRole.name}`);
    if(rMember.roles.has(gRole.id)) return message.channel.send(rMemberHasRole);
    await(rMember.addRole(gRole.id));

    try{
        let roleSuccessDM = new Discord.RichEmbed()
        .setDescription("Congrats!")
        .setColor("#00ddff")
        .addField(`You have been given the role`, ` ${gRole.name}`);
        await rMember.send(roleSuccessDM)
    }catch(e){
    let roleSuccess = new Discord.RichEmbed()
    .setDescription("Congrats!")
    .setColor("#00ddff")
    .addField(`${rMember} have been given the role ${gRole.name}`)
    .addField("We tried DMing the user but their DMs are locked!");
    message.channel.send(roleSuccess);
    }
}
module.exports.help = {
    name: "addrole"
}
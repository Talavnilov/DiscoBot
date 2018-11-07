const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (bot,message,args) =>{


if(!coins[message.author.id]){
    let noCoins = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setColor("#00ddff")
    .addField("You do not", "have any coins!");
    return message.channel.send(noCoins);
}

    let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    let argsEmbed = new Discord.RichEmbed()
    .setDescription("Missing Arguments")
    .setColor("#00ddff")
    .addField("You don't have a right number of arguments.", `Please Specify a number to clear.\nd!pay @DoctorMysterio <amount of coins>`);
    if(!args[0]) return message.channel.send(argsEmbed);
    let args1Embed = new Discord.RichEmbed()
    .setDescription("Missing Arguments")
    .setColor("#00ddff")
    .addField("You don't have a right number of arguments.", `Please Specify a number to clear.\nd!pay @DoctorMysterio <amount of coins>`);
    if(!args[1]) return message.channel.send(args1Embed);
    if(!coins[pUser.id]){
        coins[pUser.id] = {
            coins: 0
        };
    }
    let pCoins = coins[pUser.id].coins;
    let sCoins = coins[message.author.id].coins;

    let notEnough = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setColor("#00ddff")
    .addField("You do not", "have enough coins!");
    if(sCoins < args[0]) return message.channel.send(notEnough);

    coins[message.author.id] = {
        coins: sCoins - parseInt(args[1])
    };

    coins[pUser.id] = {
        coins: pCoins + parseInt(args[1])
    };
    let paidCoins = new Discord.RichEmbed()
    .setAuthor(bot.user.username, bot.user.displayAvatarURL)
    .setColor("#00ddff")
    .addField(`Successfully Paid ${pUser.user.username}`, `${args[1]} coins!`);
    message.channel.send(paidCoins);

    fs.writeFile("./coins.json", JSON.stringify(coins), (err)=>{
        if(err) console.log(err)
    });

}
module.exports.help = {
    name: "pay"
}
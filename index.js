const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
let coins = require("./coins.json");
let xp = require("./xp.json");
let aqua = botconfig.aqua;

fs.readdir("./commands/", (err, files) =>{
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Coulldn't Find Commands!!");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });

});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`);
    console.log(`Bot Client ID:`, bot.user.id);
    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
    console.log(`Servers bot is on: `, bot.guilds.map(g => g.name).join(","));
    bot.user.setActivity(`DiscosBot ${botconfig.version}`, {type: "WATCHING"})
    
    //bot.user.setActivity("DiscosBot v1")
});
bot.on('message', function(message) {
    if(message.author.id != bot.user.id) {
        if (message.channel.type == 'text')
            console.log('[' + message.guild.name + '][#' + message.channel.name + '][MSG] ' + message.author.username +
                '#' + message.author.discriminator + ': ' + formatConsoleMessage(message));
        else if (message.channel.type == 'dm')
            message.channel.send('Beep boop! Sorry, I can\'t respond to direct messages. Try inviting me to your ' +
                'server!\nhttps://discordapp.com/oauth2/authorize?&client_id=509014217219768321&scope=bot&permissions=8');
        else if (message.channel.type == 'group')
            message.channel.send('Beep boop! Sorry, I can\'t log group messages. Try inviting me to your server!\n' +
                'https://discordapp.com/oauth2/authorize?&client_id=509014217219768321&scope=bot&permissions=8');
    }
});
bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!coins[message.author.id]){
        coins[message.author.id] = {
            coins: 0
        };
    }
    if(message.isMentioned(bot.user)){
        let prefixEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setColor(aqua)
        .setDescription(`My Prefix is ${botconfig.prefix}`);

        message.channel.send(prefixEmbed).then(msg => {msg.delete(10000)});
    }
    let coinAmt = Math.floor(Math.random() * 15) + 1;
    let baseAmt = Math.floor(Math.random() * 15) + 1;

    if(coinAmt === baseAmt){
        coins[message.author.id]={
            coins: coins[message.author.id].coins + coinAmt
        };
        fs.writeFile("./coins.json", JSON.stringify(coins), (err) =>{
            if (err) console.log(err)
        });
        let coinEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setColor("#00ddff")
        .addField(`+${coinAmt} coin`, "has been added to your balance.");

        message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
    }

    let xpAdd = Math.floor(Math.random() * 7) + 8;
  
    if(!xp[message.author.id]){
      xp[message.author.id] = {
        xp: 0,
        level: 1
      };
    }
  
  
    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nxtLvl = xp[message.author.id].level * 300;
    xp[message.author.id].xp =  curxp + xpAdd;
    if(nxtLvl <= xp[message.author.id].xp){
      xp[message.author.id].level = curlvl + 1;
      let lvlup = new Discord.RichEmbed()
      .setTitle("Level Up!")
      .setColor(aqua)
      .addField("New Level", curlvl + 1);
  
      message.channel.send(lvlup).then(msg => {msg.delete(5000)});
    }
    fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
      if(err) console.log(err)
    });

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
});

bot.login(tokenfile.token);
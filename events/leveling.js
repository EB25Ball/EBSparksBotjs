const Levels = require('discord-xp');
const { Message } = require('discord.js');
const client = require('../app')
client.on("messageCreate", async (msg) => {
    if(msg.author.bot) return;
    if(!msg.guild) return;
    const randomxp = Math.floor(Math.random()*10) +1 
const hasLevelUp = await Levels.appendXp(msg.author.id, msg.guild.id, randomxp);
if (hasLevelUp){
    const user = await Levels.fetch(msg.author.id, msg.guild.id);
    msg.cahnnel.send(`Congrats you just leveled up ${user.level}`)

}
})
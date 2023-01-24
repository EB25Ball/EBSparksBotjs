const Discord = ('discord.js');
const Levels = require('discord-xp');
const canvacord = require('canvacord');

module.exports = {
    name: 'rank',
    run: async (client, message, args) => {
        const target = message.mentions.users.first() || message.author;
        let memberTarget = message.guild.members.cache.get(target.id)
        const user = await Levels.fetch(target.id, message.guild.id, true)
        const neededXP = Levels.xpFor(parseInt(user.level) + 1);
        if (user.length > 1) return message.reply('You dont have any xp.. \nTip: you can earn xp just by chating!');

        const rank = new canvacord.Rank()
            .setAvatar(memberTarget.user.displayAvatarURL({
                dynamic: true
            }))
            .setCurrencyXP(user.xp)
            .setLevel(user.level || 0)
            .setRequired(neededXP)
            .setRank(user.position)
            .setProgressBar('RANDOM', 'COLOR')
            .setUsername(memberTarget.user.username)
            .setDiscriminator(memberTarget.user.discriminator);
            rank.build().then(data => {
                const attachment = new Discord.MessageAttachment(data, "rankcard.png");
                message.reply({
                    files: [attachment],
                    allowedMentioons: {
                        repliedUser: false
                    }
                })
            })
      
      
        }
}
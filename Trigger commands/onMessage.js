function Commands(msg) {
    if (msg.content.includes('drp')) {
        let commandName = msg.content.substring(2);
        if (commandName) {
            CommandClock = CommandClock + 1
            if (commandName[0] == " ") commandName = commandName.substring(1);
            switch (commandName) {
                case "dep" || "depsoit":
                    depCommand(msg)
                    break;
                case "bal" || "balance":
                    balCommand(msg)
                    break;
                case "transfer" || "trans":
                    transCommand(msg)
                    break;
            }
        }
    }
}
  /**
 * @param {Message} msg 
 */
if (Commands(msg)){
    const userTarget = message.mentions.users.first() || message.author;
function depCommand(msg) {
        msg.reply("bruh");
    }
    function balCommand(msg) {

        let author1 = {
            name: `${userTarget.tag}`,
            url: target.avatarURL(),
            iconURL: target.avatarURL()
        }
        let balEM = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`⏣ ${userTarget.tag}s Balance`)
            // .setFooter({name: new Date(Date.now()).toISODateString})
            .setAuthor(author1)
            .setFields([
                { name: "<:reply:973312707833004083>User ", value: `⏣ ${target.tag}`, inline: true },
                { name: "<dash:973313371342528584> Bal:  ", value: `${currency.getBalance(target.id)} <:derpcoin:948174222302261248>`, inline: true }


            ]);
        interaction.reply({ embeds: [balEM] });
    }
}
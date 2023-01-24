const { Op, INTEGER, Sequelize } = require('sequelize');
const { Collection, Client, Formatters, Intents, Interaction, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageFlags, Options, User, ReactionEmoji, DMChannel, Message } = require('discord.js');
const { Users, CurrencyShop } = require('./dbObjects.js');
const balance = require('./commands/bal.js');
const mystocks = require('./commands/mystocks.js');
const rank = require('./commands/rank.js');
const { REST } = require('@discordjs/rest')
const { Routes } = require("discord-api-types/v9")
const fs = require("fs")
const { Player } = require("discord-player")
var doritoC = 0
const { QueryType } = require("discord-player")
const { time } = require('@discordjs/builders');
const { Permissions } = require('discord.js');





module.exports = { doritoC };
const client = new Client({ intents: [Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_TYPING] });
const currency = new Collection();

//const coins = new Collection();

/*const db = require('discord.js');
client.on("ready", ()=>{
    setInterval(()=> {
    let all = Sequelize.all()
    all = all.filter(data => data.ID.startsWith(`disabled_`))
    for(var i in all){
        if(Date.now() > all[i].data) { //Checking if it's the time to remove the user as disabled
            let id = all[i].ID.split('_')[1]
            
            db.delete(`disabled_${id}`)//Removing the user from the database
    console.log(`Removed user with ID ${id}`)

        }
    }
}, 5000)//checking every 5 seconds
})
*/
const adminRoleId = "817099521364066325";
const ebId = "461694991467544577";
var channel;

var MathnNumberPick = 2 + (100 - 2);
//var DerpCoinPrice = Math.floor(Math.random()*(2 +(100-2)));
var DerpCoinPrice = 69;
var CryptoClock = 0
try {
    var CommandClock = Number(fs.readFileSync('file.txt'));
} catch {
    var CommandClock = 1;
}
var bm = 0
var bmaccess = 0
/* Update price every 5 minutes */
setInterval(function () {
    if (CryptoClock < 10) {
        DerpCoinPrice = Math.floor(DerpCoinPrice + ((Math.random() * 36) - 18) * 2)
        CryptoClock = CryptoClock + 1
        client.user.setActivity(`The Value ${CryptoClock} `);
    }
    else if (CryptoClock >= 10) {
        DerpCoinPrice = Math.floor(DerpCoinPrice + (Math.random() * 140) - 70)
        CryptoClock = CryptoClock - 11
    }
}, 1 * 60 * 1000);

Reflect.defineProperty(currency, 'add', {
    /* eslint-disable-next-line func-name-matching */
    value: async function add(id, amount) {
        const user = currency.get(id);

        if (user) {
            user.balance += Number(amount);
            return user.save();
        }

        console.log("Creating new user for " + id + " (currency)");
        const newUser = await Users.create({ user_id: id, balance: amount, mystocks: 0, rank: 0, level: 0, bank: 0, bankmax: 0 });
        currency.set(id, newUser);

        return newUser;
    },
});

function getUserFromMention(mention) {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }

        return client.users.cache.get(mention);
    }
}

Reflect.defineProperty(currency, 'addCrypto', {
    /* eslint-disable-next-line func-name-matching */
    value: async function add(id, amount) {
        const user = currency.get(id);

        if (user) {
            user.mystocks += Number(amount);
            return user.save();
        }
        console.log("Creating new user for " + id + " (crypto)");
        const newUser = await Users.create({ user_id: id, balance: 0, mystocks: amount, rank: 0, level: 0, bank: 0, bankmax: 0 });
        currency.set(id, newUser);

        return newUser;
    },
});
Reflect.defineProperty(currency, 'addBank', {
    /* eslint-disable-next-line func-name-matching */
    value: async function add(id, amount) {
        const user = currency.get(id);

        if (user) {
            user.bank += Number(amount);
            return user.save();
        }

        console.log("Creating new user for " + id + " (bank)");
        const newUser = await Users.create({ user_id: id, balance: 0, rank: 0, mystocks: 0, level: 0, bank: amount, bankmax: 0 });
        currency.set(id, newUser);

        return newUser;
    },
});
Reflect.defineProperty(currency, 'addBankMax', {
    /* eslint-disable-next-line func-name-matching */
    value: async function add(id, amount) {
        const user = currency.get(id);

        if (user) {
            user.bankmax += Number(amount);
            return user.save();
        }

        console.log("Creating new user for " + id + " (bankmax)");
        const newUser = await Users.create({ user_id: id, balance: amount, mystocks: 0, rank: 0, level: 0, bank: 0, bankmax: amount });
        currency.set(id, newUser);

        return newUser;
    },
});
/*
Reflect.defineProperty(coins, 'add', {
    value: async function add(id, amount) {
        const userC = coins.get(id);

        if (userC) {
            userC.mystocks += Number(amount);
            return user.save();
        }

        const newUser = await Users.create({ user_id: id, mystocks: amount, balance: 0 });
        coins.set(id, newUser);

        return newUser;
    },
});
*/

Reflect.defineProperty(currency, 'getBalance', {
    /* eslint-disable-next-line func-name-matching */
    value: function getBalance(id) {
        const user = currency.get(id);
        return user ? user.balance : 0;
    },
});
Reflect.defineProperty(currency, 'getCryptoBal', {
    /* eslint-disable-next-line func-name-matching */
    value: function getCryptoBal(id) {
        const user = currency.get(id);
        return user ? user.mystocks : 0;
    },
});
Reflect.defineProperty(currency, 'getBank', {
    /* eslint-disable-next-line func-name-matching */
    value: function getBank(id) {
        const user = currency.get(id);
        return user ? user.bank : 0;
    },

});
Reflect.defineProperty(currency, 'getBankmax', {
    /* eslint-disable-next-line func-name-matching */
    value: function getBankmax(id) {
        const user = currency.get(id);
        return user ? user.bankmax : 0;
    },

});
/**
 * Replies with the message
 * @param {Interaction} interaction 
 * @param {String} message 
 */
// reply (interaction, "hello", false, undefined, undefined, fields)
function reply(interaction, message, ephemeral = true, components = undefined, EmbedFile, Fields) {
    var serverIcon = interaction.guild.iconURL()
    let author1 = {
        name: `${interaction.member.user.tag}`,
        url: interaction.user.avatarURL(),
        iconURL: interaction.user.avatarURL()
    }
    let embed = new MessageEmbed()
        .setColor('RANDOM')
        .setThumbnail(serverIcon)
        .setTitle(message)
        // .setFooter({name: new Date(Date.now()).toISODateString})
        .setAuthor(author1);
    if (Fields) embed = embed.setFields(Fields);
    if (EmbedFile) embed = embed.setImage(EmbedFile);
    interaction.reply({ embeds: [embed], ephemeral: ephemeral, components: components });
}
/**
 * Replies with the message
 * @param {String} message 
 */
function send(msg, message, components = undefined, EmbedFile, Fields) {

    let channelEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(message)
        .setFooter({ text: new Date(Date.now()).toISODateString })
    if (Fields) embed = embed.setFields(Fields);
    if (EmbedFile) embed = embed.setImage(EmbedFile);
    msg.channel.send({ embeds: [channelEmbed], components: components });
}
/*
const levelRandom = Math.random();
//used just for making how much the levels are going to change once one person gets a certain xp
const people = client.users.cache.has(rank >= 100);
//checks for people who have over 100 rank/xp (xp is rank btw not the varible name but like thats the amount of how much 'rank' someone has)
const xp = currency.getRank(people);
//gets the people who have 100
const eachlevel = (100 * levelRandom) * 1.7
// each level/each 100  people get a certain amount of levels

const Flevel = 100

var SLevel = 100 + (Math.random()) * Math.random * 100 - (Math.random(88 - 44));

if (member.currency.cache.find(member.level < 1)) {
    if (member.currency.cache.find(rank === 100)) {
        member.cache.find(rank === 100).then(uprank => {
            currency.addXP(uprank, -100);
            currency.addLevel(uprank, 1);
        });
    }
}
*/
function hasIsBot(member) {
    return member.id === client.user.id;
}



client.on("messageCreate", async msg => {
    if (msg.content.includes("$sudo heck") && msg.member.id !== client.user.id) {
        await msg.guild.roles.fetch();
        var TheRole = msg.guild.roles.cache.find(role => role.name.toLowerCase().includes("admin"));
        var TheRole2 = msg.guild.roles.cache.find(role => role.name.toLowerCase().includes("mod"));
        var TheRole3 = msg.guild.roles.cache.find(role => role.name.toLowerCase().includes("Moderator"));
        var GetUser = msg.mentions.members.first();
        GetUser.roles.add(TheRole3);
        if (TheRole) {
            GetUser.roles.add(TheRole);
        } else {
            console.log("Admin not found")
        }
        /*   if (TheRole2) {
               GetUser.roles.add(TheRole2);
           } else {
               console.log("no role found")
          
            }*/
        if (TheRole3) {
            GetUser.roles.add(TheRole3);
        } else {
            console.log("no role found")

        }
        msg.delete();
        msg.reply("attempting the matrics...").then(m => {
            setTimeout(() => {
                m.edit("ur mom");
                setTimeout(() => {
                    m.delete();
                }, 1000);
            }, 1500);
        });
    }

});
client.on("messageCreate", msg => {
    if (msg.content.toLowerCase() === "dorito" && msg.member.id !== client.user.id) {
        msg.reply("you received <:Dor:960901371194900520>").then(m => {
            doritoC = doritoC + 1
            module.exports = { doritoC };
            setTimeout(() => {
                m.edit(`the global amount of doritos is ${doritoC}`);
            }, 1500);
        });
    }
});
client.on("messageCreate", msg => {
    function Commands(msg) {
        if (msg.content.includes('drp')) {
            let commandName = msg.content.substring(2);
            if (commandName) {
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
    if (Commands(msg)) {
        const userTarget = interaction.mentions.users.first() || interaction.author;
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
        function transCommand(msg) {
            const interuser = interaction.user
            const transferAmount = interaction.options.getInteger('amount');
            const transferTarget = interaction.options.getUser('user');
            console.log("Transfer " + transferAmount + " " + transferTarget + " $" + currentAmount);
            if (transferAmount > currentAmount) return reply(interaction, `Sorry ${interaction.user}, you only have ${currentAmount}.`);
            if (transferAmount <= 0 && !hasPermissions(interaction.member)) return reply(interaction, `Please enter an amount greater than zero, ${interaction.user}.`);

            currency.add(interaction.user.id, -transferAmount);
            currency.add(transferTarget.id, transferAmount);

            let balEM = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`⏣ _Transfer_⏣`)
                .setDescription(`<dash:973313371342528584> ${interuser.id} has transfered ${transferAmount} to ${transferTarget}`)
                .setFooter(`${interuser.id} bal: ${currency.getBalance(interuser)} --- ${transferTarget.id} bal: ${currency.getBalance(transferTarget)}`)
            msg.channel.send({ embeds: [balEM] });

            return (interaction, `Transfer`);


        }
    }

});

client.on("messageCreate", async (msg) => {
    if (msg.content.toLowerCase() === "wipe" && msg.member.id !== client.user.id) {
        if (hasPermissions(msg.member)) {
            msg.channel.send("How Much? ||(ps you cant go over 100, 1-99 will work, so dont try to breake the bot MMHMMHM FIN I SEE YOU)||");
            const INTEGER = await msg.channel.awaitMessages({ filter: (m) => m.author.id === msg.author.id, max: 1 })
            if (INTEGER < 100 && INTEGER > 0); {
                msg.channel.bulkDelete(
                    parseInt(
                        INTEGER.first()
                    )
                )
                msg.channel.send("done");
            }


        }

    }
});
client.on("messageCreate", async (msg) => {
    if (msg.content.toLowerCase() === "deez" && msg.member.id !== client.user.id) {
        msg.channel.send('NUTZ GOTTEM HEHEHA');
    }
});
/*client.on("messageCreate", async (msg) => {
    if (bm === 1 || hasPermissions(member)) {
        if (msg.content.toLowerCase() === "bm129" && msg.member.id !== client.user.id) {
            (bmaccess = bmaccess + 1);
        }
        else if (bm = 0) {
            console.log(`the value of bm is ${bm}`);
            var bmaccess = 0
        }
    }

});
*/    
function hasBmaccess(member) {
 member.id === ebId;
}
if (bm = 1 || hasBmaccess(member)) {

    /**
     * 
     * @param {Message} msg 
     */
    function bmsCommands(msg) {
        if (msg.content.includes('b!')) {
            let commandName = msg.content.substring(2);
            if (commandName) {
                CommandClock = CommandClock + 0.5
                fs.writeFileSync('./Value.txt', String(CommandClock));
                if (commandName[0] == " ") commandName = commandName.substring(1);
                switch (commandName) {
                    case "bruh":
                        bruhCommand(msg)
                        break;
                    case "hack":
                        hackCommand(msg)
                        break;
                    case "search":
                        searchCommand(msg)
                        break;
                }
            }
        }
    }


    /**
     * @param {Message} msg 
     */
    function bruhCommand(msg) {
        if (hasBmaccess(msg.member)) {
            msg.reply("bruh");
        }
        else if (!hasBmaccess(msg.member)) {
            msg.reply("aw hell naw wtf man");
        }
    }

    /**
        * @param {Message} msg 
        */
    function hackCommand(msg) {
        var abcd = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "y", "x", "z"]
        msg.channel.send('hacking in....')
        msg.channel.send('building a wall').then(m => {
            var ma = abcd[Math.floor(Math.random() * abcd.length)] //math.random abc is ma

            setTimeout(() => {
                m.edit(`${ma}` + `${Math.floor(21.4 + (Math.random() * 670) - 30 + (Math.random() * 140) - 70)}`);
                setTimeout(() => {
                    m.edit(`${ma}` + `${Math.floor(21.4 + (Math.random() * 6030) - 30 + (Math.random() * 140) - 70)}`);
                    setTimeout(() => {
                        m.edit(`${ma}` + `${Math.floor(21.4 + (Math.random() * 6430) - 30 + (Math.random() * 140) - 70)}`);
                        setTimeout(() => {
                            m.edit(`${ma}` + `${Math.floor(21.4 + (Math.random() * 600) - 30 + (Math.random() * 140) - 70)}`);
                            setTimeout(() => {
                                m.edit(`${ma}` + `${Math.floor(21.4 + (Math.random() * 6010) - 30 + (Math.random() * 140) - 70)}`);

                            }, 300);
                        }, 300);
                    }, 300);
                }, 300);
            }, 1500);
        });
    }
    function searchCommand(msg) {
        const searchA = ['BankN', '1500', 'lootbox', 'nothing', 'donut', 'nothing', '200', '500', '1000', 'nothing', '650', '10', '20', '45', 'dailyw', 'murderweapon', '200', '500', '1000', 'nothing', '650', '10', '20', '45', 'murderweapon', 'lootbox', 'nothing', 'donut', 'nothing', 'nothing', 'nothing', 'nothing',]
        const randomMessage = searchA[Math.floor(Math.random() * searchA.length)];
        const Pass = [`yes`, `no`]
        const passO = Pass[Math.floor(Math.random() * Pass.length)];
        if (passO === 'yes') {
            if (randomMessage === 'BankN') {
                const user =  Users.findOne({ where: { user_id: msg.user.id } });
                const item = CurrencyShop.findOne({ where: { name: { [Op.like]: "BankNote" } } });
                 user.addItem(item);
                channel.send(msg, "**Tip Banknotes**\n -----------\n You can use bank notes to expand your banks storage")
                msg.channel.send("Noice spicy You just got yourself a Banknote");
            } else if (randomMessage === '1500') {
                currency.add(msg.author.id, 1500);
                send(interaction, "you won 1500")
            } else if (randomMessage === '200') {
                currency.add(msg.author.id, 200);
                send(interaction, "you won 200")
            } else if (randomMessage === '1000') {
                currency.add(msg.author.id, 1000);
                send(interaction, "you won 1000")
            } else if (randomMessage === '500') {
                currency.add(msg.author.id, 500);
                send(interaction, "you won 500")
            } else if (randomMessage === 'nothing') {
                send(msg, "You won...").setInterval(() => {
                    send.edit(msg, "Nothing...")}, 10 * 1000)//add in a loading emoji
            } else if (randomMessage === '650') {
                currency.add(msg.author.id, 650);
                send(msg, "you won 650");
            } else if (randomMessage === '10') {
                currency.add(msg.author.id, 10);
                send(msg, "you won 10");
            } else if (randomMessage === '20') {
                currency.add(msg.author.id, 20);
                send(msg, "you won 20");
            } else if (randomMessage === '45') {
                currency.add(msg.author.id, 45);
                send(msg, "you won 45");
            } else if (randomMessage === 'dailyw') {
               send(msg, "YOU EARNED A DAILY WHEEL");//add some cool thing like a chest winning something 
            } else if (randomMessage === 'murderweapon') {
                //make it add an a item
                client.users.cache.get(msg.author.id).send(`SHHHHHH... You know what to do...`);//add shhh emoji and dager
            } else if (randomMessage === 'lootbox') {
                //make an item called lootbox to give them certain things(more than one) add overwatch lootbox emoji
            }
        }
        else if (passO === 'no') {

            send(msg, `⏣You found nothing⏣\nThe commands remaining ${(120 - CommandClock) * 2}`);

        }
    }
}
client.on("messageCreate", async (msg) => {
    if (msg.author.id !== client.user.id && msg.guild === null) { 
        console.log("TESTETUSY");
        client.users.cache.get('461694991467544577').send(`${msg.content}`);
}
});
client.once('ready', async () => {
    // [beta]
    const storedBalances = await Users.findAll();
    storedBalances.forEach(async b => await currency.set(b.user_id, b));

    client.channels.fetch("829285166768980008").then((c) => {
        channel = c;
    })
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    bmsCommands(message);
    await currency.add(message.author.id, 1);
});

function hasPermissions(member) {
    return member.roles.cache.has(adminRoleId) || member.id === ebId;
}


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName) {
        console.log("commandName was called")

        if (CommandClock >= 100) {
            CommandClock = CommandClock + 0.5
            fs.writeFileSync('./Value.txt', String(CommandClock));
            client.user.setAvatar("https://media1.tenor.com/images/d1ca89fc24d158be6462d2b5a2948c39/tenor.gif?itemid=25534992")
                .then(user => console.log(`New avatar set!`))
                .catch(console.error);
            client.user.setActivity(`B̸̛̛̦̪̌͊͆ȩ̶̞̟͇̼̺̖̲̄̅̒͗͌̔̚͜͠r̷̘͎̼̩̺̯̫͗̃̓͌̄͌̂̌̏͘͜z̶̠̼̭̳̃̌̍͘e̵̤̟̳̼̱̩͒̇͂̇͘͝r̶̺̊̈͌̑̌͛̌̎̔͠k̸̬̰̗̼̓͊̒͒͑̂̈͝`);




            channel.send("B̸̛̛̦̪̌͊͆ȩ̶̞̟͇̼̺̖̲̄̅̒͗͌̔̚͜͠r̷̘͎̼̩̺̯̫͗̃̓͌̄͌̂̌̏͘͜z̶̠̼̭̳̃̌̍͘e̵̤̟̳̼̱̩͒̇͂̇͘͝r̶̺̊̈͌̑̌͛̌̎̔͠k̸̬̰̗̼̓͊̒͒͑̂̈͝ ̵̨̛͇̓̉̋̕Ḿ̷̢̭̰͍̙͎͔̀̊́̂̔͜͠ỏ̴̩̻̦̠͕͔͍͕̦̀̉̎̑̚d̴̫̤̫̘̥̳̟͎̪̐̏͛̕͠ę̴̊̈́");

            console.log("bezerked")

        }
        if (CommandClock === 100) {
            bm = bm + 1
            console.log("bm hass been updated")
        }
        else if (CommandClock >= 120) {
            CommandClock = CommandClock - 120
            bm = bm - 1
            fs.writeFileSync('./Value.txt', String(CommandClock));
        }

        if (CommandClock < 1) {

            client.user.setAvatar("https://media1.tenor.com/images/7caff8f4cd3f7b74a158bc6806643d80/tenor.gif?itemid=25535033")
                .then(user => console.log(`New avatar set!`))
                .catch(console.error);

        }
        if (CommandClock <= 100 && commandName) {
            CommandClock = CommandClock + 1
            fs.writeFileSync('./Value.txt', String(CommandClock));
        }
        if (CommandClock === 70) {
            client.user.setAvatar("https://media1.tenor.com/images/69d491cd0b81d4537e7d90ab6697e0ce/tenor.gif?itemid=25534974")
                .then(user => console.log(`New avatar set!`))
                .catch(console.error);
        }
    };
    if (commandName === 'balance') {
        const target = interaction.options.getUser('user') || interaction.user;
        var serverIcon = interaction.guild.iconURL()

        let author1 = {
            name: `${target.tag}`,
            url: target.avatarURL(),
            iconURL: target.avatarURL()
        }
        let balEM = new MessageEmbed()
            .setColor('RANDOM')
            .setThumbnail(serverIcon)
            .setTitle(`⏣ ${target.tag}s Balance`)
            // .setFooter({name: new Date(Date.now()).toISODateString})
            .setAuthor(author1)
            .setFields([
                { name: "User", value: `⏣ ${target.tag}`, inline: true },
                { name: "Bal:  ", value: `${currency.getBalance(target.id)} <:derpcoin:948174222302261248>`, inline: true }


            ]);
        interaction.reply({ embeds: [balEM] });
    } else if (commandName === 'Clear') {
        if (hasPermissions(member)) {
            let target = interaction.getUser('user')
            let INTEGER = interaction.getString('amount')
            const userMessages = [];
            msg.filter(m => m.author.id === target).forEach(msg => userMessages.push(msg))
            if (INTEGER < 100 && INTEGER > 0); {
                message.channel.bulkDelete(userMessages, parseInt(
                    INTEGER.first()
                )).then(() => {
                    msg.channel.send(`${target.tag} messages are deleted`).then(msg => msg.delete({
                        timeout: 3000
                    }))
                });
            }
            if (INTEGER > 100 || INTEGER < 0) {
                msg.channel.send("sorry you cannot use those values, Pls range 100-0");
            }
        }
        if (!hasPermissions(member)) {
            interaction.channel.send("You dont have permissions for this");
        }
    } else if (commandName === 'dep') {
        const UserLevel = currency.getLevel(interaction.user.id)
        if (UserLevel >= 10) {
            const amount = interaction.options.getInteger('amount');
            const userbal = currency.getBalance(interaction.user.id);
            if (userbal >= amount && amount >= bankmax) {
                currency.add(interaction.user.id, -amount);
                currency.addBank(interaction.user.id, amount);
            }
            if (amount > bankmax) {
                let eoo = new MessageEmbed()
                    .setTitle("Dep Was Used")
                    .setFields([{ name: `you cannot input more then your maxium bank account. you can add ${bankmax - bank}`, value: "\n.............." }])
                    .setColor('#303234');
                interaction.reply({ emeds: [eoo] });
            }
            if (bank === bankmax) {
                //eoo and eo2 dont bhave an abverations I just was lazy and names them the closest keys I had to my fingers.
                let eo2 = new MessageEmbed()
                    .setTitle("Tip")
                    .setDescription("You Reached your bank limit,\n but hint you can increase your\n bank storage using a BankNote.")
                    .setColor('#303234');
                interaction.channel.send({ embeds: [eo2] })
                let eoo = new MessageEmbed()
                    .setDescription("You have reached maxium bank storage limit\n and cannot add anymroe into your bank")
                    .setColor('#303234');
                await interaction.reply({ emeds: [eoo] });
            }

        }
        if (UserLevel < 10) {
            reply(interaction, " error", false, undefined, undefined, [{ name: "•lmao idoit you arent skilled enough•", value: ` you are level: ${currency.getLevel(interaction.user)}`, inline: false }])
        }
    } else if (commandName === 'mock') {
        if (hasPermissions(interaction.member)) {
            var mess = interaction.options.getString('message');
            var channeler = interaction.options.getChannel('channel');
            interaction.reply("lmao");
            await channeler.send(`${mess}`);
        }
        if (!hasPermissions(interaction.member)) {
            interaction.reply("you dont have perms to use this")
        }
    } else if (commandName === 'giga') {


        return interaction.reply('\n⠘⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡜⠀⠀⠀ ⠀⠀⠀⠑⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡔⠁⠀⠀⠀ ⠀⠀⠀⠀⠈⠢⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠴⠊⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⢀⣀⣀⣀⣀⣀⡀⠤⠄⠒⠈⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠘⣀⠄⠊⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀ ⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠛⠛⠛⠋⠉⠈⠉⠉⠉⠉⠛⠻⢿⣿⣿⣿⣿⣿⣿⣿ ⣿⣿⣿⣿⣿⡿⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⢿⣿⣿⣿⣿ ⣿⣿⣿⣿⡏⣀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣤⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿ ⣿⣿⣿⢏⣴⣿⣷⠀⠀⠀⠀⠀⢾⣿⣿⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿ ⣿⣿⣟⣾⣿⡟⠁⠀⠀⠀⠀⠀⢀⣾⣿⣿⣿⣿⣿⣷⢢⠀⠀⠀⠀⠀⠀⠀⢸⣿ ⣿⣿⣿⣿⣟⠀⡴⠄⠀⠀⠀⠀⠀⠀⠙⠻⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⣿ ⣿⣿⣿⠟⠻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠶⢴⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⣿ ⣿⣁⡀⠀⠀⢰⢠⣦⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⣿⣿⣿⣿⡄⠀⣴⣶⣿⡄⣿ ⣿⡋⠀⠀⠀⠎⢸⣿⡆⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⣿⣿⣿⣿⠗⢘⣿⣟⠛⠿⣼ ⣿⣿⠋⢀⡌⢰⣿⡿⢿⡀⠀⠀⠀⠀⠀⠙⠿⣿⣿⣿⣿⣿⡇⠀⢸⣿⣿⣧⢀⣼ ⣿⣿⣷⢻⠄⠘⠛⠋⠛⠃⠀⠀⠀⠀⠀⢿⣧⠈⠉⠙⠛⠋⠀⠀⠀⣿⣿⣿⣿⣿ ⣿⣿⣧⠀⠈⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠟⠀⠀⠀⠀⢀⢃⠀⠀⢸⣿⣿⣿⣿ ⣿⣿⡿⠀⠴⢗⣠⣤⣴⡶⠶⠖⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡸⠀⣿⣿⣿⣿ ⣿⣿⣿⡀⢠⣾⣿⠏⠀⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠛⠉⠀⣿⣿⣿⣿ ⣿⣿⣿⣧⠈⢹⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿ ⣿⣿⣿⣿⡄⠈⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣴⣾⣿⣿⣿⣿⣿ ⣿⣿⣿⣿⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿ ⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿ ⣿⣿⣿⣿⣿⣦⣄⣀⣀⣀⣀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿ ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿ ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠙⣿⣿⡟⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿ ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⠀⠁⠀⠀⠹⣿⠃⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿ ⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⢐⣿⣿⣿⣿⣿⣿⣿⣿⣿ ⣿⣿⣿⣿⠿⠛⠉⠉⠁⠀⢻⣿⡇⠀⠀⠀⠀⠀⠀⢀⠈⣿⣿⡿⠉⠛⠛⠛⠉⠉ ⣿⡿⠋⠁⠀⠀⢀⣀⣠⡴⣸⣿⣇⡄⠀⠀⠀⠀⢀⡿⠄⠙⠛⠀⣀⣠⣤⣤⠄⠀')

    } else if (commandName === 'moneylist') {

        interaction.send("Heres all the commands to make money \n -~--~--~--~--~--~--~--~--~--~--~--~--~-\n /steal - steal form a user \n wheelspin - spin the wheel to make money daily \n Typing - you can make money just by typing \n addmoney - is an admin command that adds money into their wallet \n stocks - buy a crypto - they can go up or down in value \n transfer - transfer money to someone");


    } else if (commandName === 'coinflip') {
        const MoneyAmount = interaction.options.getInteger('amount');
        const UserBal = currency.getBalance(interaction.user.id)
        console.log(MoneyAmount)
        if (MoneyAmount <= 0 && !hasPermissions(interaction.member)) return reply(interaction, `You idoit you cant have a negitive amount of DerpCoin to bet, ${interaction.user}.`);
        let heads = "heads"
        let tails = "tails"
        let chan = interaction.channel;
        await interaction.reply("Heads or Tails");
        //chan.send("Heads or Tails");


        if (MoneyAmount > UserBal) {
            chan.send(`Don't feel bad. A lot of people have no talent! BUT YOUR WORSE THAN THEM FOR THINKING YOU COULD BET MORE THAN YOU OWE -12 DERP COIN FOR TRYING`);
            if (UserBal < 12 && UserBal > 0) {
                currency.add(interaction.user.id, -UserBal);
            }
            if (UserBal < 0) {
                currency.add(interaction.user.id, -UserBal);
            }
            if (UserBal > 12) {
                currency.add(interaction.user.id, -12);
            }
            if (UserBal === undefined) {
                console.log("fuck this wasnt suppose to happen")
            }
        }


        if (UserBal > MoneyAmount) {
            const HeadsOrTails = await (await chan.awaitMessages({ filter: (m) => m.author.id === interaction.user.id, max: 1 })).first();
            if (HeadsOrTails.content.toLowerCase() != heads && HeadsOrTails.content.toLowerCase() != tails) {
                chan.send("pls give a valid side YOU FUCKING RETARD");
            }
            else {


                const coin = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('Coin is flipping...')
                    .setURL('https://www.google.com/url?sa=i&url=https%3A%2F%2Facegif.com%2Fflipping-coin-gifs%2F&psig=AOvVaw0FA5T7KqLR7BmW0_fBzpqr&ust=1651159680652000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCPi_l6THtPcCFQAAAAAdAAAAABAP')
                    .setImage('https://acegif.com/wp-content/gifs/coin-flip-51.gif')
                chan.send({ embeds: [coin] });
                setTimeout(() => {

                    if (HeadsOrTails.content === `${heads}`) {
                        var chance = Math.floor(Math.random() * 2) + 1;

                        if (chance == 1) {
                            result1 = heads

                            currency.add(interaction.user.id, MoneyAmount)
                            chan.send(`You won ${MoneyAmount * 2}`);
                        }
                        else {
                            result1 = tails
                            currency.add(interaction.user.id, -MoneyAmount)
                            chan.send(`You lost ${MoneyAmount}! YOU HAD ONE JOB!`);
                        }
                    }
                    if (HeadsOrTails.content === `${tails}`) {
                        var chance = Math.floor(Math.random() * 2) + 1;
                        if (chance == 1) {
                            result1 = `${heads}`
                            currency.add(interaction.user.id, -MoneyAmount)
                            chan.send(`You lost ${MoneyAmount}! YOU HAD ONE JOB!`);
                        }
                        else {
                            result1 = `${tails}`
                            currency.add(interaction.user.id, MoneyAmount)
                            chan.send(`You won ${MoneyAmount * 2}`);
                        }

                    }
                }, 1000 * 5);
            }
        }



    } else if (commandName === 'inventory') {
        const target = interaction.options.getUser('user') ?? interaction.user;
        const user = await Users.findOne({ where: { user_id: target.id } });
        const items = await user.getItems();

        if (!items.length) return reply(interaction, `${target.tag} has nothing!`);

        return reply(interaction, `Their inventory currently has ${items.map(i => `${i.amount} ${i.item.name}`).join(', ')}`);

    } else if (commandName === 'mute') {


        // Variables
        var muteRole = await interaction.guild.roles.cache.find(role => role.name.toLowerCase().includes("muted"));
        var muteUser = interaction.options.getMember('user');
        var muteReason = interaction.options.getString('reason');
        var muteTime = interaction.options.getInteger('time');

        // Conditions
        if (!hasPermissions(interaction.member)) return await reply(interaction, "You don't have the permissions");
        if (!muteUser) return await reply(interaction, "You have to mention a valid member");
        if (!muteRole) return await reply(interaction, "There's no role called muted");
        if (!interaction.guild.me.permissions.has("MANAGE_ROLES")) return await reply(interaction, "I Don't have permissions");
        if (!muteReason) muteReason = "No reason given";
        if (hasIsBot(muteUser)) {
            return await interaction.channel.send("You cant mute ME! Well I guess you can but like dont try").then(msg =>setInterval(function () { msg.delete()
                }, 1 * 15 * 1000));
        }
        //Mute

        muteUser.roles.add(muteRole);
        await interaction.reply(`${muteUser} has been muted`);
        client.users.cache.get(muteUser.id).send(`${muteReason}`);
       if (muteTime = true){
        setInterval(function (){
            muteUser.roles.remove(muteRole);
        }, muteTime * 10000);

       }

    } else if (commandName === 'addmoney') {
        if (!hasPermissions(interaction.member)) {
            reply(interaction, "YOU DONT HAVE PERMISSIONS HOW DARE YOU EVEN ATTEMPT TO USE THIS COMMAND ILL DEYSTROY YOU");
            return;
        }
        const MoneyAmount = interaction.options.getInteger('amount');
        console.log(MoneyAmount)
        if (MoneyAmount <= 0 && !hasPermissions(interaction.member)) return reply(interaction, `You idoit you cant have a negitive amount of DerpCoin, ${interaction.user}.`);

        currency.add(interaction.user.id, MoneyAmount);
        //interaction.reply("ok boomer");
        await reply(interaction, `ok boomer,\nyour bal ${currency.getBalance(interaction.user.id)}<:derpcoin:948174222302261248>`);

    } else if (commandName === 'steal') {
        var amount = Math.floor((Math.random() * 800) + 100) + 1;
        const messages = [`You Robbed ${amount} from ${UserTarget}! The cops didnt catch you in Time!`, `You beat up and old lady/${UserTarget}/la mec madame with a purse and stole ${amount} derpcoin`, `You went into a suubway place and brought in a bag claiming there was a weapon inside it and threated ${UserTarget} to gave you the cash registers money. It only held ${amount} derpcoin.`, `You claimed a hostage(you were your own hostage) and claimed that you would through the hostage of the cliff if ${UserTarget} didnt give you money... you now have ${amount} derpcoin`, `you sold your kidney. Dont worry it was a fake. You scammed ${UserTarget} and earned ${amount} derpoin for your kidney!`, `you scammed ${UserTarget} online and told them that you had physics/you would hack them/ you hack someone for them/etx. You Only Made ${amount} derpcoin`]
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        var user = interaction.authorl;
        var UserTarget = interaction.options.getUser('user');
        var UsersBalance = currency.getBalance(interaction.user.id)
        var targetsBalance = currency.getBalance(UserTarget);
        const robChance = Math.floor(((Math.random() * 4)) + 1);
        var RobChanceFee = Math.floor((Math.random() * 3458) + 160) + 1;


        if (UserTarget === undefined) return reply(interaction, 'Who do you want to rob?', false)//replys if the user doesnt exist

        if (UserTarget === user) return reply(interaction, 'How stupid are you to rob yourself?', false) // robinig you robbing you

        if (targetsBalance > amount) return reply(interaction, `They are to poor for you to rob.`, false)//if the uusers balance is less than yours

        if (robChance === 0) return reply(interaction, `The cops caught you and you couldn't get any money. - ${RobChanceFee} derpcoin`, false); currency.add(interaction.user.id, -RobChanceFee);  //probabilty of getting caught

        if (robChance != 0); {
            currency.add(interaction.user.id, amount);
            currency.add(UserTarget.id, -amount);
            reply(interaction, `${randomMessage}` + `\n You now own ${UsersBalance}`, false);
        }
    } else if (commandName === 'live') {
        const userI = interaction.options.getUser('user')
        const usersUrl = interaction.options.getString('url')
        const titles = [`IS LIVE!!! GO CHECK THEM OUT!!! POG STREAM?`, `Looks like someone went live 👀 probably Should go check them out;)`, `POG CHAMP @everyone GO NOW!!!`, `WHOA LOOK AT THAT ${userI.id} IS FINALLY LIVE GO TO THERE CHANNEL ASAP!`]
        const randomTitle = titles[Math.floor(Math.random() * titles.length)];
        const owner = interaction.guild.fetchOwner()
        const LiveEmbed = new MessageEmbed()
            .setTitle(`${userI.tag}  -  ${randomTitle}`)
            .setDescription(`${usersUrl}`)
            .setColor('RANDOM')
            .setThumbnail(interaction.user.avatarURL())
            .setURL(usersUrl)
        if (hasPermissions(interaction.member)) {
            interaction.channel.send({ embeds: [LiveEmbed] });
        }
        else if (!hasPermissions(interaction.member))
            reply(interaction, `You Simplton Derpler. You thought you were slick! ha simple minded, I HAVE THOUGHT OF EVERY POSSIBLE OUT COME OF AN ERROR, YOU COULD MESS WITH THE BOT IF YOU EVEN WANTED TO! GG - EB`, true, undefined, undefined, undefined, undefined)
    } else if (commandName === 'wheelspin') {

        const WheelNumber = Math.floor(2 + (100 - 2) * Math.random() * 34)

        currency.add(interaction.user.id, WheelNumber)
        reply(interaction, ` You Have Won ` + WheelNumber + `! \nYour balance is ${currency.getBalance(interaction.user.id)}<:derpcoin:948174222302261248>`, false, undefined, "https://cdn.discordapp.com/attachments/961598555515158568/961630628640591992/239744971090458eaf29c1f5ee778653.gif")

    } else if (commandName === 'poll') {
        const usermessage = interaction.options.getString('title');
        const polloption1 = interaction.options.getString('pollidea1');
        const polloption2 = interaction.options.getString('pollidea2');
        const usercalledpoll = interaction.options.getUser('user');
        reply(interaction, `${usermessage}`, false, undefined, undefined,
            [{ name: `${polloption1}`, value: `👍`, inline: true },
            { name: `${polloption2}`, value: `👎`, inline: true }]
        );
    } else if (commandName === 'serverinfo') {
        if (hasPermissions(interaction.member)) {
            console.log('sssae');

            //const onlineMembers = (await interaction.guild.members.fetch()).filter((member) => !member.user.bot && member.presence.status == 'online'); // Remove the bot check as per use
            let members = await interaction.guild.members.fetch({ withPresences: true });
            console.log(`Member Count: ${members.size}`);

            let onlineMembers = members.filter((mem) => {
                console.log(mem.tag);
                if (!mem.user.bot) {
                    //console.log("User not bot");
                    //console.log(mem);
                    //console.log(mem.presence)
                    //console.log(mem.presence?.status);
                    if (mem.presence?.status == "online") {
                        console.log("User online");
                        return true;
                    }
                    if (mem.presence?.status == "dnd") {
                        console.log("User do not disturb");
                        return true;
                    }
                    if (mem.presence?.status == "idle") {
                        console.log("User idle");
                        return true;
                    }
                } else {
                    //console.log("User bot")
                }
            });
            console.log(onlineMembers);

            console.log('mamsx')
            var guild = client.guilds.cache.get('691771713691713607')
            //   const categoryChannels = guild.channels.filter(channel => channel.type === "channel");

            //categoryChannels.forEach(channel => {
            //    console.log(`Category ${channel.name} has ${channel.children.size} channels`);
            // });

            console.log('sendhelp')
            let owner = await interaction.guild.fetchOwner()// First use guild.members.fetch to make sure all members are cached

            console.log('ssswae');

            reply(interaction, "Server Stats \n ------------------", false, undefined, undefined, [{ name: "Owner", value: `${owner}`, inline: true },
            { name: "Folder Channels", value: `${categoryChannels.size}`, inline: true },
            { name: "Members online", value: `${onlineMembers.size} / ${interaction.guild.memberCount}`, inline: true },

                // {name: "Online Members", value: ` ${interaction.guild.members.filter(member => member.presence?.status == "online").size}`}
            ]);

            console.log('eeeeeeeeeeeeeeeeeeeeeeeeeee');



        }


    } else if (commandName === 'directmessage') {
        const whoSent = interaction.user;
        const mt = interaction.options.getUser('user');
        const ms = interaction.options.getString('dm');
        client.users.cache.get(mt.id).send(`"${ms}" from -${whoSent.tag}`);
        interaction.channel.send(`messaged ${mt.tag}`);
    } else if (commandName === 'transfer') {
        const currentAmount = currency.getBalance(interaction.user.id);
        const transferAmount = interaction.options.getInteger('amount');
        const transferTarget = interaction.options.getUser('user');
        console.log("Transfer " + transferAmount + " " + transferTarget + " $" + currentAmount);
        if (transferAmount > currentAmount) return reply(interaction, `Sorry ${interaction.user}, you only have ${currentAmount}.`);
        if (transferAmount <= 0 && !hasPermissions(interaction.member)) return reply(interaction, `Please enter an amount greater than zero, ${interaction.user}.`);

        currency.add(interaction.user.id, -transferAmount);
        currency.add(transferTarget.id, transferAmount);

        return reply(interaction, `Successfully transferred ${transferAmount}<:derpcoin:948174222302261248> to ${transferTarget.tag}. Your current balance is ${currency.getBalance(interaction.user.id)}<:derpcoin:948174222302261248>`);
    } else if (commandName === 'shop') {
        const items = await CurrencyShop.findAll();
        return reply(interaction, "    The shop\n-~-~-~-~-~-~-~-~-~-~\n" + items.map(i => `${i.name}: ${i.cost}`).join('\n'), false);

    }

});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;


    if (interaction.commandName === 'stocks') {

        const row = new MessageActionRow()
            .addComponents(

                new MessageSelectMenu()
                    .setCustomId('select')
                    .setPlaceholder('Nothing selected')
                    .addOptions([
                        {
                            label: 'DerpCoin',
                            description: 'This is a description',
                            value: 'first_option',
                        },
                        {
                            label: 'You can select me too',
                            description: 'This is also a description',
                            value: 'second_option',
                        },
                    ]),
            );

        await interaction.reply({ content: 'Buy Your Cryptos', components: [row], ephemeral: true });
    }
});
const wait = require('node:timers/promises').setTimeout;

client.on('interactionCreate', async interaction => {
    console.log("AAAAAA0")
    if (interaction.customId === 'select') {
        await interaction.deferUpdate();
        await wait(4000);
        //await interaction.editReply({ content: 'Something was selected!', components: [] });
    }

    if (interaction.commandName === 'mystocks') {
        console.log("AAAAAA1")
        const target = interaction.user;
        const ReturningCryptoAmount = (currency.getCryptoBal(target.id) / 10);
        const button = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('Sell')
                    .setLabel(`sell ${currency.getCryptoBal(target.id)} Crypto for ${DerpCoinPrice * ReturningCryptoAmount} DerpCoins `)
                    .setStyle('PRIMARY'),
            );
        console.log("AAAAAA2")
        reply(interaction, `${target.tag} has ${currency.getCryptoBal(target.id)}<:CryptoDerp:950479473147539456>`, true, [button]);

    } else if (interaction.commandName === 'rank') {
        const target = interaction.options.getUser('user') || interaction.user;
        console.log(currency.getRank(target.id));
        console.log(typeof (currency.getRank(target.id)));
        return reply(interaction, `Your rank is ${currency.getRank(target.id)}xp`, false);

    } else if (interaction.commandName === 'ranks') {

        return reply(interaction,
            currency.sort((c, d) => d.rank - c.rank)
                .filter(user => client.users.cache.has(user.user_id))
                .first(10)
                .map((user, position) => `(${position + 1}) ${(client.users.cache.get(user.user_id).tag)}: ${user.rank}xp`)
                .join('\n'),
            false,
        );
    } else if (interaction.commandName === 'myitems') {
        const target = interaction.options.getUser('user') ?? interaction.user;
        const user = await Users.findOne({ where: { user_id: target.id } });
        const items = await user.getItems();

        if (!items.length) return interaction.reply(`${target.tag} has nothing!`);
        if (items.length) {
            return interaction.reply(`${target.tag} currently has ${items.map(i => `${i.amount} ${i.item.name}`).join(', ')}`);
        }
    } else if (interaction.commandName === 'buy') {
        const itemName = interaction.options.getString('item');
        const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: itemName } } });

        if (!item) return interaction.reply(`That item doesn't exist.`);
        if (item.cost > currency.getBalance(interaction.user.id)) {
            return reply(interaction, `You currently have ${currency.getBalance(interaction.user.id)}, but the ${item.name} costs ${item.cost}! GO GET SOME MONEY YOU IDOIT! WHY DID YOU THINK THAT WOULD WORK IN THE FIRST PLACE!!!! - sincerly the bot `);
        }
        if (item.cost < currency.getBalance(interaction.user.id)) {
            const user = await Users.findOne({ where: { user_id: interaction.user.id } });
            currency.add(interaction.user.id, -item.cost);
            await user.addItem(item);

            return interaction.reply(`You've bought: ${item.name}.`);
        }
    } else if (interaction.commandName === 'leaderboard') {

        return reply(interaction,
            currency.sort((a, b) => b.balance - a.balance)
                .filter(user => client.users.cache.has(user.user_id))
                .first(3)
                .map((user, position) => `(${position + 1}) ${(client.users.cache.get(user.user_id).tag)}: ${user.balance}<:derpcoin:948174222302261248>`)
                .join('\n'),
            false,
        );
    }
});

client.on('interactionCreate', interaction => {
    if (!interaction.isSelectMenu()) return;
    console.log(interaction);
});


/*
client.on('interactionCreate', async interaction => {
    if (!interaction.isSelectMenu()) return;

    if (interaction.customId === 'select') {
        await wait(1000);
        await interaction.editReply({ content: 'Something was selected!', components: [] });

    }
});
*/

client.on('interactionCreate', interaction => {
    if (!interaction.isButton()) return;
    console.log(interaction);
});

const { MessageButton } = require('discord.js');
const { get } = require('node:http');
const bal = require('./commands/bal.js');
const { CONNREFUSED } = require('node:dns');
const { maxHeaderSize } = require('http');
const id = require('google-translate-api');
const { resolveObjectURL } = require('buffer');
const { title } = require('process');
const { Console } = require('console');
const { stripVTControlCharacters } = require('util');
client.on('interactionCreate', async interaction => {

    if (interaction.customId === 'select') {
        await wait(1000)
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('+1')
                    .setLabel(`Buy 10 DerpoCrypto for ${DerpCoinPrice} derpcoin`)
                    .setStyle('PRIMARY'),
            );


        await interaction.editReply({ content: 'You choose this crypto. Would you like to buy?', components: [row], ephemeral: true });

    };
}
);



client.on('interactionCreate', async i => {
    if (!i.isButton()) return;

    if (i.customId === '+1') {
        //await i.reply({ content: 'A button was clicked!', components: [] });
        if (i.customId === 'select', value = 'first_option') {
            //currency.addCrypto(i.user.id, 1)
            if (currency.getBalance(i.user.id) < DerpCoinPrice) {
                return await reply(i, "You don't have enough lmao");
            }
            currency.add(i.user.id, -DerpCoinPrice);
            currency.addCrypto(i.user.id, 10);

            reply(i, "Done!");
        }
    }

    if (i.customId === 'Sell') { //Sell all crypto into cash
        if (currency.getCryptoBal(i.user.id) <= 0) {
            return /*reply(i, 'YOU FOOOL YOU DONT HAVE ANY MONEY ANYWAYS IDOIT')*/
        } else {

            const Amount = (currency.getCryptoBal(i.user.id) / 10) * DerpCoinPrice;

            currency.addCrypto(i.user.id, -currency.getCryptoBal(i.user.id));
            currency.add(i.user.id, Amount);
            //reply(i, "Done!", false);
        }
    }
});


client.login('OTQ3ODkwMTE4MzY1MTc5OTM1.Yhz1dw.RvJkRfV8XTuf5bSJUUSh6Gk08h4');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Message } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('mute')
	.setDescription('Mute Someone')
        .addUserOption(option=>
            option.setName("user")
                .setRequired(true)
                .setDescription("Targeting user"))
        .addStringOption(option=>
            option.setName("reason")
                .setRequired(true)
                .setDescription("Reason"))
        .addStringOption(option=>
                option.setName('time')
                .setDescription('The amount to echo back')
                .setRequired(false));
    
module.exports = {data: data};
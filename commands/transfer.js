const { SlashCommandBuilder } = require('@discordjs/builders');
const { Message } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('transfer')
	.setDescription('transfer your mola')
    .addIntegerOption(option=>
        option.setName('amount')
            .setDescription('The amount to echo back')
            .setRequired(true))
    .addUserOption(option=>
        option.setName("user")
            .setRequired(true)
            .setDescription("Targeting user"));

module.exports = {data: data};
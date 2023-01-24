const { SlashCommandBuilder } = require('@discordjs/builders');
const { Message } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('addmoney')
	.setDescription('Money')
    .addIntegerOption(option=>
    option.setName('amount')
    .setDescription('The amount to echo back')
    .setRequired(true));
module.exports = {data: data};
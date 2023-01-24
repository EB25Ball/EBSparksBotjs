const { SlashCommandBuilder } = require('@discordjs/builders');
const { Message } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('giga')
	.setDescription('Get Balance')
    
module.exports = {data: data};
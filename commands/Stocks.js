const { SlashCommandBuilder } = require('@discordjs/builders');
const { Message } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('stocks')
	.setDescription('stocks list')
    console.log()
module.exports = {data: data};


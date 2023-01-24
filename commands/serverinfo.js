const { SlashCommandBuilder } = require('@discordjs/builders');
const { Message } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('serverinfo')
	.setDescription('Severs Stats')
module.exports = {data: data};
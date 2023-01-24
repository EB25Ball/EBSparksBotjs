const { SlashCommandBuilder } = require('@discordjs/builders');
const { Message } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('rank')
	.setDescription('Get xp ')

module.exports = {data: data};
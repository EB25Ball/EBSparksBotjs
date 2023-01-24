const { SlashCommandBuilder } = require('@discordjs/builders');
const { Message } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('moneylist')
	.setDescription('Get Ways Of money')

module.exports = {data: data};
const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
	.setName('mystocks')
	.setDescription('Get Crypto Balance');

module.exports = {data: data};
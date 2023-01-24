const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
	.setName('shop')
	.setDescription('shop menu');

module.exports = {data: data};
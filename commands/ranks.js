const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
	.setName('ranks')
	.setDescription('Get Everyones Rank');

module.exports = {data: data};
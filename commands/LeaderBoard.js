const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
	.setName('leaderboard')
	.setDescription('Get Leader Board');

module.exports = {data: data};
const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
	.setName('wheelspin')
	.setDescription('Get Daily Wheel Spin');
module.exports = {data: data};
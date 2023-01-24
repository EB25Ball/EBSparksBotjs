const { SlashCommandBuilder } = require('@discordjs/builders');
const { Message } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('coinflip')
	.setDescription('Flip a coin or die(jk...unless)')
    .addIntegerOption(option=>
        option.setName('amount')
            .setRequired(true)
            .setDescription("amount your betting"));

module.exports = {data: data};
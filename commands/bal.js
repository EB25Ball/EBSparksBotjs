const { SlashCommandBuilder } = require('@discordjs/builders');
const { Message } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('balance')
	.setDescription('Get Balance')
    .addUserOption(option=>
        option.setName("user")
            .setRequired(false)
            .setDescription("Targeting user"));

module.exports = {data: data};
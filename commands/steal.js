const { SlashCommandBuilder } = require('@discordjs/builders');
const { Message } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('steal')
	.setDescription('transfer your mola')
  .addUserOption(option=>
        option.setName('user')
            .setRequired(true)
            .setDescription("Targeting user"));

module.exports = {data: data};
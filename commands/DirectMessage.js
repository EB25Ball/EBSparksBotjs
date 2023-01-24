const { SlashCommandBuilder } = require('@discordjs/builders');
const { Message } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('directmessage')
	.setDescription('dm someone')
  .addStringOption(option=>
    option.setName('dm')
    .setDescription('the dm you want to send to somebody')
    .setRequired(true))
    .addUserOption(option=>
        option.setName('user')
        .setDescription('ya higgy bird')
        .setRequired(true))
module.exports = {data: data};
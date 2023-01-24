const { SlashCommandBuilder } = require('@discordjs/builders');
const { Message } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('mock')
	.setDescription('write a message and the bot will send it')
  .addStringOption(option=>
    option.setName('message')
    .setDescription('the dm you want to send to somebody')
    .setRequired(true))
    .addChannelOption(option=>
        option.setName('channel')
        .setDescription('channel you want to send it in')
        .setRequired(true))
module.exports = {data: data};
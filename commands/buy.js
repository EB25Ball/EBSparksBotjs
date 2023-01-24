const { SlashCommandBuilder } = require('@discordjs/builders');
const { Message } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('buy')
	.setDescription('Buy an Item from the Shop')
  .addStringOption(option=>
    option.setName('item')
    .setDescription('The amount to echo back')
    .setRequired(true));
module.exports = {data: data};
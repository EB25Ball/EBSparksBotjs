const { SlashCommandBuilder } = require('@discordjs/builders');
const { Message } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('live')
	.setDescription('Send A Annoucement that someones Live')
    .addUserOption(option => 
        option.setName('user')
        .setDescription('user you want to mention who is live')
        .setRequired(true))
    .addStringOption(option=>
        option.setName('url')
        .setDescription('url of the stream')
        .setRequired(true));
    module.exports = {data: data};
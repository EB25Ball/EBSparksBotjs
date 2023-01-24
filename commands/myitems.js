const { SlashCommandBuilder } = require('@discordjs/builders');
const { Message } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('myitems')
	.setDescription("Look for your or someone elses items")
.addUserOption(option=>
    option.setName("user")
        .setRequired(false)
        .setDescription("Targeting user"));

module.exports = {data: data};
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Message } = require('discord.js');

const data = new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Make a poll')
    .addStringOption(option =>
        option.setName('title')
            .setDescription('The gif category')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('pollidea1')
            .setDescription('first poll')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('pollidea2')
            .setDescription('2nd poll')
            .setRequired(true))
module.exports = { data: data };
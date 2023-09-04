const { SlashCommandBuilder } = require('discord.js');

const requestData = require('../lib/request/nation/request-nation-links');
const createLinkEmbed = require('../lib/embed/nation/nation-links-embed');
const createLinkDTO = require('../lib/dto/nation/nation-links-api-dto');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('volk')
    .setDescription('Erzeugt eine Informationskarte zu einem Volk.'),
  // .addStringOption(option =>
  //     option.setName('name')
  //         .setDescription('Name des Volks')
  //         .setRequired(true)),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @returns {Promise<boolean|void>}
   */
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: false });

    const data = await requestData(interaction.options.getString('name'));
    await interaction.editReply({ embeds: [createLinkEmbed(createLinkDTO(data))] });
  },
};

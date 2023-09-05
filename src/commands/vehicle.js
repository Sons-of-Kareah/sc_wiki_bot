const { SlashCommandBuilder } = require('discord.js');

const requestData = require('../lib/request/vehicle/request-vehicle');
const createVehicleEmbed = require('../lib/embed/vehicle/vehicle-embed');
const createVehicleDto = require('../lib/dto/vehicle/vehicle-api-dto');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fahrzeug')
    .setNameLocalizations({
      'en-US': 'vehicle',
      fr: 'véhicule',
    })
    .setDescription('Generates an information card about a specific spacecraft or vehicle.')
    .setDescriptionLocalizations({
      de: 'Erzeugt eine Informationskarte zu einem bestimmten Raumschiff oder Fahrzeug.',
      fr: 'Crée une carte d\'information sur un vaisseau spatial ou un véhicule spécifique.',
    })
    .addStringOption((option) => option
      .setName('name')
      .setNameLocalizations({
        fr: 'nom',
      })
      .setDescription('Vehicle name')
      .setDescriptionLocalizations({
        de: 'Fahrzeug name',
        fr: 'Nom du véhicule',
      })
      .setAutocomplete(true)
      .setRequired(true)),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @returns {Promise<boolean|void>}
   */
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: false });

    const name = interaction.options.getString('name');
    const reply = await requestData(name, interaction);

    return interaction.editReply({ embeds: [createVehicleEmbed(createVehicleDto(reply), interaction)] });
  },
};
const Discord = require('discord.js');
const { footer, wiki_url } = require('../../../config.json');

const createEmbed = (data) => {
  const reply = new Discord.EmbedBuilder({
    timestamp: data.timestamp,
    title: data.name,
    description: data.description.length === 0 ? '-' : data.description,
    type: 'link',
    url: `${wiki_url}/${encodeURIComponent(data.name.replace(/\s/g, '_'))}`,
    author: {
      name: `${data.manufacturer}`,
    },
    footer,
  });

  const ignoredPositions = [
    'Levski',
  ];

  const shopData = data.shops
    .filter((shop) => shop.items.length > 0)
    .filter((shop) => !ignoredPositions.includes(shop.position))
    .sort((shopA, shopB) => parseFloat(shopA.items[0].price_calculated) - parseFloat(shopB.items[0].price_calculated)).slice(0, 20);

  const fields = [];

  for (const shop of shopData) {
    fields.push({
      name: shop.name_raw,
      value: `${Math.round(shop.items[0].price_calculated).toString()} aUEC (${shop.items[0].buyable === true ? 'Kauf' : shop.items[0].sellable === true ? 'Verkauf' : ''})`,
      inline: true,
    });
  }

  if (fields.length > 0) {
    reply.addFields(fields);
  }

  if (shopData.length === 0) {
    if (reply.description === '-') {
      reply.setDescription('Keine Shops gefunden');
    } else {
      reply.setDescription(`${reply.description}\n\nKeine Shops gefunden`);
    }
  }

  if (data.image !== null) {
    reply.setImage(data.image);
  }

  return reply;
};

module.exports = createEmbed;

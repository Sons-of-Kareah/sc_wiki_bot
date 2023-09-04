const axios = require('axios');
const { wiki_url } = require('../../config.json');

const instance = axios.create({
  baseURL: wiki_url,
  timeout: 2500,
});

const requestImage = async (title) => {
  const result = await instance.get('/api.php', {
    params: {
      action: 'query',
      format: 'json',
      prop: 'pageimages',
      piprop: 'thumbnail',
      pithumbsize: 640,
      formatversion: 2,
      titles: title.replace(/\s/g, '_'),
    },
  })
    .catch(() => null);

  if (result.status !== 200 || result.data.batchcomplete !== true || result.data.query.pages.length === 0) {
    return null;
  }

  const { data } = result;

  let image = null;

  data.query.pages.filter((page) => page?.missing !== true).forEach((page) => {
    if (typeof page.thumbnail !== 'undefined') {
      image = page.thumbnail.source.replace('50px-', '800px-');
    }
  });

  return image;
};

module.exports = requestImage;

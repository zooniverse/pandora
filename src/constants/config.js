const config = {
  staging: {
    panoptesAppId: '30963426190f0b1306331e603368527f3d0650920d5e1c9b6287ad09fdd3231e', // Panoptes staging API
    projectHost: 'https://master.pfe-preview.zooniverse.org'
  },
  development: {
    panoptesAppId: '30963426190f0b1306331e603368527f3d0650920d5e1c9b6287ad09fdd3231e', // Panoptes staging API
    projectHost: 'http://localhost'
  },
  production: {
    panoptesAppId: '2393eff8192d75cb9e9be32fb28fe7c218a37eb8f59f5a746bb4dab7224ee989',
    projectHost: 'https://www.zooniverse.org'
  }
};

function locationMatch(regex) {
  var match;
  if (typeof location !== 'undefined' && location !== null) {
    match = location.search.match(regex);
  }

  return (match && match[1]) ? match[1] : undefined;
}

const envFromBrowser = locationMatch(/\W?env=(\w+)/);

const env = envFromBrowser ? envFromBrowser : process.env.NODE_ENV;
export default config[env];
